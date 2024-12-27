import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SubmittedForms from "./Components/UserList/SubmittedForms.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<SubmittedForms/>
    </>
  )
}

export default App
