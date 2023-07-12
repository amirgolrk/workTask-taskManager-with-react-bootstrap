//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "./pages/Card"
import LoginForm from "./pages/LoginForm"
import Layout from "./pages/layout";
import ErrorPage from "./pages/ErrorPage";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<LoginForm/>}/>
                    <Route path="todo" element={<Card/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App