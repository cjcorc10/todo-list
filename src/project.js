/*
Factory function used to create projects. Projects will have a name and a
list of todo objects.
*/
function createProject(name) {
  let toDoList = [];

  const addListItem = (toDoItem) => toDoList.push(toDoItem);

  const removeListItem = (taskId) => {
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].id === taskId) toDoList.splice(i, 1);
    }
  };

  const getList = () => [...toDoList];

  const getListItem = (id) => {
    const task = toDoList.find((task) => task.id === id);
    return task;

  }
  return {
    id: Date.now().toString(),
    name,
    addListItem,
    removeListItem,
    getList,
    getListItem,
  };
}

export { createProject };
