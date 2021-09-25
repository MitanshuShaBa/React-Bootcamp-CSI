import { addDoc, collection, doc, getDoc } from "@firebase/firestore";
import { ref, uploadBytes } from "@firebase/storage";
import { signOut } from "@firebase/auth";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  TextField,
  Toolbar,
} from "@mui/material";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db, storage } from "../firebase";

const Header = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const history = useHistory();
  const inputRef = useRef(null);

  const createPost = () => {
    setOpen(true);
  };

  const uploadFile = (e) => {
    const image = e.target.files[0];
    uploadBytes(
      ref(storage, `${Date.now()}.${image?.type?.split("/")[1]}`),
      image
    )
      .then((snapshot) => {
        console.log(snapshot.ref.fullPath);
        getDoc(doc(db, "users", user.uid)).then((doc_) => {
          const { username, avatar } = doc_.data();
          addDoc(collection(db, "posts"), {
            caption,
            content_img: snapshot.ref.fullPath,
            username,
            avatar,
          });
          setOpen(false);
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <AppBar position="sticky" style={{ background: "whitesmoke" }}>
      <Toolbar>
        <IconButton
          onClick={() => {
            history.push("/");
          }}
        >
          <img src="/csi-logo.png" alt="" width="50px" height="50px" />
        </IconButton>
        <div style={{ marginLeft: "auto" }}>
          {user && (
            <>
              <Button onClick={createPost}>Add Post</Button>
              <Button onClick={() => signOut(auth)}>Logout</Button>
            </>
          )}

          {!user && (
            <>
              <Button
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Signup
              </Button>
            </>
          )}
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Card>
            <CardContent>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/jpeg,image/png"
                ref={inputRef}
                onChange={uploadFile}
              />
              <TextField
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                variant="standard"
                style={{ width: "100%" }}
              />
              <Button
                onClick={() => {
                  inputRef.current.click();
                }}
              >
                Upload
              </Button>
            </CardContent>
          </Card>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
