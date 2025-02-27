// import "bootstrap/dist/min/bootstrap.min.css"
import "./App.css";
import "@mantine/core/styles.css";
import CollegeFinder from "./CollegeFinder/CollegeFinder.tsx";
import { FaSearch } from "react-icons/fa";
import RankSlider from "./RankSlider/RankSlider.tsx";

function App() {


  return (
    <div >
        <RankSlider/>
{/* <CollegeFinder/> */}
    </div>
  );
}

export default App;
