import PropTypes from "prop-types";
import { Trash, PencilLine } from "@phosphor-icons/react";
import { useState } from "react";

import EditTask from "../modals/EditTask";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#a9def9",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#fdffb6",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#e2e1b9",
      secondaryColor: "#F2FAF1",
    },
  ];

  const handleDelete = () => {
    deleteTask(index);
  };

  const toggle = () => setModal(!modal);

  const updateTask = (updatedTaskObj) => {
    // Update taskObj at the given index
    updateListArray(updatedTaskObj, index);
  };

  return (
    <>
      <div
        className="card-wrapper mr-5"
        style={{ backgroundColor: colors[index % 3].primaryColor }}
      >
        <div className="card-top"></div>
        <div className="task-holder">
          <span
            className="card-header"
            style={{
              backgroundColor: "#f2faf1",
              borderRadius: "10px",
            }}
          >
            {taskObj.Name}
          </span>

          <p className="mt-3"> {taskObj.Description} </p>

          <div className="btn-tool">
            <PencilLine
              color="#60d394"
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => setModal(true)}
            />
            <Trash
              color="#ff686b"
              size={18}
              style={{ cursor: "pointer" }}
              onClick={handleDelete}
            />
          </div>
        </div>

        <EditTask
          modal={modal}
          toggle={toggle}
          updateTask={updateTask}
          taskObj={taskObj}
        />
      </div>
    </>
  );
};

Card.propTypes = {
  taskObj: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateListArray: PropTypes.func.isRequired, // Add PropTypes validation for updateListArray
};

export default Card;
