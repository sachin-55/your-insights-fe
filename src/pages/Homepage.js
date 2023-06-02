import React from "react";
import Titlebar from "../components/titlebar";
import Button from "../components/button";
import PostScroll from "../components/scroll";
import CreatePost from "../components/createPost";
import {useLocation} from 'react-router-dom';

const Homepage = () => {
  const [newPost, setNewPost] = React.useState(false);
  const location = useLocation();



  return (
    <>
      {newPost === true ? (
        <CreatePost closePost={() => setNewPost(false)} type='create'/>
      ) : null}
      {/* <Button
        sx={{
          backgroundColor: "secondary",
          width: "100%",
          cursor: "pointer",
          transition: "0.75s",
          "&:hover": {
            backgroundColor: "accent",
            color: "rgba(200,50,100,0.9)"
          },
          borderRadius: 0,
          outline: "none"
        }}
        onClick={() => setNewPost(true)}
      >
        Create New Post
      </Button> */}
      <PostScroll setNewPost={setNewPost}/>
    
    </>
  );
};

export default Homepage;
