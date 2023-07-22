/* eslint-disable react/prop-types */
//import React from "react";
import TaskItem from "./TaskItem";

const TasksList = ({ items, onDeleteItem }) => {
  if (items.length === 0) {
    return <h2 className="mt-3" style={{textAlign:"center"}}>No tasks found</h2>;
  }
  console.log(items);
  //fixed key from elem.userId to ${elem.userId}-${index} to make it unique
  return (
    <>
      {items.map((elem,index) => (
        <TaskItem
          onDeleteItem={onDeleteItem}
          key={`${elem.userId}-${index}`}
          userId={elem.userId}
          owner={elem.owner}
          id={elem.id}
          title={elem.title}
          description={elem.description}
          date={elem.date}
          image={elem.image}
          done={elem.done}
        />
      ))}
    </>
  );
};

export default TasksList;
