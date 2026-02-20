import React from "react";
import RecentBlogItem from "./RecentBlogItem";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  source: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Beyond the Stage: How Conferences Inspire Innovation & Collaboration",
    image: "/assets/img/blog/similar-blog-1.png",
    source: "EventTrends",
    date: "12 Feb 2025",
  },
  {
    id: 2,
    title: "The Power of Generation Next Sessions: Boosting Brand Awareness",
    image: "/assets/img/blog/similar-blog-2.png",
    source: "EventTrends",
    date: "03 Feb 2025",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Engaging & Immersive Event Experiences",
    image: "/assets/img/blog/similar-blog-3.png",
    source: "TechSummit",
    date: "03 Feb 2025",
  },
];

const RecentBlog: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80" />
      <section className="recent-Blog">
        <div className="container">
          <div className="common-section-heading">
            <div className="common-section-heading__wapper">
              <div className="common-section-heading__right">
                <div className="common-section-heading__content">
                  <h2 className="common-section-heading__title--small">
                    Recent Blog
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <AnimateOnScroll
            animationType="fade-up"
            className="recent-Blog_items"
          >
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {blogPosts.map((post) => (
                <RecentBlogItem key={post.id} {...post} />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};

export default RecentBlog;
