// eslint-disable-next-line react/prop-types, no-unused-vars
import TasksList from "./TasksList";


// eslint-disable-next-line react/prop-types
const Tasks = (items) => {
  return (
    <>
      <TasksList items={items}/>
    </>
  );
};
export default Tasks;
