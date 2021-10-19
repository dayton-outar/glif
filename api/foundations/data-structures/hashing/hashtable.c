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

    for (int i = 0; i < TABLE_SIZE; i++) { // This contruct causes this insert to perform at O(n) rather than O(1) (as it was before)
        int try = (i + index) % TABLE_SIZE;
        if (hash_table[try] == NULL) {
            hash_table[try] = p;
            return false;
        }
    }

    return false;
}

person *hash_table_delete(char *name) { // O(n) time
    int index = hash(name);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int try = (index + i) % TABLE_SIZE;
        if (hash_table[try] != NULL &&
            strncmp(hash_table[try]->name, name, TABLE_SIZE) == 0) {
            person *tmp = hash_table[try];
            hash_table[try] = NULL;
            return tmp;
        }
    }

    return NULL;
}

person *hash_table_lookup(char *name) { // O(n) time
    int index = hash(name);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int try = (index + i) % TABLE_SIZE;
        if (hash_table[try] != NULL &&
            strncmp(hash_table[try]->name, name, TABLE_SIZE) == 0) {
            return hash_table[try];
        }
    }

    return NULL;
}

int main() {

    init_hash_table();
    print_table();

    person jacob = { .name = "Jacob", .age = 30 };
    person sarah = { .name = "Sarah", .age = 25 };
    person zane = { .name = "Zane", .age = 28 };
    person ian = { .name = "Ian", .age = 32 };
    //--
    person hodor = { .name = "Hodor", .age = 44 };
    person jane = { .name = "Jane", .age = 15 };
    person maren = { .name = "Maren", .age = 38 };
    person bill = { .name = "Bill", .age = 55 };

    hash_table_insert(&jacob);
    hash_table_insert(&sarah);
    hash_table_insert(&zane);
    hash_table_insert(&ian);
    //--
    hash_table_insert(&hodor);
    hash_table_insert(&jane);
    hash_table_insert(&maren);
    hash_table_insert(&bill);

    print_table();

    // Let's look up now

    person *tmp = hash_table_lookup("Zane");

    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s.\n", tmp->name);
    }

    /*
    printf("Now, let's remove %s\n", tmp->name);

    hash_table_delete("Zane");
    tmp = hash_table_lookup("Zane");

    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s.\n", tmp->name);
    }

    print_table();
    */

    return 0;
}