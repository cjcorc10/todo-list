export const renderToDo = (project, domMap) => {
  const projectDiv = document.querySelector(
    `[data-project-id="${project.id}"]`,
  );
  const todoContainer = projectDiv.querySelector("#todo-list");

  // clear current div
  todoContainer.textContent = "";

  // fill div with all of the todo tasks
  const projectList = project.getList();
  projectList.forEach((todo, index) => {
    const existingNode = domMap.get(todo);
    if (existingNode) {
      existingNode.remove();
      domMap.delete(todo);
    }


    const toDoDiv = document.createElement("div");
    toDoDiv.dataset.toDoId = todo.id;
    toDoDiv.classList.add("task-div");
    toDoDiv.classList.add("incomplete-task");

    toDoDiv.innerHTML = `
        <div>
          <h3>${todo.title}</h3>
          <p>${todo.dueDate}</p>
        </div>
        <div class="properties" style="display: none">
            <p>description: ${todo.description}</p>
            <p>priority: ${todo.priority}</p>
        </div>
        <div class="todo-buttons">
            <button class="expand-prop">expand</button>
            <button class="remove-todo" data-task-name="${todo.title}">Remove task</button>
        </div>
        <input type=checkbox class='completed'>`;

    todoContainer.appendChild(toDoDiv);
    domMap.set(todo, toDoDiv);
  });
};

// function to show other todo properties
export const toggleProps = (event) => {
  const propertyNode = event.target.parentElement.previousElementSibling;

  // toggle the hidden div node
  const isVisible = propertyNode.style.display === "block";
  propertyNode.style.display = isVisible ? "none" : "block";
  event.target.textContent = isVisible ? "view more" : "view less";
};

export const handleToggleComplete = (event) => {
  const parentDiv = event.target.parentElement;

  const isComplete = parentDiv.classList.toggle("incomplete-task");
  parentDiv.classList.toggle("complete-task", !isComplete);

/*  event.target.textContent = !isComplete
    ? "mark as incomplete"
    : "mark as complete";
  */
};
