import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Login from "./components/Login";
import Map from "./components/Map";

import userStore from "./stores/UserStore";
import { setAuthStateChangeListener, logout } from "./scripts/remoteActions";

const App = observer(() => {
    useEffect(() => {
        setAuthStateChangeListener();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStore.currentUser]);

    return (
        <div>
            <h1>
                Traveller{" "}
                <span role="img" aria-label="tent">
                    🏝️
                </span>
            </h1>
            {userStore.isLoggedIn ? (
                <div>
                    <button onClick={() => logout()}> Logout</button>
                    {userStore.currentUser.email}
                    <Map />
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
});

export default App;
