import { getDownloadURL, ref } from "@firebase/storage";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { storage } from "../firebase";

const Post = ({ avatar, username, caption, content_img }) => {
  const [uRL, setURL] = useState("");

  useEffect(() => {
    getDownloadURL(ref(storage, content_img))
      .then((url) => setURL(url))
      .catch((err) => console.log(err));
  }, [content_img]);
  return (
    <Card style={{ marginTop: "2vh" }}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={
          <Typography style={{ fontWeight: "600" }} variant="subtitle1">
            {username}
          </Typography>
        }
      ></CardHeader>
      <CardMedia
        style={{
          height: 0,
          paddingTop: "56.25%", // 16:9
        }}
        image={uRL}
      />
      <CardContent>
        {caption}
        {/* <Comment username={username} comment={caption} />
          {comments.length > 0 && <hr />} */}
        {/* general comments */}
        {/* {comments.map(({ username, comment }, key) => (
            <Comment key={key} username={username} comment={comment} />
          ))} */}
      </CardContent>
      {/* <PostComment postID={postID} user={user} /> */}
    </Card>
  );
};

export default Post;
