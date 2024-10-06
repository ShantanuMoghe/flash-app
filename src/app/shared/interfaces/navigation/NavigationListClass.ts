type NavNodeType<T> = NavNode<T> | null
class NavNode<T> {
    value: T | null;
    prev: NavNodeType<T>;
    next: NavNodeType<T>;

    constructor(value: T) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export class DoublyLinkedNavList<T> {
    head: NavNodeType<T>;
    tail: NavNodeType<T>;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value: T): void {
        const newNode = new NavNode(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            if (this.tail) this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    findPrev(value: T): NavNode<T> | null {
        let current = this.tail;
        while (current) {
            if (current.value === value) return current.prev;
            current = current.prev
        }
        return null;
    }
}