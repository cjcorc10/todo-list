export const renderToDo = (project) => {
    const projectDiv = document.querySelector(`[data-project-name="${project.name}"]`);
    const todoContainer = projectDiv.querySelector('#todo-list');
    
    // clear current div
    todoContainer.textContent = '';

    // fill div with all of the todo tasks
    const projectList = project.getList();
    projectList.forEach((todo, index) => {
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add(`todo-div-${todo.title}`);
        toDoDiv.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.dueDate}</p>
        <div class="properties" style="display: none">
            <p>description: ${todo.description}</p>
            <p>priority: ${todo.priority}</p>
            <button class='completed'>mark as complete</button>
        </div>
        <div class="todo-buttons">
            <button class="expand-prop">expand</button>
            <button class="remove-todo" data-task-name="${todo.title}">Remove task</button>
        </div>`;
        toDoDiv.classList.add('incomplete-task');
        todoContainer.appendChild(toDoDiv);
    });


}  

// function to show other todo properties
export const toggleProps = (event) => {
    const propertyNode = event.target.parentElement.previousElementSibling;

    // toggle the hidden div node
    const isVisible = propertyNode.style.display === "block";
    propertyNode.style.display = isVisible ? "none" : "block"
    event.target.textContent = isVisible ? "view more": "view less";
}


export const handleToggleComplete = (event) => {
    const parentDiv = event.target.parentElement.parentElement;

    const isComplete = parentDiv.classList.toggle('incomplete-task');
    parentDiv.classList.toggle('complete-task', !isComplete);
    event.target.textContent = !isComplete ? 'mark as incomplete' : 'mark as complete';
}