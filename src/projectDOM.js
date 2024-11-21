// function created to render new projects
export const renderProject = (project, container) => {
    const projectDiv = document.createElement('div');
    projectDiv.textContent = project.name;
    projectDiv.classList.add('projects');
    projectDiv.setAttribute('data-project-name', project.name);

    // add div for todo list tasks
    const todoDiv = document.createElement('div');
    todoDiv.id = 'todo-list';

    // add todo button to rendered project
    const addToDoButton = document.createElement('button');
    addToDoButton.textContent = 'Add todo';
    addToDoButton.classList.add('add-todo');
    // set a projectName property on button to determine which add todo button was pressed.
    addToDoButton.dataset.projectName = project.name;
    projectDiv.appendChild(todoDiv);
    projectDiv.appendChild(addToDoButton);
    container.appendChild(projectDiv);
}

export const clearProjects = (container) => {
    container.textContent = '';
}