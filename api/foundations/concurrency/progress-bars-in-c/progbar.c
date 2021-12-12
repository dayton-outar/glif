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
} statusinfo;

void update_bar(int percent_done, statusinfo *sinfo) {
    int num_char = percent_done * PROG_BAR_LENGTH / 100;
    printf("\r[");
    for (int i = 0; i < num_char; i++) {
        printf("=");
    }
    for (int i = 0; i < PROG_BAR_LENGTH - num_char; i++) {
        printf(" ");
    }

    printf("] %d%% Done (%ld bytes)", percent_done, sinfo->total_bytes);
    fflush(stdout);
}

size_t got_data(char *buffer, size_t itemsize, size_t numitems, void *stinfo) {
    statusinfo* status = stinfo;
    size_t bytes = itemsize * numitems;

    status->total_bytes += bytes;
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
        "https://cdimage.debian.org/debian-cd/current/i386/iso-cd/debian-10.9.0-i386-xfce-CD-1.iso",
        "https://unsplash.com/photos/MkImkLEuqcY/download?force=true"
    };
    const int num_urls = (sizeof(urls) / sizeof(urls[0]));
    statusinfo sinfo;
    sinfo.total_bytes = 0;

    update_bar(0, &sinfo);
    for (int i = 0; i < num_urls; i++) {
        download_url(urls[i], &sinfo);
        update_bar( (i+1) * 100 / num_urls, &sinfo);
    }
    printf("\n");
}