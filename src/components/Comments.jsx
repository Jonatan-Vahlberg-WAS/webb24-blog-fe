import { useState } from "react";
import { useComments } from "../contexts/comments";
import { useUser } from "../contexts/user";

const Comments = () => {
  const user = useUser();
  const comments = useComments();

  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    comments.actions.createComment(content, () => {
      setContent("");
    });
  };

  return (
    <div>
      {comments.comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <strong>{comment?.user?.name}:</strong>
            &nbsp;
            {comment.content}
          </p>
          <p>
            <i>
                <small>
                    {new Date(comment.createdAt).toISOString()}
                </small>
            </i>
          </p>
        </div>
      ))}
      {user.userId && (
        <form id="comment-form" onSubmit={onSubmit}>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
          ></textarea>
          <button disabled={!content}>Create comment</button>
        </form>
      )}
      {!user.userId && <div>You are not logged in</div>}
    </div>
  );
};

export default Comments;
