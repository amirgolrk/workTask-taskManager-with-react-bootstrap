/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { useState } from "react";
import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm}></div>;
};

const ModalOverlay = ({ onInput, onConfirm }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescribe, setEnteredDescribe] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const submitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const tasksData = {
      id: Math.round(Math.random() * 100),
      title: enteredTitle,
      description: enteredDescribe,
      date: new Date(enteredDate).toString(),
    };
    onInput(tasksData);
    console.log(tasksData);
    setEnteredTitle("");
    setEnteredDescribe("");
    setEnteredDate("");
  };

  return (
    <div className="rounded-5 modalStyle">
      <div className="container">
        <h3 className="mt-1">New Task</h3>
        <form onSubmit={(e) => {onConfirm(); submitHandler(e);}}>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title:</label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              placeholder="Enter your title"
              name="title"
              onChange={(e) => setEnteredTitle(e.target.value)}
              value={enteredTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              type="textarea"
              className="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
              rows={3}
              onChange={(e) => setEnteredDescribe(e.target.value)}
              value={enteredDescribe}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Enter Date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Enter Date"
              name="date"
              onChange={(e) => setEnteredDate(e.target.value)}
              value={enteredDate}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-1 float-end">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const FormModal = ({onConfirm,onInput}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={onConfirm} onInput={onInput} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default FormModal;
