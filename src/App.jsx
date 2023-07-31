
//import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Card from "./pages/Card"
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import RouteGuard from "./components/RouteGuard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (
        <BrowserRouter>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<SignUpForm />}/>
                    <Route path="login" element={<LoginForm />}/>
                    <Route path="todo" element={<RouteGuard><Card/></RouteGuard>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App
