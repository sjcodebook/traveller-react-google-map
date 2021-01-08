// import firebase from "firebase";

import Config from "../config";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
// import 'firebase/messaging';
// import 'firebase/functions';

const config = Config.FirebaseConfig;

const fire = firebase.initializeApp(config);

const firestore = fire.firestore();
const auth = fire.auth();
// const database = fire.database();
// const storage = fire.storage();
// firestore.settings({ timestampsInSnapshots: true });

export { firebase, firestore, auth };
export default fire;

// Exmaple usage: import fire, {firebase, firestore} from '../scripts/fire';
