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

node_t *insert_at_head(node_t **head, node_t *node_to_insert) {
    node_to_insert->next = *head;
    *head = node_to_insert;

    return node_to_insert;
}

node_t *find_node(node_t *head, int value) {
    node_t *tmp = head;
    while (tmp != NULL) {
        if (tmp->value == value) return tmp;
        tmp = tmp->next;
    }

    return NULL;
}

node_t *insert_after_node(node_t *node_to_insert_after, node_t *newnode) {
    newnode->next = node_to_insert_after->next;
    node_to_insert_after->next = newnode;
}

int main() {
    node_t *head = NULL;
    node_t *tmp;

    for (int i = 1; i < 7; i++) {
        tmp = create_new_node((8 * i));
        insert_at_head(&head, tmp);
    }    

    printlist(head);
    // Outputs: 48 --> 40 --> 32 --> 24 ...

    insert_after_node(tmp, create_new_node(75));

    printlist(head);

    tmp = find_node(head, 24);
    printf("Found node with value %d\n", tmp->value);

    return 0;
}