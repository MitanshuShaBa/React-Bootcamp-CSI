import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithGoogle } from "./utils/auth";

const Signup = () => {
  const history = useHistory();
  const [state, setState] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const getRandomIntBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((result) => {
        setDoc(doc(db, "users", result.user.uid), {
          username: state.name,
          avatar: `https://randomuser.me/api/portraits/lego/${getRandomIntBetween(
            0,
            8
          )}.jpg`,
        }).catch((err) => console.log(err));
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card>
      <CardHeader title="Sign up" />
      <CardContent>
        <TextField
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          variant="standard"
          style={{ width: "100%" }}
        />
        <TextField
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          variant="standard"
          style={{ width: "100%", marginTop: "2vh" }}
        />
        <TextField
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          variant="standard"
          style={{ width: "100%", marginTop: "2vh" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2vh",
          }}
        >
          <Button onClick={signUpWithEmail}>Sign Up</Button>
          <Button onClick={() => signInWithGoogle(history)}>
            Sign Up with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signup;
