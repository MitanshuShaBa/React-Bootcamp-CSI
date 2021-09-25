import { Box } from "@mui/system";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const Content = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Box
        sx={{
          width: {
            xs: 300,
            md: 500,
          },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Box>
    </Switch>
  );
};

export default Content;
