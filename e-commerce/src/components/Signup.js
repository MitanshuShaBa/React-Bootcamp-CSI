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
import { getRandomIntBetween, signInWithGoogle } from "./utils";

const Signup = () => {
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerWithEmail = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((result) => {
        const user = result.user;
        const { name, email } = state;
        setDoc(doc(db, "users", user.uid), {
          name,
          email,
          avatar: `https://randomuser.me/api/portraits/lego/${getRandomIntBetween(
            0,
            8
          )}.jpg`,
        })
          .then(() => {
            history.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <Card>
      <CardHeader title="Sign Up" />
      <CardContent>
        <TextField
          name="name"
          placeholder="Name"
          variant="standard"
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          variant="standard"
          onChange={handleChange}
          style={{ width: "100%", marginTop: "2vh" }}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          variant="standard"
          onChange={handleChange}
          style={{ width: "100%", marginTop: "2vh" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "2vh",
          }}
        >
          <Button onClick={registerWithEmail}>Register</Button>
          <Button onClick={() => signInWithGoogle(history)}>
            Register with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signup;
