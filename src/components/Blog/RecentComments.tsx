
import React from "react";

interface RecentComment {
  img: string;
  title: string;
}

const recentComments: RecentComment[] = [
  {
    img: "/assets/img/blog/comment-1.png",
    title: "Engaging Your Audience: The Role of AI in Modern Events",
  },
  {
    img: "/assets/img/blog/comment-2.png",
    title: "Engaging Your Audience: The Role of AI in Modern Events",
  },
  {
    img: "/assets/img/blog/comment-3.png",
    title: "Engaging Your Audience: The Role of AI in Modern Events",
  },
  {
    img: "/assets/img/blog/comment-4.png",
    title: "Engaging Your Audience: The Role of AI in Modern Events",
  },
];

const RecentComments: React.FC = () => {
  return (
    <div className="blog-widgets__recent">
      <h6 className="blog-widgets__recent-comments-title">Recent Comments</h6>
      <div className="blog-widgets__recent-blogs">
        {recentComments.map((item, index) => (
          <div key={index} className="blog-widgets__recent-blog">
            <img
              src={item.img}
              className="blog-widgets__recent-blog-img"
              alt="Recent"
            />
            <p className="blog-widgets__recent-blog-title">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentComments;
