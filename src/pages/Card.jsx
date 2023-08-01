import { useState, useEffect } from "react";
//import people1 from "../assets/Screenshot 2023-07-05 142051.png";
//import people2 from "../assets/Screenshot 2023-07-05 154910.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import Tasks from "../components/Tasks";
import FormModal from "../modals/FormModal";
//import axios from "axios";
import Loader from "../helpers/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../Features/todoSlice";
import { deleteTask } from "../Features/todoSlice";
import CurrentTimeComponent from "../helpers/CurrentTimeComponent";
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
  const openedCount = useSelector((state) => state.todo.openedCount);
  const closedCount = useSelector((state) => state.todo.closedCount);
  const openedTasks = useSelector((state) => state.todo.openedTasks);
  const closedTasks = useSelector((state) => state.todo.closedTasks);
  const [taskType, setTaskType] = useState(0);

  const confirmHandler = () => {
    setFormIsOpen(null);
  };

  const addData = async (task) => {
    // We don't need this function since we're handling tasks through Redux.
    // If you have a form for adding tasks, you can dispatch the `AddTask` action instead.
    await dispatch(getTasks());
  };

  /*const deleteHandler = (taskId) => {
    dispatch(deleteTask(taskId));
    dispatch(getTasks());
  };*/
  async function deleteHandler(taskId) {
    await dispatch(deleteTask(taskId));
    await dispatch(getTasks());
  }

  useEffect(() => {
    // Dispatch getTasks action to load tasks from the API
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      {formIsOpen && <FormModal onConfirm={confirmHandler} onInput={addData} />}

      <div className="container-fluid custom-width-45">
        <div className="card mx-auto my-auto rounded-5">
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
                <CurrentTimeComponent />
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
            <div className="d-flex justify-content-center mt-3 text-center">
              <div className="col dash-nav">
                <a
                  href="#"
                  className={`${taskType === 0 && "text-primary"}`}
                  onClick={() => {
                    setTaskType(0);
                  }}
                >
                  all{" "}
                  <span
                    className={`badge ${
                      taskType === 0 ? "bg-primary" : "bg-secondary"
                    } rounded-pill ms-1`}
                  >
                    {tasksData?.length}
                  </span>
                </a>
              </div>
              <div className="col dash-nav">
                <a
                  href="#"
                  className={`${taskType === 1 && "text-primary"}`}
                  onClick={() => {
                    setTaskType(1);
                  }}
                >
                  Opened{" "}
                  <span
                    className={`badge ${
                      taskType === 1 ? "bg-primary" : "bg-secondary"
                    } rounded-pill ms-1`}
                  >
                    {openedCount}
                  </span>
                </a>
              </div>
              <div className="col dash-nav">
                <a
                  href="#"
                  className={`${taskType === 2 && "text-primary"}`}
                  onClick={() => {
                    setTaskType(2);
                  }}
                >
                  Closed{" "}
                  <span
                    className={`badge ${
                      taskType === 2 ? "bg-primary" : "bg-secondary"
                    } rounded-pill ms-1`}
                  >
                    {closedCount}
                  </span>
                </a>
              </div>
              <div className="col dash-nav">
                <a href="#">
                  Archived{" "}
                  <span className="badge bg-secondary rounded-pill ms-1">
                    2
                  </span>
                </a>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : taskType === 0 ? (
              <Tasks items={tasksData} onDeleteItem={deleteHandler} />
            ) : taskType === 1 ? (
              <Tasks items={openedTasks} onDeleteItem={deleteHandler} />
            ) : taskType === 2 ? (
              <Tasks items={closedTasks} onDeleteItem={deleteHandler} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
