class Stack {
    private queue: JSON[];
    constructor() {
        this.queue =[];
    }

    push(x: JSON): void {
        this.queue.push(x);
    }

    pop(): JSON {
        // for (let i = 0, length = this.queue.length - 1; i < length; i++) { //即把队列最里层元素拿出再压入队列，直至拿到最后一个，弹出队列
        //     this.queue.push(this.queue.shift()!);
        // }
        
        return this.queue.shift()!;
    }

    top(): JSON {
       
        return this.queue[0]!;
    }

    empty(): boolean {
        return this.queue.length === 0;
    }

    len(): number {
        return this.queue.length;
    }
    bottom():JSON{
        return this.queue[this.queue.length -1]!;
    }
    clear():boolean{

        this.queue = [];
        return true;
    }
    

}

export default Stack