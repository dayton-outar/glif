#include <stdio.h>

#include "queue.h"

int main() {
    queue *q1 = q_create(4);

    q_enqueue(q1, 56);   
    q_enqueue(q1, 78);
    q_enqueue(q1, 45);
    q_enqueue(q1, 13);

    int t;    
    while ((t = q_dequeue(q1)) != QUEUE_EMPTY) {
        printf("t = %d\n", t);
    }
}