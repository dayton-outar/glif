#ifndef QUEUE_H
#define QUEUE_H

#include <limits.h>
#include <stdbool.h>

#define QUEUE_EMPTY INT_MIN

typedef struct node {
    int value;
    struct node* next;
} node;

typedef struct {
    node *head;
    node *tail;
} queue;

void init_queue(queue *q);
bool enqueue(queue *q, int value);
int dequeue(queue *q);

#endif