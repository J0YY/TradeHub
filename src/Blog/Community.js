import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Community.css";
import { db } from "../api/firebase";
import FlipMove from "react-flip-move";
import firebase from "firebase";
import Nav from "../Header/nav";
import Login from "../Auth/Login";
import { useStateValue } from "../StateProvider";

function Community() {
  const [posts, setPosts] = useState([]);
  const [{ user }] = useStateValue();


  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);



  return (
    <div className="community">
      <Nav />
      {!user ? (
        <Login />
      ) : (
          <>
            <TweetBox />

            <FlipMove>
              {posts.map((post) => (
                <Post
                  key={post.text}
                  displayName={post.displayName}
                  username={post.username}
                  verified={post.verified}
                  text={post.text}
                  avatar={post.avatar}
                  image={post.image}
                  timestamp={new Date(post.timestamp?.toDate()).toUTCString()}
                />
              ))}
            </FlipMove>
          </>
        )}
    </div>
  );
}

export default Community;