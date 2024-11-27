import "./styles.css";
import { createToDo } from "./todo";
import { createProject } from "./project";
import { renderProject, clearProjects } from "./projectDOM";
import { renderToDo, toggleProps, handleToggleComplete } from "./todoDOM";

document.addEventListener("DOMContentLoaded", () => {
  // project dialog DOM nodes
  const openDialog = document.getElementById("create-project");
  const dialog = document.getElementById("my-dialog");
  const closeButton = document.querySelector("#close-button");

  openDialog.addEventListener("click", () => dialog.showModal());
  closeButton.addEventListener("click", () => dialog.close());

  // handling creating and deleting projects
  const container = document.getElementById("content");

  // global array to hold projects
  const projectList = [];

  // create map for project objecs and DOM objects
  const domMap = new Map();
  const projectForm = document.getElementById("project-form");

  projectForm.addEventListener("submit", (event) => {
    handleAddProject(event);
  });

  // clear projects div & array
  document.getElementById("clear-projects").addEventListener("click", () => {
    clearProjects(container);
    projectList.splice(0, projectList.length);
  });

  // global variable used to hold state of active project
  let currentProject = null;
  let currentTask = null;

  const todoDialog = document.getElementById("todo-dialog");

  // event delegation for new DOM elements
  container.addEventListener("click", (event) => {
    // handle add-todo button press
    if (event.target.classList.contains("add-todo")) {
      handleAddToDo(event);
    }

    if (event.target.classList.contains("remove-project")) {
      handleRemoveProject(event);
    }

    // remove todo task from project
    if (event.target.classList.contains("remove-todo")) {
      handleRemoveToDo(event);
    }

    if (event.target.classList.contains("expand-prop")) {
      toggleProps(event);
    }

    // mark task as completed
    if (event.target.classList.contains("completed")) {
      // logic to get current project
      currentProject = getState(event);
      // logic to get current task
      const taskId = event.target.closest("[data-to-do-id]").dataset.toDoId;
      const currentTask = currentProject.getListItem(taskId);

      // Get task object and mark as complete

      currentTask.markComplete();

      handleToggleComplete(event);
    }
  });

  // form for creating todo tasks
  document.getElementById("todo-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueBy = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    const newTask = createToDo(title, description, dueBy, priority);
    currentProject.addListItem(newTask);

    renderToDo(currentProject, domMap);
    todoDialog.close();
    event.target.reset();
  });

  document
    .getElementById("cancel-todo")
    .addEventListener("click", () => todoDialog.close());

  /*
    FUNCTION DECLARATIONS
    */
  function renderALL(projectList) {
    renderProject(projectList, domMap);
    projectList.forEach((proj) => renderToDo(proj, domMap));
  }

  function handleAddProject(event) {
    event.preventDefault();

    const name = document.getElementById("project-name").value;

    const newProject = createProject(name);
    projectList.push(newProject);

    dialog.close();
    renderALL(projectList);
    event.target.reset();
  }

  // add todo objects to project list
  function handleAddToDo(event) {
    currentProject = getState(event);

    if (currentProject) todoDialog.showModal();
  }

  function handleRemoveToDo(event) {
    currentTask = getCurrentTask(event);
    currentProject = getState(event);

    const taskId = currentTask.id;
    if (currentProject) {
      // remove the task from the project
      currentProject.removeListItem(taskId);

      // re-render project
      renderToDo(currentProject, domMap);
    }
  }

  function handleRemoveProject(event) {
    currentProject = getState(event);
    projectList.splice(currentProject, 1);

    renderProject(projectList, domMap);
  }

  function getState(event) {
    const projectId =
      event.target.closest("[data-project-id]").dataset.projectId;
    currentProject = projectList.find((proj) => proj.id === projectId);
    return currentProject;
  }

  function getCurrentTask(event) {
    const taskId = event.target.closest("[data-to-do-id]").dataset.toDoId;
    currentProject = getState(event);

    const currentTask = currentProject.getListItem(taskId);
    return currentTask;
  }
});
