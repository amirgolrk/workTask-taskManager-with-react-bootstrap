import { useState, useEffect } from "react";
//import people1 from "../assets/Screenshot 2023-07-05 142051.png";
//import people2 from "../assets/Screenshot 2023-07-05 154910.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import Tasks from "../components/Tasks";
import FormModal from "../modals/FormModal";
//import axios from "axios";
import Loader from "../helpers/Loader";
import { useDispatch , useSelector } from "react-redux";
import { getTasks } from "../Features/todoSlice";
import { deleteTask } from "../Features/todoSlice";


/*function Card() {
  //const dispatch = useDispatch()
  //const reduxTasks = useSelector((state) => state.todoslice.tasks)
  const [formIsOpen, setFormIsOpen] = useState();
  const [tasksData, setTasksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      //dispatch(getTasks())
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/todos", {
          headers,
        });
        setTasksData(response.data);
        //console.log(tasksData);
      } catch (error) {
        alert(error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirmHandler = () => {
    setFormIsOpen(null);
  };

  const addData = (task) => {
    setTasksData([task, ...tasksData]);
    console.log(tasksData);
  };

  const deleteHandler = async (taskId) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4000/todos/${taskId}`, { headers });
      await setTasksData((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task?.id !== taskId);
        return updatedTasks;
      });
      alert("task deleted successfully");
    } catch {
      (error) => {
        alert(error?.response?.data);
      };
    }
    setIsLoading(false);
  };
  //console.log(tasksData);*/

  function Card() {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const dispatch = useDispatch();
    const tasksData = useSelector((state) => state.todo.tasks);
    console.log(tasksData);
    const isLoading = useSelector((state) => state.todo.loading);
    useEffect(() => {
      // Dispatch getTasks action to load tasks from the API
      dispatch(getTasks());
    }, [dispatch]);

    const confirmHandler = () => {
      setFormIsOpen(null);
    };
  
    const addData = (task) => {
      // We don't need this function since we're handling tasks through Redux.
      // If you have a form for adding tasks, you can dispatch the `AddTask` action instead.
      dispatch(getTasks());
    };
  
    const deleteHandler = (taskId) => {
      dispatch(deleteTask(taskId));
      dispatch(getTasks());
    };

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
            {isLoading ? (
              <Loader />
            ) : (
              <Tasks items={tasksData} onDeleteItem={deleteHandler} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
