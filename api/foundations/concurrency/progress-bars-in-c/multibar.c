
// gcc multibar.c -o multibar -pthread
#include <stdio.h>
#include <unistd.h>
#include <stdbool.h>
#include <stdlib.h>
#include <pthread.h>

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

    printf("]");
    
    fflush(stdout);
}

int main() {
    for (int i = 0; i <= 100; i++) {
        update_bar(i);
        usleep(10000);
    }
    printf("\nDone!\n");
}