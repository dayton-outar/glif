#ifndef DOUBLY_LINKED_LIST
#define DOUBLY_LINKED_LIST

template<class T>
class dNode {
public:
    dNode() {
        next = prev = 0;
    }
    dNode(const T& el, dNode<T> *n = 0, dNode<T> *p = 0) {
        info = el; next = n; prev = p;
    }
    T info;
    dNode<T> *next, *prev;
};

template<class T>
class dList {
public:
    dList() {
        head = tail = 0;
    }
    void addToDLLTail(const T&);
    T deleteFromDLLTail();
    ~dList() {
        clear();
    }
    bool isEmpty() const {
        return head == 0;
    }
    void clear();
    void setToNull() {
        head = tail = 0;
    }
    void addToDLLHead(const T&);
    T deleteFromDLLHead();
    T& firstEl();
    T* find(const T&) const;
protected:
    dNode<T> *head, *tail;
    friend ostream& operator<<(ostream& out, const dList<T>& dll) {
        for (dNode<T> *tmp = dll.head; tmp != 0; tmp = tmp->next)
            out << tmp->info << ' ';
        return out;
    }
};

template<class T>
void dList<T>::addToDLLHead(const T& el) {
    if (head != 0) {
         head = new dNode<T>(el,head,0);
         head->next->prev = head;
    }
    else head = tail = new dNode<T>(el);
}

template<class T>
void dList<T>::addToDLLTail(const T& el) {
    if (tail != 0) {
         tail = new dNode<T>(el,0,tail);
         tail->prev->next = tail;
    }
    else head = tail = new dNode<T>(el);
}

template<class T>
T dList<T>::deleteFromDLLHead() {
    T el = head->info;
    if (head == tail) { // if only one dNode on the list;
         delete head;
         head = tail = 0;
    }
    else {              // if more than one dNode in the list;
         head = head->next;
         delete head->prev;
         head->prev = 0;
    }
    return el;
}

template<class T>
T dList<T>::deleteFromDLLTail() {
    T el = tail->info;
    if (head == tail) { // if only one dNode on the list;
         delete head;
         head = tail = 0;
    }
    else {              // if more than one dNode in the list;
         tail = tail->prev;
         delete tail->next;
         tail->next = 0;
    }
    return el;
}

template <class T>
T* dList<T>::find(const T& el) const {
    dNode<T> *tmp = head;
    for ( ; tmp != 0 && !(tmp->info == el);  // overloaded ==
         tmp = tmp->next);
    if (tmp == 0)
         return 0;
    else return &tmp->info;
}

template<class T>
T& dList<T>::firstEl() {
    return head->info;
}

template<class T>
void dList<T>::clear() {
    for (dNode<T> *tmp; head != 0; ) {
        tmp = head;
        head = head->next;
        delete tmp;
    }
}

#endif