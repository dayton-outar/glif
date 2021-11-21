#include <stdio.h>

#include "queue.h"

int main() {
    queue q1;
    init_queue(&q1);

    enqueue(&q1, 56);   
    enqueue(&q1, 78);
    enqueue(&q1, 45);
    enqueue(&q1, 13);

    int t;    
    while ((t = dequeue(&q1)) != QUEUE_EMPTY) {
        printf("t = %d\n", t);
    }
}