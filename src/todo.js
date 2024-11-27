/*
Factory function used to create todo objects. These objects will have properties
used to define them and a function to set the item to complete when it has been
completed.
*/

function createToDo(title, description, dueDate, priority) {
  return {
    id: Date.now().toString(),
    title,
    description,
    dueDate,
    priority,
    complete: false,
    markComplete() {
      this.complete = this.complete ? false : true;
    },
  };
}

export { createToDo };
