import React from "react";

interface CommentBoxProps {
  name: string;
  avatar: string;
  timeAgo: string;
  comment: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ name, avatar, timeAgo, comment }) => (
  <div className="comments-info">
    <div className="person-info">
      <img className="comment-person-img" src={`/${avatar}`} alt={name} />
      <div className="person-info-content">
        <h6 className="person-name">{name}</h6>
        <p className="person-title">{timeAgo}</p>
      </div>
    </div>
    <p className="person-desp">{comment}</p>
    <button className="comment-reply-btn">Reply</button>
  </div>
);

export default CommentBox;
