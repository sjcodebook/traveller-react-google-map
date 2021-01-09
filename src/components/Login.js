import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Configs from "./../config";
import { auth } from "./../scripts/fire";
import LoginBg from "./../assets/loginBg.jpg";

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div id="bg">
            <div className="blackLayer">
                <img src={LoginBg} alt=""></img>
            </div>
            <div>
                <h1 className="authMsg">You have to login/signup first</h1>
                {!isLoading ? (
                    <div className="authButton">
                        <StyledFirebaseAuth
                            uiConfig={Configs.uiConfig}
                            firebaseAuth={auth}
                        />
                    </div>
                ) : (
                    <div className="loader authLoader"></div>
                )}
            </div>
        </div>
    );
};

export default Login;
