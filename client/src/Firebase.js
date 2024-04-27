import{initializeApp} from "firebase/app";
import{getStorage} from "firebase/storage";


const firebaseConfig={
    apiKey: "AIzaSyA3-1UaNwodYr0DN9LdF0RDVk5pGn5Z5SM",
  authDomain: "image-9e524.firebaseapp.com",
  projectId: "image-9e524",
  storageBucket: "image-9e524.appspot.com",
  messagingSenderId: "125543528226",
  appId: "1:125543528226:web:09f9caa1810c4d3bb6577b",
  measurementId: "G-Y6571CSFRC"
}


const app=initializeApp(firebaseConfig);
const selectStorage=getStorage(app);


export default selectStorage;