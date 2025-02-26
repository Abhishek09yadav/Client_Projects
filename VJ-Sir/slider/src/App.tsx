// import "bootstrap/dist/min/bootstrap.min.css"
import "./App.css";
import "@mantine/core/styles.css";
import CollegeFinder from "./CollegeFinder/CollegeFinder.tsx";
import { FaSearch } from "react-icons/fa";
// import RankSlider from "./RankSlider/RankSlider.tsx";

function App() {


  return (
    <div >
<CollegeFinder/>
        {/*<RankSlider/>*/}
    </div>
  );
}

export default App;
