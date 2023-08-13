import { toast } from "react-toastify";


 const toaster = (message ,type , timer) => {
    toast[type](message, {
        position: "top-left",
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
}


export default toaster