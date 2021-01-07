import React from "react";
import Map from "./components/Map";

const App = () => {
    return (
        <div>
            <h1>
                Traveller{" "}
                <span role="img" aria-label="tent">
                    🏝️
                </span>
            </h1>
            <Map />
        </div>
    );
};

export default App;
