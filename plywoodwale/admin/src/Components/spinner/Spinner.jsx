import {useState} from "react";
import {FadeLoader} from "react-spinners";

// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
// };

function Spinner({paragraph}) {
    let [loading, setLoading] = useState(true);


    return (
        <div className=" d-flex flex-column justify-content-center align-items-center">

            <FadeLoader
                color={'#01a0e2'}
                loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className={'text-center fs-5 text-black mt-2'}>{paragraph}</div>
        </div>
    );
}

export default Spinner;