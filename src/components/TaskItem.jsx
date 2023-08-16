/* eslint-disable react/prop-types */
//import React from "react";
import { useState } from "react";
import TimeDisplay from "../helpers/TimeDisplay";
import { useDispatch } from "react-redux";
import { doneTask, getTasks,deleteTask } from "../Features/todoSlice";
import { useSelector } from "react-redux";
import toaster from "../helpers/toaster";
import { useNavigate } from "react-router";

const TaskItem = ({done,description,title,date,id,onDeleteItem,userId,owner}) => {
  const [toggle, setToggle] = useState(done);
  console.log(toggle);
  const dispatch = useDispatch()
  //console.log();
  const tasksId = useSelector((state) => state.todo.tasks.id);
  const navigateTo = useNavigate()
  //const token = localStorage.getItem("token");
  //const headers = { Authorization: `Bearer ${token}`}
  const toggleHandler = async () => {
    try{
       dispatch(doneTask())
      setToggle((prevToggle) => !prevToggle);
      //alert("Task done status edited successfully");
       dispatch(getTasks())
       const doneId = document.getElementById(id)
       window.scrollTo(0,doneId.offsetTop - 20)
       console.log(doneId);
    }catch (error){
      console.log(error);
      //alert(error)
      toaster(error,"error",3000)
    }

  };
  const deleteHandler = () => {
    //?.setLoading(true)
    onDeleteItem(id)

    //dispatch(deleteTask(tasksId));
    dispatch(getTasks({onSuccess : () => {},onFail :() =>{navigateTo("/login")}}))
  }
  return (
    <>
      <div id={id} className="card rounded-5 shadow mt-4">
        <div className="card body rounded-4">
          <div className="text-right pe-3 pt-2">
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={deleteHandler}
            ></button>
          </div>
          <div className="row mt-2 ms-2">
            <div className="clearfix">
              <div className="float-start">
                {!toggle ? (
                  <span className="card-title tasktitle">{title}</span>
                ) : (
                  <s className="card-title tasktitle">{title}</s>
                )}
                <p className="lead tasklead">{description}</p>
              </div>
              <div className="float-end pe-4 pt-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input rounded-circle"
                    style={{ transform: "scale(1.5)" }}
                    id={`check${id}`}
                    name={`option${id}`}
                    //value={Math.floor(Math.random() * 1000)}
                    checked={toggle}
                    onChange={
                      toggleHandler
                      /*() => {
                      setToggle(!toggle);*/
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-9 ps-5">
              {/*<p className="lead taskdate">{new Date(date * 1000).toLocaleString()}</p>*/}
              <TimeDisplay unixTime={date}/>
            </div>
            <div className="col-sm-3">
              <img
                src={/*image*/"#"}
                className="float-end me-4 pb-2"
                width="50%"
                height="40px"
                alt="people"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
