import "./styles.css";
import { createToDo } from "./todo";
import { createProject } from "./project";
import { renderProject, clearProjects } from "./projectDOM";
import { renderToDo } from "./todoDOM";

document.addEventListener('DOMContentLoaded', () => {

    // open and close the new project dialog element
    const openDialog = document.getElementById('create-project');
    const dialog = document.getElementById('my-dialog');
    const closeButton = document.querySelector('#close-button');

    openDialog.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());
    

    // handling creating and deleting projects
    const container = document.getElementById('content'); 

    const projectList = [];
    const projectForm = document.getElementById('project-form');

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('project-name').value;   
    
        const newProject = createProject(name);
        projectList.push(newProject);

        dialog.close();
        renderProject(newProject, container);
        event.target.reset();
    });

    // clear projects div & array
    document.getElementById('clear-projects').addEventListener('click', () => {
        clearProjects(container);
        projectList.splice(0, projectList.length);
    });
    // state to track active project
    let currentProject = null;


    const todoDialog = document.getElementById('todo-dialog');
    // event delegation for new DOM elements
    container.addEventListener('click', (event) => {
        // add a todo task to project
        if (event.target.classList.contains('add-todo')) {
            const projectName = event.target.dataset.projectName;

            // use find method to find the project to add the task to
            currentProject = projectList.find((project) => project.name === projectName);

            if (currentProject) 
                todoDialog.showModal();
        }

        // remove todo task from project
        if (event.target.id === 'remove-todo') {
            const taskName = event.target.dataset.taskName;
            currentProject.removeListItem(taskName);
            console.log(currentProject.getList());
            renderToDo(currentProject);
        }
    });

    // form for creating todo tasks
    document.getElementById('todo-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('todo-title').value;
        const description = document.getElementById('todo-description').value;
        const dueBy = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;

        const newTask = createToDo(title, description, dueBy, priority);
        currentProject.addListItem(newTask);

        renderToDo(currentProject);
        todoDialog.close();
        event.target.reset();
    });

    document.getElementById('cancel-todo').addEventListener('click', () => todoDialog.close());
  
});