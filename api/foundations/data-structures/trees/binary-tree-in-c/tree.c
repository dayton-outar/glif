// To compile
// gcc -g -o tree tree.c
// Credit: Jacob Sorber
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

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

    if (root->left != NULL) {
        printtabs(level);
        printf("l ");
    }
    printtree(root->left, level);

    if (root->right != NULL) {
        printtabs(level);
        printf("r ");
    }
    printtree(root->right, level);
}

void printEntiretree(treenode* root) {
    printtree(root, 0);
}

bool insertnumber(treenode** rootptr, int value) {
    bool result = false;
    treenode* root = *rootptr;

    if (root == NULL) {
        (*rootptr) = createnode(value);
        return true;
    }

    if (value == root->value) {
        return false;
    }

    if (value < root->value) {
        return insertnumber(&(root->left), value);
    } else {
        return insertnumber(&(root->right), value);
    }
}

bool findnumber(treenode* root, int value) {
    if (root == NULL) return false;
    if (root->value == value) return true;

    if (value < root->value) {
        return findnumber(root->left, value);
    } else {
        return findnumber(root->right, value);
    }
}

int main() {
    treenode *root = NULL;

    insertnumber(&root, 12);
    insertnumber(&root, 3);
    insertnumber(&root, 22);
    insertnumber(&root, 33);
    insertnumber(&root, 20);
    insertnumber(&root, 10);
    insertnumber(&root, 50);
    insertnumber(&root, 9);
    insertnumber(&root, 28);
    insertnumber(&root, 39);

    printEntiretree(root); // The tree produced will be unbalanced

    printf("\n\nLet's search for some numbers:\n");

    printf("1. %d ... %s\n", 16, findnumber(root, 16) ? "yes" : "no" );
    printf("2. %d ... %s\n", 22, findnumber(root, 22) ? "yes" : "no" );
    printf("3. %d ... %s\n", 9, findnumber(root, 9) ? "yes" : "no" );

    free(root);
}