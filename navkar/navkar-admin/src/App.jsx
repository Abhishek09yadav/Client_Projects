import {useState} from 'react'
import './App.css'
import Navbar from "./Components/Navbar.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Navbar/>
            <Admin/>
        </>
    )
}

export default App
