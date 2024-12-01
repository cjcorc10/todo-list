// function created to render new projects
export const renderProject = (projectList, domMap) => {
  const container = document.getElementById("content");
  clearProjects(container);
  projectList.forEach((project) => {
    const existingNode = domMap.get(project);
    // update dom map for re-render
    if (existingNode) {
      existingNode.remove();
      domMap.delete(project);
    }

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("projects");

    // used to correlate todo with project
    projectDiv.dataset.projectId = project.id;

    const title = document.createElement('h2');
    title.textContent = project.name;
    // add div for todo list tasks
    const todoDiv = document.createElement("div");
    todoDiv.id = "todo-list";

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('todo-buttons')

    // add todo button to rendered project
    const addToDoButton = document.createElement("button");
    addToDoButton.textContent = "+";
    addToDoButton.classList.add("add-todo");
    buttonDiv.appendChild(addToDoButton);

    // add remove project button
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("remove-project");
    buttonDiv.appendChild(removeButton);

    // set a projectName property on button to determine which add todo button was pressed.
    projectDiv.appendChild(title);
    projectDiv.appendChild(todoDiv);
    projectDiv.appendChild(buttonDiv);
    container.appendChild(projectDiv);
    domMap.set(project, projectDiv);
  });
};

export const clearProjects = (container) => {
  container.textContent = "";
};
