// To compile
// gcc -g -o hashtable hashtable.c
// Credit: Jacob Sorber
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <stdint.h>
#include <stdbool.h>

#define MAX_NAME 256
#define TABLE_SIZE 10

typedef struct {
    char name[MAX_NAME];
    int age;
    // ...
} person;

person *hash_table[TABLE_SIZE];

unsigned int hash(char *name) {
    int length = strnlen(name, MAX_NAME);
    unsigned int hash_value = 0;

    for (int i = 0; i < length; i++) {
        hash_value += name[i];
        hash_value *= name[i];
        hash_value %= TABLE_SIZE; // Modulo in Division Function?
    }

    return hash_value;
}

bool init_hash_table() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        hash_table[i] = NULL;
    }
}

void print_table() {
    printf("\t##################\n");

    for (int i = 0; i < TABLE_SIZE; i++) {
        if (hash_table[i] == NULL) {
            printf("\t%i\t---\n", i);
        } else {
            printf("\t%i\t---%s\n", i, hash_table[i]->name);
        }
    }

    printf("\t##################\n");
}

bool hash_table_insert(person *p) {
    if (p == NULL) return false;

    int index = hash(p->name);

    if (hash_table[index] != NULL) return false;

    hash_table[index] = p;

    return true;
}

person *hash_table_lookup(char *name) {
    int index = hash(name);
    if (hash_table[index] != NULL &&
        strncmp(hash_table[index]->name, name, TABLE_SIZE) == 0) {
            return hash_table[index];
    } else {
        return NULL;
    }
}

int main() {

    init_hash_table();
    print_table();

    person jacob = { .name = "Jacob", .age = 30 };
    person sarah = { .name = "Sarah", .age = 25 };
    person zane = { .name = "Zane", .age = 28 };
    person ian = { .name = "Ian", .age = 32 };

    hash_table_insert(&jacob);
    hash_table_insert(&sarah);
    hash_table_insert(&zane);
    hash_table_insert(&ian);

    print_table();

    // Let's look up now

    person *tmp = hash_table_lookup("Zane");

    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s.\n", tmp->name);
    }

    tmp = hash_table_lookup("Joe");

    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s.\n", tmp->name);
    }

    return 0;
}