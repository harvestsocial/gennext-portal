import React from "react";

interface Author {
  name: string;
  description: string;
  avatar: string;
}

const author: Author = {
  name: "Johnathan Swift",
  description: "I'm are many variations of passages",
  avatar: "/assets/img/blog/blog-avatar.png",
};

const AuthorWidget: React.FC = () => {
  return (
    <div className="blog-widgets__author">
      <img src={author.avatar} alt="Author" className="blog-widgets__avatar" />
      <div className="blog-widgets__avatar-content">
        <h6 className="blog-widgets__avatar-title">{author.name}</h6>
        <p className="blog-widgets__avatar-desp">{author.description}</p>
      </div>
    </div>
  );
};

export default AuthorWidget;
