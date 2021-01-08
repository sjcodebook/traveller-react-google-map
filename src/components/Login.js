import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Configs from "./../config";
import { auth } from "./../scripts/fire";
import LoginBg from "./../assets/loginBg.jpg";

const Login = () => {
    return (
        <div id="bg">
            <div class="blackLayer">
                <img src={LoginBg} alt=""></img>
            </div>
            <div>
                <h1 className="authMsg">You have to login/signup first</h1>
                <div className="authButton">
                    <StyledFirebaseAuth
                        uiConfig={Configs.uiConfig}
                        firebaseAuth={auth}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
