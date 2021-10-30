// To compile
// gcc -g -o tree tree.c
// Credit: Jacob Sorber
#include <stdio.h>
#include <stdlib.h>

typedef struct treenode {
    int value;
    struct treenode *left;
    struct treenode *right;
} treenode;

treenode* createnode(int value) {
    treenode* result = malloc(sizeof(treenode));

    if (result != NULL) {
        result->left = NULL;
        result->right = NULL;
        result->value = value;
    }

    return result;
}

void printtabs(int numtabs) {
    for (int i = 0; i < (numtabs - 1); i++) {
        printf("\t");
    }
    printf("+----");
}

void printtree(treenode* root, int level) {
    if (root == NULL) return;

    printf("%d\n", root->value);
    
    level++;

    if (root->left != NULL) printtabs(level);
    printtree(root->left, level);

    if (root->right != NULL)printtabs(level);
    printtree(root->right, level);
}

void printEntiretree(treenode* root) {
    printtree(root, 0);
}

int main() {
    treenode *n1 = createnode(20);
    treenode *n2 = createnode(5);
    treenode *n3 = createnode(13);
    treenode *n4 = createnode(4);
    treenode *n5 = createnode(16);
    treenode *n6 = createnode(9);
    treenode *n7 = createnode(30);
    treenode *n8 = createnode(2);

    n3->left = n6;
    n6->left = n4;
    n6->right = n2;
    n4->left = n8;
    n3->right = n5;
    n5->left = n1;
    n5->right = n7;

    printEntiretree(n3);

    free(n1);
    free(n2);
    free(n3);
    free(n4);
    free(n5);
    free(n6);
    free(n7);
    free(n8);
}