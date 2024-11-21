export const renderToDo = (project) => {
    const projectDiv = document.querySelector(`[data-project-name="${project.name}"]`);
    const todoContainer = projectDiv.querySelector('#todo-list');
    
    // clear current div
    todoContainer.textContent = '';

    // fill div with all of the todo tasks
    for(let i=0; i < project.getList().length; i++) {
        const toDoDiv = document.createElement('div');
        toDoDiv.innerHTML = `
        <h3>${project.getList()[i].title}</h3>
        <p>${project.getList()[i].dueDate}<p>
        <button>expand</button>
        <button id="remove-todo" data-task-name="${project.getList()[i].title}">Remove task</button>`
        todoContainer.appendChild(toDoDiv);
    }
}  