/* eslint-disable react/prop-types */
//import React from "react";
import TaskItem from "./TaskItem";

const TasksList = ({items}) => {
    if (items.length === 0){
        return <h2>no Tasks Found</h2>
    }
    console.log(items);
    return (
        items?.items?.map((elem)=> {
            return <TaskItem key={elem.id} id={elem.id} title={elem.title} description={elem.description} date={elem.date} image={elem.image}/>
        })
    )
}

export default TasksList