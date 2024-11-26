import "./styles.css";
import { createToDo } from "./todo";
import { createProject } from "./project";
import { renderProject, clearProjects } from "./projectDOM";
import { renderToDo, toggleProps, handleToggleComplete } from "./todoDOM";

document.addEventListener('DOMContentLoaded', () => {

    // project dialog DOM nodes 
    const openDialog = document.getElementById('create-project');
    const dialog = document.getElementById('my-dialog');
    const closeButton = document.querySelector('#close-button');

    openDialog.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());
    

    // handling creating and deleting projects
    const container = document.getElementById('content'); 

    // global array to hold projects
    const projectList = [];
    const projectForm = document.getElementById('project-form');

    projectForm.addEventListener('submit', (event) => {
        handleAddProject(event);
    });

    // clear projects div & array
    document.getElementById('clear-projects').addEventListener('click', () => {
        clearProjects(container);
        projectList.splice(0, projectList.length);
    });


    // global variable used to hold state of active project
    let currentProject = null;
    let currentTask = null;

    const todoDialog = document.getElementById('todo-dialog');

    // event delegation for new DOM elements
    container.addEventListener('click', (event) => {
        // handle add-todo button press
        if (event.target.classList.contains('add-todo')) {
            handleAddToDo(event) 
        }

        if (event.target.classList.contains('remove-project')) {
            handleRemoveProject(event);
        }


        // remove todo task from project
        if (event.target.classList.contains('remove-todo')) {
            handleRemoveToDo(event);
        }

        if (event.target.classList.contains('expand-prop')) {
            toggleProps(event);
        }

        // mark task as completed
        if (event.target.classList.contains('completed')) {
            // logic to get current project
            currentProject = event.target.closest('[data-project-name]').dataset.projectName;
            // logic to get current task
            const currentTask = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
            
            // projectList[projectIndex].getList[taskIndex].markCompleted();
            const proj = projectList.find((proj) => proj.name === currentProject);
            const taskIndex = proj.getList().findIndex((task) => task.title === currentTask);
            proj.getListItem(taskIndex).markComplete();
            
            handleToggleComplete(event);
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
  


    /*
    FUNCTION DECLARATIONS
    */
    function renderALL(projectList) {
        renderProject(projectList);
        projectList.forEach((proj) => renderToDo(proj));
    }

    function handleAddProject(event) {
        event.preventDefault();

        const name = document.getElementById('project-name').value;   
    
        const newProject = createProject(name);
        projectList.push(newProject);

        dialog.close();
        renderALL(projectList);
        event.target.reset();
    }

    // add todo objects to project list 
    function handleAddToDo(event) {
        const projectName = event.target.dataset.projectName;
    
        // use find method to find the project to add the task to
        currentProject = projectList.find((project) => project.name === projectName);
    
        if (currentProject) 
            todoDialog.showModal();
    }


    function handleRemoveToDo(event) {
        const taskName = event.target.dataset.taskName;
        const projectName = event.target.closest('[data-project-name]').dataset.projectName;
        const project = projectList.find((proj) => proj.name === projectName);

        if (project) {
            // remove the task from the project
            project.removeListItem(taskName);
        
            // re-render project
            renderToDo(project);
        }
    }

    function handleRemoveProject(event) {
        const projectName = event.target.closest('[data-project-name]').dataset.projectName;
        currentProject = projectList.findIndex((proj) => proj.name === projectName);
        projectList.splice(currentProject, 1);

        renderProject(projectList);
    }


    
});
