import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAPTvU2AtsYcH24CMwK52FCRMdLgndXKwE",
  authDomain: "react-todo-csi.firebaseapp.com",
  projectId: "react-todo-csi",
  storageBucket: "react-todo-csi.appspot.com",
  messagingSenderId: "279904661789",
  appId: "1:279904661789:web:77925dec43758c3c4871f4",
  measurementId: "G-9DDBM2HNTX"
});

const db = getFirestore(firebaseApp);

export { db };
