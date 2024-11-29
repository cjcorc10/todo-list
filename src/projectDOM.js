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
    projectDiv.textContent = project.name;
    projectDiv.classList.add("projects");

    // used to correlate todo with project
    projectDiv.dataset.projectId = project.id;

    // add div for todo list tasks
    const todoDiv = document.createElement("div");
    todoDiv.id = "todo-list";

    // add todo button to rendered project
    const addToDoButton = document.createElement("button");
    addToDoButton.textContent = "Add todo";
    addToDoButton.classList.add("add-todo");

    // add remove project button
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove project";
    removeButton.classList.add("remove-project");

    // set a projectName property on button to determine which add todo button was pressed.
    projectDiv.appendChild(todoDiv);
    projectDiv.appendChild(addToDoButton);
    projectDiv.appendChild(removeButton);
    container.appendChild(projectDiv);
    domMap.set(project, projectDiv);
  });
};

export const clearProjects = (container) => {
  container.textContent = "";
};
