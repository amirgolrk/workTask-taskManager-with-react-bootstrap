//import React from "react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TaskItem = ({onDeleteItem, title, description, id, date, image,done}) => {
  const [toggle, setToggle] = useState(done);

  const deleteHandler = () => {
    onDeleteItem(id)
  }
  return (
    <>
      <div className="card rounded-5 shadow-sm mt-4">
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
                    onChange={() => {
                      setToggle(!toggle);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-9 ps-5">
              <p className="lead taskdate">{new Date(date * 1000).toLocaleString()}</p>
            </div>
            <div className="col-sm-3">
              <img
                src={image}
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
