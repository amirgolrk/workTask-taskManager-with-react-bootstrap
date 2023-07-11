/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="container">
        <h2>New Task</h2>
        <form action="/action_page.php" onSubmit={props.onConfirm}>
          <div className="form-group">
            <label htmlFor="email">Task Title:</label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              placeholder="Enter your title"
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
            />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-default">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const FormModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        // eslint-disable-next-line react/prop-types
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        // eslint-disable-next-line react/prop-types
        <ModalOverlay onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default FormModal;
