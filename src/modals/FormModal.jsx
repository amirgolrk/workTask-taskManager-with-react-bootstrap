/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";
import "./FormModal.css";
import "bootstrap/dist/css/bootstrap.min.css";


const FormModal = ({ onConfirm, onInput }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={onConfirm} onInput={onInput} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default FormModal;

