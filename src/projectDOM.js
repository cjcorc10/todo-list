// function created to render new projects
export const renderProject = (project, container) => {
    const projectDiv = document.createElement('div');
    projectDiv.textContent = project.name;
    projectDiv.classList.add('projects');

    const addToDoButton = document.createElement('button');
    addToDoButton.textContent = 'Add todo';
    addToDoButton.classList.add('add-todo');

    projectDiv.appendChild(addToDoButton);
    container.appendChild(projectDiv);
}

export const clearProjects = (container) => {
    container.textContent = '';
}