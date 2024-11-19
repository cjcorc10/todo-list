/*
Factory function used to create projects. Projects will have a name and a
list of todo objects.
*/
function createProject(name) {
    let toDoList = [];

    const addListItem = (toDoItem) => toDoList.push(toDoItem);
    
    const removeListItem = (index) => {
        toDoList.splice(index, 1);
    }

    const getList = () => [...toDoList];

    return { name, addListItem, removeListItem, getList };
}

export { createProject };