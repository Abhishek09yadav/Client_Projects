import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup.jsx";
import Spinner from "./Components/spinner/Spinner.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("auth-token");
  useEffect(() => {
    const checkServer = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/`);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    checkServer();
  }, []);
  return (
    <>
      <Navbar />
      {loading === true ? <Spinner /> :(authToken ? <Admin /> : <LoginSignup />)}
    </>
  );
}

export default App;
