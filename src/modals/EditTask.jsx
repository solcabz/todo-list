import PropTypes from "prop-types"; // Import PropTypes
import { useEffect, useState } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  useEffect(() => {
    setTaskName(taskObj.Name);
    setDescription(taskObj.Description);
  }, [taskObj]); // Ensure useEffect runs when taskObj changes

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      Name: taskName,
      Description: description,
    };
    updateTask(updatedTask);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>

      <ModalBody>
        <form>
          <div className="form-group">
            <label className="pb-2">Task Name</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              onChange={handleChange}
              name="taskName"
            />
          </div>
          <div className="form-group pt-3">
            <label className="pb-2">Description</label>
            <textarea
              rows="5"
              className="form-control"
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

EditTask.propTypes = {
  modal: PropTypes.bool.isRequired, // modal should be a boolean and is required
  toggle: PropTypes.func.isRequired, // toggle should be a function and is required
  updateTask: PropTypes.func.isRequired,
  taskObj: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired, // taskObj should be an object with Name and Description string properties and is required
};

export default EditTask;
