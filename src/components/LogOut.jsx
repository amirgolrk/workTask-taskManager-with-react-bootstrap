import { RiLogoutCircleLine } from "react-icons/ri";
import { logOut } from "../Features/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toaster from "../helpers/toaster";

const LogOut = () => {
    const dispatchTo = useDispatch();
    const navigateTo = useNavigate()

    const logoutHandler = () => {
        dispatchTo(
            logOut({
              onSuccess: () => {
                navigateTo("login");
              },
              onFail: () => {
                toaster("some error occured","error",3000)
              },
            })
          );
    }



    return (
        <>
        <li
        title="logOut from the app"
        className="nav-item nav-link  text-danger"
        onClick={logoutHandler}
        style={{ cursor: "pointer" }}
      >
        <RiLogoutCircleLine
          style={{
            color: "red",
            fontSize: "25px",
            cursor: "pointer",
            marginLeft: "5px",
          }}
        />
      </li>
      </>
    )
}

export default LogOut


