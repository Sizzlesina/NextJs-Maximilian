import { useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import styles from "./Comments.module.css";
import useNotification from "../../hooks/useNotification";

function Comments(props) {
  // Destruct values
  const { eventId } = props;
  const { showNotification } = useNotification();

  // States
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch comments when click on the show comments button
  useEffect(
    function () {
      if (showComments) {
        setIsLoading(true);
        fetch("/api/comments/" + eventId)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((data) => {
              throw new Error(data.message || "Something went wrong!");
            });
          })
          .then((data) => {
            setComments(data.comments);
            setIsLoading(false);
          })
          .catch((err) => {
            showNotification({
              title: "Error!",
              message: err.message,
              status: "error",
            });
          });
      }
    },
    [showComments, eventId, setIsLoading, showNotification]
  );

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: "Sending comment!",
      message: `Your comment is currently being stored into a database`,
      status: "pending",
    });

    // Send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error!",
          message: err.message,
          status: "error",
        });
      });
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList items={comments} />}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
