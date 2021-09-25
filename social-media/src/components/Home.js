import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";
import { Container } from "@mui/material";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const tmpPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setPosts(tmpPosts);
      console.log(posts);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Container
        style={{ marginTop: "4vh", marginBottom: "4vh" }}
        maxWidth="sm"
      >
        {posts.map(({ avatar, username, content_img, caption }) => {
          return <Post {...{ avatar, username, content_img, caption }} />;
        })}
      </Container>
    </div>
  );
};

export default Home;
