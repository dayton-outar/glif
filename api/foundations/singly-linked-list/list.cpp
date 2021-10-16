#include <iostream>
#include "list.h"

iList::~iList() {
    for (iNode *p; !isEmpty(); ) {
        p = head->next;
        delete head;
        head = p;
    }
}

void iList::addToHead(int el) {
    head = new iNode(el,head);
    if (tail == 0)
       tail = head;
}

void iList::addToTail(int el) {
    if (tail != 0) {      // if list not empty;
         tail->next = new iNode(el);
         tail = tail->next;
    }
    else head = tail = new iNode(el);
}

int iList::deleteFromHead() {
    int el = head->info;
    iNode *tmp = head;
    if (head == tail)     // if only one node on the list;
         head = tail = 0;
    else head = head->next;
    delete tmp;
    return el;
}

int iList::deleteFromTail() {
    int el = tail->info;
    if (head == tail) {   // if only one node on the list;
         delete head;
         head = tail = 0;
    }
    else {                // if more than one node in the list,
         iNode *tmp; // find the predecessor of tail;
         for (tmp = head; tmp->next != tail; tmp = tmp->next);
         delete tail;
         tail = tmp;      // the predecessor of tail becomes tail;
         tail->next = 0;
    }
    return el;
}

void iList::deleteNode(int el) {
    if (head != 0)                     // if non-empty list;
         if (head == tail && el == head->info) { // if only one
              delete head;                       // node on the list;
              head = tail = 0;
         }
         else if (el == head->info) {  // if more than one node on the list
              iNode *tmp = head;
              head = head->next;
              delete tmp;              // and old head is deleted;
         }
         else {                        // if more than one node in the list
              iNode *pred, *tmp;
              for (pred = head, tmp = head->next; // and a non-head node
                   tmp != 0 && !(tmp->info == el);// is deleted;
                   pred = pred->next, tmp = tmp->next);
              if (tmp != 0) {
                   pred->next = tmp->next;
                   if (tmp == tail)
                      tail = pred;
                   delete tmp;
              }
         }
}

bool iList::isInList(int el) const {
    iNode *tmp;
    for (tmp = head; tmp != 0 && !(tmp->info == el); tmp = tmp->next);
    return tmp != 0;
}

void iList::printAll() const {
    for (iNode *tmp = head; tmp != 0; tmp = tmp->next)
        std::cout << tmp->info << " ";
	std::cout << std::endl;
}
