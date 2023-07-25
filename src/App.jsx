
//import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Card from "./pages/Card"
import SignUpForm from "./pages/signUpForm";
import LoginForm from "./pages/LoginForm";
import Layout from "./pages/layout";
import ErrorPage from "./pages/ErrorPage";
import RouteGuard from "./components/RouteGuard";

const App = () => {
    return (
        <BrowserRouter>
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
