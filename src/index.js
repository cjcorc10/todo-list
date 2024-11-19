import "./styles.css";
import { createToDo } from "./todo";
import { createProject } from "./project";
import { renderProject, clearProjects } from "./projectDOM";

document.addEventListener('DOMContentLoaded', () => {

    // open and close the dialog element
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

    // add task to todo list of project
    document.getElementById('clear-projects').addEventListener('click', () => clearProjects(content));
    // state to track active project
    let currentProject = null;

    const todoDialog = document.getElementById('todo-dialog');
    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-todo')) {
            const projectName = event.target.dataset.projectName;

            // use find method to find the project to add the task to
            currentProject = projectList.find((project) => project.name === projectName);

            if (currentProject) 
                todoDialog.showModal();
        }
    });

    document.getElementById('todo-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('todo-title').value;
        const description = document.getElementById('todo-description').value;
        const dueBy = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;

        const newTask = createToDo(title, description, dueBy, priority);
        currentProject.addListItem(newTask);

        todoDialog.close();
        event.target.reset();
    });

    document.getElementById('cancel-todo').addEventListener('click', () => todoDialog.close());


     
});