import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup.jsx";
import Spinner from "./Components/spinner/Spinner.jsx";
 const url = import.meta.env.VITE_API_URL;
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
function App() {
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("auth-token");
  useEffect(() => {

  const checkServer = () => {
    setLoading(true);

    fetch(`${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server responded with status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server Response:", data?.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
    checkServer();
  }, []);
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading === true ? <Spinner /> : authToken ? <Admin /> : <LoginSignup />}
    </>
  );
}

export default App;
