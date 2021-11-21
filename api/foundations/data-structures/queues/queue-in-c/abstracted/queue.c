#include <stdlib.h>
#include "queue.h"

void init_queue(queue *q) {
    q->head = NULL;
    q->tail = NULL;
}

bool enqueue(queue *q, int value) {
    node *newnode = malloc(sizeof(node));

    if (newnode == NULL) return false;

    newnode->value = value;
    newnode->next = NULL;

    if (q->tail != NULL) {
        q->tail->next = newnode;
    }

    q->tail = newnode;

    if (q->head == NULL) {
        q->head = newnode;
    }

    return true;
}

int dequeue(queue *q) {
    if (q->head == NULL) return QUEUE_EMPTY;

    node *tmp = q->head;

    int result = tmp->value;
    q->head = q->head->next;

    if (q->head == NULL) {
        q->tail = NULL;
    }

    free(tmp);

    return result;
}