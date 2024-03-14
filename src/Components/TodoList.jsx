import { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTasklist] = useState([]);

  useEffect(() => {
    const arr = localStorage.getItem("taskList");
    if (arr) {
      // Check if arr is not null or undefined
      const obj = JSON.parse(arr); // Parse the JSON string
      setTasklist(obj); // Set the task list state
    }
  }, []);

  const toggle = () => setModal(!modal);

  const saveTask = (taskObj) => {
    // Create a new array with the updated task list
    const updatedTaskList = [...taskList, taskObj];

    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    // Set the new task list and close the modal
    setModal(false);
    setTasklist(updatedTaskList);
  };

  const deleteTask = (index) => {
    // Create a copy of the current task list
    const updatedTaskList = [...taskList];
    // Remove the task at the specified index
    updatedTaskList.splice(index, 1);
    // Update local storage with the updated task list
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    // Set the new task list state
    setTasklist(updatedTaskList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setModal(false);
    setTasklist(updatedTaskList);
    window.location.reload();
  };

  return (
    <>
      <div className="header-wrap">
        <h3>Todo List</h3>
        <button className="btn-modal" onClick={toggle}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList.map((obj, index) => (
          <Card
            key={index}
            taskObj={obj}
            index={index}
            deleteTask={deleteTask}
            updateListArray={updateListArray}
          />
        ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
