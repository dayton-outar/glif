// gcc progbar.c -o progbar -lcurl
#include <stdio.h>
#include <unistd.h>
#include <stdbool.h>
#include <stdlib.h>
// sudo apt-get install libcurl4-gnutls-dev
#include <curl/curl.h>

const int PROG_BAR_LENGTH = 30;

typedef struct {
    long total_bytes;
    long total_expected;
    double exp_bytes_per_url;
    long current_bytes;
    long urls_so_far;
    long total_urls;
} statusinfo;

const double PREDICT_WEIGHT = 0.4;

double predict_next(double last_prediction, double actual) {
    return ( (last_prediction * (1 - PREDICT_WEIGHT)) + (actual * PREDICT_WEIGHT) );
}

void update_bar(int percent_done, statusinfo *sinfo) {
    int num_char = percent_done * PROG_BAR_LENGTH / 100;
    printf("\r[");
    for (int i = 0; i < num_char; i++) {
        printf("=");
    }
    for (int i = 0; i < PROG_BAR_LENGTH - num_char; i++) {
        printf(" ");
    }

    printf("] %d%% Done (%ld MB)", percent_done, sinfo->total_bytes / 1000000 );
    fflush(stdout);
}

size_t got_data(char *buffer, size_t itemsize, size_t numitems, void *stinfo) {
    statusinfo* status = stinfo;
    size_t bytes = itemsize * numitems;

    status->current_bytes += bytes;
    status->total_bytes += bytes;

    long urls_left = (status->total_urls - status->urls_so_far);

    long estimate_current = status->exp_bytes_per_url;

    if (status->current_bytes > status->exp_bytes_per_url) {
        estimate_current = status->current_bytes * 4 / 3;
    }

    double guess_next_prediction = predict_next(status->exp_bytes_per_url, estimate_current);

    long estimated_total = status->total_bytes + (estimate_current - status->current_bytes) + ( (urls_left - 1) * guess_next_prediction);

    long percentdone = status->total_bytes * 100 / estimated_total;

    update_bar(percentdone, status);

    return bytes;
}

bool download_url(char *url, statusinfo *sinfo) {
    CURL *curl = curl_easy_init();

    if (!curl) return false;

    // set options
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, got_data);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, sinfo);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1);

    // do the download
    CURLcode result = curl_easy_perform(curl);

    curl_easy_cleanup(curl);

    return (result == CURLE_OK);
}

int main() {
    char *urls[] = {
        "https://images.pexels.com/photos/835887/pexels-photo-835887.jpeg",
        "https://unsplash.com/photos/4xdvnmtijZi/download?force=true",
        "https://cdimage.debian.org/debian-cd/current/i386/iso-cd/debian-11.1.0-i386-netinst.iso",
        "https://unsplash.com/photos/MkImkLEuqcY/download?force=true"
    };
    const int num_urls = (sizeof(urls) / sizeof(urls[0]));
    statusinfo sinfo;
    sinfo.total_bytes = 0;
    sinfo.urls_so_far = 0;
    sinfo.total_urls = num_urls;
    sinfo.exp_bytes_per_url = 100000000.0;

    update_bar(0, &sinfo);
    for (int i = 0; i < num_urls; i++) {
        sinfo.current_bytes = 0;
        download_url(urls[i], &sinfo);
        sinfo.urls_so_far++;
        sinfo.exp_bytes_per_url = predict_next(sinfo.exp_bytes_per_url, sinfo.current_bytes);
    }
    printf("\n");
}