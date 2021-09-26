import { setDoc, doc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (history) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      getDoc(doc(db, "users", user.uid)).then((docSnap) => {
        if (!docSnap.exists()) {
          console.log("new user", user.email);
          setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          }).catch((err) => console.log(err));
        }
      });

      history.push("/");
    })
    .catch((err) => console.log(err));
};

export const getRandomIntBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
