import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


  
// const firebaseConfig = {
//   apiKey: "AIzaSyAWi0RUkh2i_RYUXu9vKCCz0x2etF0reyA",
//   authDomain: "fitness-tracker-2b5c7.firebaseapp.com",
//   projectId: "fitness-tracker-2b5c7",
//   storageBucket: "fitness-tracker-2b5c7.appspot.com",
//   messagingSenderId: "411817545639",
//   appId: "1:411817545639:web:6066346846d2d13a4df082",
//   measurementId: "G-60GSKZFQ4T"
// };

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID ,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
  

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
 const db = getFirestore(app);
 export { auth, db };