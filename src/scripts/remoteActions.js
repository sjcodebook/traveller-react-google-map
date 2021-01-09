import { firebase, firestore, auth } from "./../scripts/fire";
import userStore from "../stores/UserStore";

let unsubscribeListeners = [];

export const setAuthStateChangeListener = () => {
    const unsubscribeListenerOnAuth = auth.onAuthStateChanged((currentUser) => {
        onAuthStateChangedCallback(currentUser);
    });
    unsubscribeListeners.push(unsubscribeListenerOnAuth);
};

const onAuthStateChangedCallback = (currentUser) => {
    if (currentUser) {
        const logoutCallback = logout;
        createUserIfNotExists(currentUser, logoutCallback).then(() => {
            loadUser(currentUser);
        });
    }
};

const createUserIfNotExists = async (currentUser, logoutCallback) => {
    try {
        const docData = await firestore
            .collection("users")
            .doc(currentUser.uid)
            .get();

        if (!docData.exists) {
            await firestore.collection("users").doc(currentUser.uid).set({
                email: currentUser.email,
                name: currentUser.displayName,
                picUrl: currentUser.photoURL,
                time: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        return Promise.resolve("success");
    } catch (err) {
        console.error(`createUserIfNotExists. Error:\n${err}`);
        logoutCallback().then(() => {
            window.location.href = "/";
        });
    }
};

const loadUser = (currentUser) => {
    userStore.setCurrentUser(
        currentUser.uid,
        currentUser.email,
        currentUser.displayName,
        currentUser.photoURL
    );
};

export const logout = () => {
    return auth
        .signOut()
        .then(() => {
            userStore.resetStore();
            unsubscribeListeners.forEach((unsubscribe) => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
        })
        .catch((err) => {
            console.error(`logout. Error:\n${err}`);
        });
};
