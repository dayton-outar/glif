#include <stdlib.h>
#include "queue.h"

typedef struct dq {
    int *values;
    int head, tail, num_entries, size;
} queue;

queue* q_create(int max_size) {
    queue* q = malloc(sizeof(queue));
    q->size = max_size;
    q->values = malloc(sizeof(int) * q->size);
    q->num_entries = 0; // empty
    q->head = 0;
    q->tail = 0;

    return q;
}

bool q_enqueue(queue *q, int value) {
    if (q_full(q)) {
        return false;
    }
    q->values[q->tail] = value;
    q->num_entries++;
    q->tail = (q->tail + 1) % q->size;

    return true;
}

int q_dequeue(queue *q) {
    int result;

    if (q_empty(q)) {
        return QUEUE_EMPTY;
    }

    result = q->values[q->head];
    q->head = (q->head + 1) % q->size;
    q->num_entries--;

    return result;
}

void q_destroy(queue *q) {
    free(q->values);
}

bool q_empty(queue *q) {
    return q->num_entries == 0;
}

bool q_full(queue *q) {
    return q->num_entries == q->size;
}