import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getDoc, setDoc, doc } from "@firebase/firestore";
import { auth, db } from "../../firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (history) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const docRef = doc(db, "users", user.uid);

      getDoc(docRef)
        .then((docSnap) => {
          if (!docSnap.exists()) {
            setDoc(docRef, {
              username: user.displayName,
              avatar: user.photoURL,
            }).catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));

      history.push("/");
    })
    .catch((err) => console.log(err));
};
