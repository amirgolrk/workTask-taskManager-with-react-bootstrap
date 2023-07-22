/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { useState } from "react";
import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm}></div>;
};

const ModalOverlay = ({ onInput, onConfirm }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescribe, setEnteredDescribe] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [toggle, setToggle] = useState(false);
  const [tasksData, setTasksData] = useState({
    userId: "",
    owner: "",
    title: "",
    description: "",
    done: false,
    date: "",
  });
  const submitHandler = async (e) => {
    //console.log(e);
    e.preventDefault();
    const ownerAndId =
    Math.floor(Math.random() * 200) + 1; //Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1; //Math.round(Math.random() * 100)
    setTasksData({
      userId: ownerAndId,
      owner: ownerAndId,
      title: enteredTitle,
      description: enteredDescribe,
      done: toggle,
      date: new Date(enteredDate).getTime().toString(),
    });
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    
    try{
      await axios
      .post("http://localhost:4000/todos",tasksData ,{ headers } )
      .then((response) => {
        setTasksData(response.data);
      })
    }catch{(error) => alert(error.response.data)}
    
    
    
      onInput(tasksData);
      console.log(tasksData);
      setEnteredTitle("");
      setEnteredDescribe("");
      setEnteredDate("");
      setToggle(false)
  };


  return (
    <div className="rounded-5 modalStyle">
      <div className="container">
        <h3 className="mt-1">New Task</h3>
        <form
          onSubmit={(e) => {
            onConfirm();
            submitHandler(e);
          }}
        >
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
              className="form-control mb-2"
              id="date"
              placeholder="Enter Date"
              name="date"
              onChange={(e) => setEnteredDate(e.target.value)}
              value={enteredDate}
            />
          </div>
          <label htmlFor={"checkbox"}> done ?</label>
          <input
            type="checkbox"
            className="form-check-input rounded-circle ms-2"
            style={{ transform: "scale(1.5)" }}
            id="checkbox"
            name="checkbox"
            value={Math.floor(Math.random() * 1000)}
            checked={toggle}
            onChange={() => {
              setToggle(!toggle);
            }}
          />
          <button type="submit" className="btn btn-primary mt-1 float-end">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const FormModal = ({ onConfirm, onInput }) => {
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

