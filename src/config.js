import firebase from "firebase";

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
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callback: {
            signInSuccess: () => false,
        },
    },
};

export default Configs;
