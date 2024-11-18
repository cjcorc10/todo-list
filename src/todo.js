function createToDo( title, description, dueDate, priority) {
    return { 
        title, 
        description, 
        dueDate,
        priority,
        complete: false,
        markComplete() {
            this.complete = true;
        }
    };
}

export { createToDo };