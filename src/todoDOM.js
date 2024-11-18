export const renderToDo = (todo, project) => {
    const toDoDiv = document.createElement('div');
    toDoDiv.innerHTML = `
    <h3>${todo.title}</h3>`;
}