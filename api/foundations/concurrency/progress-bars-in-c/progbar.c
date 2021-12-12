// gcc progbar.c -o progbar
#include <stdio.h>
#include <unistd.h>
#include <stdbool.h>
#include <stdlib.h>
// sudo apt-get install libcurl4-gnutls-dev
#include <curl/curl.h>

const int PROG_BAR_LENGTH = 30;

void update_bar(int percent_done) {
    int num_char = percent_done * PROG_BAR_LENGTH / 100;
    printf("\r[");
    for (int i = 0; i < num_char; i++) {
        printf("=");
    }
    for (int i = 0; i < PROG_BAR_LENGTH - num_char; i++) {
        printf(" ");
    }

    printf("] %d%% Done", percent_done);
    fflush(stdout);
}

int main() {
    for (int i = 0; i <= 100; i++) {
        update_bar(i);
        usleep(3000);
    }
    printf("\n");
}