/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="rounded-5 modalStyle">
      <div className="container">
        <h3 className="mt-1">New Task</h3>
        <form action="/action_page.php" onSubmit={props.onConfirm}>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title:</label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              placeholder="Enter your title"
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">description:</label>
            <textarea
              type="textarea"
              className="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
              rows={3}
            />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-1 float-end">
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
