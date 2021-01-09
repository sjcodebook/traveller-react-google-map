import firebase from "firebase";
import userStore from "./stores/UserStore";

const Configs = {
    FirebaseConfig: {
        apiKey: "AIzaSyBMPS84k0cIrl1gQ-vrDU1etteWtuBOL6c",
        authDomain: "traveller-74548.firebaseapp.com",
        projectId: "traveller-74548",
        storageBucket: "traveller-74548.appspot.com",
        messagingSenderId: "526361139098",
        appId: "1:526361139098:web:08343800921c4c12bbcc23",
    },
    uiConfig: {
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                if (authResult.user) {
                    const currentUser = authResult.user;
                    userStore.setCurrentUser(
                        currentUser.uid,
                        currentUser.email,
                        currentUser.displayName,
                        currentUser.photoURL
                    );
                }
            },
        },
    },
};

export default Configs;
