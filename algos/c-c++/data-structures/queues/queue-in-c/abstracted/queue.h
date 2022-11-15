#ifndef QUEUE_H
#define QUEUE_H

#include <limits.h>
#include <stdbool.h>

#define QUEUE_EMPTY INT_MIN

typedef struct dq queue;

queue* q_create(int max_size);
bool q_enqueue(queue *q, int value);
int q_dequeue(queue *q);
void q_destroy(queue *q);
bool q_empty(queue *);
bool q_full(queue *);

#endif