// To compile
// gcc -g -o stack-list stack-list.c
// Credit: Jacob Sorber
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>
#include <stdlib.h>

#define STACK_LENGTH 5
#define EMPTY (-1)
#define STACK_EMPTY INT_MIN

typedef struct node {
    int value;
    struct node *next;
} node;

typedef node *stack;

bool push(stack *stk, int value) {
    node *newnode = malloc(sizeof(node));
    if (newnode == NULL) return false;

    newnode->value = value;
    newnode->next = *stk;

    *stk = newnode;

    return true;
}

int pop(stack *stk) {
    if (*stk == NULL) return STACK_EMPTY;

    int result = (*stk)->value;
    node *tmp = *stk;
    *stk = (*stk)->next;

    free(tmp);

    return result;
}

int main() {
    stack s1 = NULL;
    push(&s1, 56);
    push(&s1, 78);
    push(&s1, 45);
    push(&s1, 13);

    int t;
    while ((t = pop(&s1)) != STACK_EMPTY) {
        printf("t = %d\n", t);
    }
}