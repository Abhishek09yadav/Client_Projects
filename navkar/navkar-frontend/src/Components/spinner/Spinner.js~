import {useState} from "react";
import {FadeLoader} from "react-spinners";

// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
// };

function Spinner({paragraph}) {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("rgba(214,214,248,0.94)");

    return (
        <div className=" d-flex flex-column justify-content-center align-items-center">

            <FadeLoader
                color={color}
                loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className={'text-center fs-5 text-white mt-2'}>{paragraph}</div>
        </div>
    );
}

export default Spinner;