import {
  AppBar,
  Badge,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState } from "react";
import { useStateValue } from "../StateProvider";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [{ user, cart }, dispatch] = useStateValue();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { listIcon: <HomeIcon />, listText: "Home", to: "/", display: true },
    {
      listIcon: <AccountCircleIcon />,
      listText: "Account",
      to: "/account",
      display: user,
    },
    {
      listIcon: <CreateIcon />,
      listText: "Register",
      to: "/signup",
      display: !user,
    },
    {
      listIcon: <VpnKeyIcon />,
      listText: "Log In",
      to: "/login",
      display: !user,
    },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          style={{ marginRight: 2 }}
          onClick={() => {
            history.push("/");
          }}
        >
          <Logo style={{ width: 50 }} />
        </IconButton>
        <Typography style={{ flexGrow: 1 }} variant="h5">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            style={{ textDecoration: "none", color: "white" }}
          >
            CSI E-Commerce
          </Link>
        </Typography>
        <IconButton
          onClick={() => {
            window.scrollTo(0, 0);
            history.push("/cart");
          }}
        >
          <Badge badgeContent={cart ? Object.keys(cart).length : 0}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <div style={{ width: 250 }}>
            {menuItems.map(
              (listItem, key) =>
                listItem.display && (
                  <ListItem
                    button
                    key={key}
                    onClick={() => {
                      setOpen(false);
                      history.push(listItem.to);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                    <ListItemText>
                      <b>{listItem.listText}</b>
                    </ListItemText>
                  </ListItem>
                )
            )}
            {user && (
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  signOut(auth);
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  <b>Log out</b>
                </ListItemText>
              </ListItem>
            )}
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
