
// gcc multibar.c -o multibar -pthread
#include <stdio.h>
#include <unistd.h>
#include <stdbool.h>
#include <stdlib.h>
#include <pthread.h>

const int PROG_BAR_LENGTH = 30;
const int NUMTHREADS = 5;

#define ESC "\033"
#define CSI "["
#define PREVIOUSLINE "F"
#define BACKSPACE "D"

typedef struct {
    int count_to_val;
    int progress;
    pthread_t thethread;
} thread_info;

void update_bar(thread_info* tinfo) {
    int num_char = (tinfo->progress * 100 / tinfo->count_to_val) * PROG_BAR_LENGTH / 100;
    printf("\r[");
    for (int i = 0; i < num_char; i++) {
        printf("=");
    }
    if (tinfo->progress < tinfo->count_to_val) {
        printf(ESC CSI BACKSPACE ">");
    }
    for (int i = 0; i < PROG_BAR_LENGTH - num_char; i++) {
        printf(" ");
    }

    printf("]\n");
}

void *generate_thread(void *arg) {
    thread_info *tinfo = arg;

    for (tinfo->progress = 0; tinfo->progress < tinfo->count_to_val; tinfo->progress++) {
        usleep(1000);
    }

    return NULL;
}

int main() {
    thread_info threads[NUMTHREADS];

    for (int i = 0; i < NUMTHREADS; i++) {
        threads[i].count_to_val = rand() % 10000;
        threads[i].progress = 0;
        pthread_create(&threads[i].thethread, NULL, generate_thread, &threads[i]);
    }

    bool done = false;

    while (!done) {
        done = true;

        for (int i = 0; i < NUMTHREADS; i++) {
            update_bar(&threads[i]);
            if (threads[i].progress < threads[i].count_to_val) {
                done = false;
            }
        }
        if (!done) {
            // Escape sequence for ESC and Move up five lines
            printf(ESC CSI "%d" PREVIOUSLINE, NUMTHREADS);
        }
        
        usleep(10000);
    }
    printf("\nDone!\n");
}