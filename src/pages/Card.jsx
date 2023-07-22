//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useState , useEffect } from "react";
//import people1 from "../assets/Screenshot 2023-07-05 142051.png";
//import people2 from "../assets/Screenshot 2023-07-05 154910.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import Tasks from "../components/Tasks";
import FormModal from "../modals/FormModal";
import axios from "axios";

function App() {
  /*const DUMMY_DATA = [
    {
      id: 1,
      title: "Client Review & Feedback",
      description: "crypto wallet Redesign",
      date: "today 10:00 pm - 11:45 pm",
      image: people1,
      done : true
    },
    {
      id: 2,
      title: "Create Wireframe",
      description: "crypto wallet Redesign",
      date: "today 09:10 pm - 10:00 pm",
      image: people2,
      done : false
    },
  ];*/
  const [formIsOpen, setFormIsOpen] = useState();
  //const [tasksData, setTasksData] = useState(DUMMY_DATA);
  const [tasksData, setTasksData] = useState([]);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}`}

  useEffect(() => {
    const fetchData =async () => {
      try{
        const response = await axios.get('http://localhost:4000/todos',{headers})
        setTasksData(response.data)
        console.log(tasksData);
      }catch(error){alert(error.response.data);}
    }
    fetchData()
  },[])

  const confirmHandler = () => {
    setFormIsOpen(null);
  };

  const addData = (task) => {
    setTasksData([task, ...tasksData]);
    console.log(tasksData);
  };

  const deleteHandler = async (taskId) => {
    try{
      await axios.delete(`http://localhost:4000/todos/${taskId}`, {headers})
      await setTasksData((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task?.id !== taskId);
        return updatedTasks;  
      });
      alert("task deleted successfully")
    }catch{
      (error) => {alert(error.response.data)}
    }
  };
  console.log(tasksData);
  return (
    <>
      {formIsOpen && <FormModal onConfirm={confirmHandler} onInput={addData} />}

      <div className="container-fluid w-75">
        <div className="card mx-auto my-auto w-50 rounded-5">
          <div className="card-header">
            <ul className="nav justify-content-center nav-fill">
              <li className="nav-item navbar-items">
                <a className="nav-link" href="#">
                  messages
                </a>
              </li>
              <li className="nav-item navbar-items">
                <a className="nav-link active" href="#">
                  todays tasks
                </a>
              </li>
              <li className="nav-item navbar-items">
                <a className="nav-link" href="#">
                  last activity
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body rounded-5">
            <div className="row">
              <div className="col">
                <h3 className="card-title">Todays Task</h3>
                <p className="lead">wednesday , 11 may</p>
              </div>
              <div className="col">
                <button
                  className="btn addbtn mt-3 float-end me-1"
                  onClick={() => {
                    setFormIsOpen(true);
                  }}
                >
                  + New Task
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <ul className="list-group list-group-horizontal text-center">
                <li className="list-group-item">
                  <a href="#">
                    All
                    <span className="badge bg-primary rounded-pill pl-1">
                      35
                    </span>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    Opened
                    <span className="badge bg-secondary rounded-pill">14</span>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    Closed
                    <span className="badge bg-secondary rounded-pill">19</span>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    Archived
                    <span className="badge bg-secondary rounded-pill">2</span>
                  </a>
                </li>
              </ul>
            </div>
            <Tasks items={tasksData} onDeleteItem={deleteHandler} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
