/* eslint-disable react/prop-types */
//import React from "react";
import TaskItem from "./TaskItem";

const TasksList = ({ items, onDeleteItem }) => {
  if (items.length === 0) {
    return <h2>No tasks found</h2>;
  }
  console.log(items);
  return (
    <>
      {items.map((elem) => (
        <TaskItem
          onDeleteItem={onDeleteItem}
          key={elem.userId}
          userId={elem.userId}
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
