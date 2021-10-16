// To compile
// cc list.c -o list
#include <stdlib.h>
#include <stdio.h>

struct node {
    int value;
    struct node* next;
};
typedef struct node node_t;

void printlist(node_t *head) {
    node_t *temporary = head;

    while (temporary != NULL) {
        printf("%d --> ", temporary->value);
        temporary = temporary->next;
    }
    printf("\n");
}

node_t *create_new_node(int value) {
    node_t *result = malloc(sizeof(node_t)); // Allocate on heap
    result->value = value;
    result->next = NULL;

    return result;
}

node_t *insert_at_head(node_t *head, node_t *node_to_insert) {
    node_to_insert->next = head;

    return node_to_insert;
}

int main() {
    node_t *head = NULL;
    node_t *tmp;

    for (int i = 1; i < 7; i++) {
        tmp = create_new_node((8 * i));
        head = insert_at_head(head, tmp);
    }    

    printlist(head);
    // Outputs: 48 --> 40 --> 32 --> 24 ...

    return 0;
}