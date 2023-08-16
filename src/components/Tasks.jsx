// eslint-disable-next-line react/prop-types, no-unused-vars
import TasksList from "./TasksList";


// eslint-disable-next-line react/prop-types
const Tasks = ({items,onDeleteItem,done}) => {

  console.log(items);
  return (
    <>
      <TasksList onDeleteItem={onDeleteItem} items={items} done={done}/>
    </>
  );
};
export default Tasks;
