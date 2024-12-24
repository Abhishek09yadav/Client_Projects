import {useContext, useState} from 'react'
import './App.css'
import Navbar from "./Components/Navbar.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import {ShopContext} from "../Context/ShopContext.jsx"
import LoginSignup from "./Components/LoginSignup/LoginSignup.jsx";
function App() {
    const [count, setCount] = useState(0)
    const { userDetails } = useContext(ShopContext);
    const authToken = localStorage.getItem("auth-token");
    return (
        <>
            <Navbar/>

            {authToken ? <Admin/>: <LoginSignup/>}
        </>
    )
}

export default App
