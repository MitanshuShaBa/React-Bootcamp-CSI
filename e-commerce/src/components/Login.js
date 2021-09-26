import { signInWithEmailAndPassword } from "@firebase/auth";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithGoogle } from "./utils";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((_user) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card>
      <CardHeader title="Login" />
      <CardContent>
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
            justifyContent: "space-evenly",
            marginTop: "2vh",
          }}
        >
          <Button onClick={loginWithEmail}>Login</Button>
          <Button onClick={() => signInWithGoogle(history)}>
            Login with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
