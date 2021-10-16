#ifndef INT_LINKED_LIST
#define INT_LINKED_LIST

class iNode {
public:
    iNode() {
        next = 0;
    }
    iNode(int el, iNode *ptr = 0) {
        info = el; next = ptr;
    }
    int info;
    iNode *next;
};

class iList {
public:
    iList() {
        head = tail = 0;
    }
    ~iList();
    int isEmpty() {
        return head == 0;
    }
    void addToHead(int);
    void addToTail(int);
    int  deleteFromHead(); // delete the head and return its info;
    int  deleteFromTail(); // delete the tail and return its info;
    void deleteNode(int);
    bool isInList(int) const;
    void printAll() const;
private:
    iNode *head, *tail;
};

#endif