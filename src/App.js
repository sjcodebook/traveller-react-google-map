import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Map from "./components/Map";

import { auth } from "./scripts/fire";
// import Configs from "./config";

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
            setUser(user);
        });
    }, []);

    return (
        <div>
            <h1>
                Traveller{" "}
                <span role="img" aria-label="tent">
                    🏝️
                </span>
            </h1>
            {isSignedIn ? (
                <div>
                    <button onClick={() => auth.signOut()}> Logout</button>
                    <Map />
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default App;
