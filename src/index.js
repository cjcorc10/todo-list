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
    });

    document.getElementById('clear-projects').addEventListener('click', () => clearProjects(content));


});
