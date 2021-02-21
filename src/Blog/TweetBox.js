import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { useStateValue } from "../StateProvider";
import { db } from "../api/firebase";
import firebase from "firebase";

function TweetBox() {

  const [{ user }] = useStateValue();
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    if (tweetMessage.trim() != "") {
      db.collection("posts").add({
        displayName: user.displayName,
        username: user.displayName,
        verified: false,
        text: tweetMessage,
        image: tweetImage,
        avatar: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setTweetMessage("");
      setTweetImage("");
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={user.photoURL} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder={`What have you learned, ${user.displayName.split(" ")[0]}? Any specific investment strategy you want to share with the community?`}
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional image URL for accompanying image or gif"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;