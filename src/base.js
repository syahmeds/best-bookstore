import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    // apiKey: "AIzaSyC9uBgRf3Y2I2rOfOvghVIcwdou1Dxf90U",
    apiKey: "AIzaSyDepRm-1q-8hWefMNRMQYyITplfk5I473U",
    // authDomain: "catch-of-the-day-313aa.firebaseapp.com",
    authDomain: "bookstore-8a477.firebaseapp.com",
    // databaseURL: "https://catch-of-the-day-313aa-default-rtdb.firebaseio.com"
    databaseURL: "https://bookstore-8a477-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

// This is a named export
export { firebaseApp }

// This is a default export
export default base;