import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import Sidebar from "@components/Blog/Sidebar";
import CommentForm from "@components/Blog/CommentForm";
import CommentBox from "@components/Blog/CommentBox";
import VideoPopup from "@/components/Videos/VideoPopup";
import RecentBlog from "@components/Blog/RecentBlog";

import blogDetailsData from "../jsonData/blogDetailsData.json";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

interface Reply {
  name: string;
  avatar: string;
  timeAgo: string;
  comment: string;
}

interface Comment {
  name: string;
  avatar: string;
  timeAgo: string;
  comment: string;
  replies?: Reply[];
}

interface VideoData {
  thumbnail: string;
  url: string;
}

interface BodySection {
  quote?: string;
  section?: string;
  content?: string;
}

interface BlogData {
  id: number;
  title: string;
  thumbnail: string;
  intro: string;
  body: (string | BodySection)[];
  video?: VideoData;
  conclusion: string;
  comments: Comment[];
}

const breadcrumbData: BreadcrumbData = {
  title: "Blog Details",
  image: "/assets/img/hero/comm-breadcrumb.png",
  links: [{ label: "Home", path: "/" }, { label: "Blog Details" }],
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = (blogDetailsData as BlogData[])?.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <p style={{ padding: "150px", textAlign: "center" }}>
        Blog Details not found!
      </p>
    );
  }

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="row justify-content-between flex-column-reverse flex-lg-row">
          <div className="col-lg-8">
            <div className="blog-details__wapper">
              <h4 className="blog-details__title">{blog.title}</h4>
              <div className="blog-details__thumbnail">
                <img src={`/${blog.thumbnail}`} alt={blog.title} />
              </div>{" "}
              <br />
              <p className="blog-details__desp">{blog.intro}</p>
              {/* Render Body Sections */}
              {blog.body.map((section, index) => {
                if (typeof section === "string") {
                  return (
                    <Fragment key={index}>
                      <br />
                      <p className="blog-details__desp">{section}</p>
                      <br />
                    </Fragment>
                  );
                } else if (section.quote) {
                  return (
                    <div className="blog-details__quote-text" key={index}>
                      <h5 className="quote-text">"{section.quote}"</h5>
                    </div>
                  );
                } else if (section.section && section.content) {
                  return (
                    <Fragment key={index}>
                      <p className="blog-details__desp">
                        <span className="hightlight">{section.section}:</span>{" "}
                        {section.content}
                      </p>{" "}
                      <br />
                    </Fragment>
                  );
                }
                return null;
              })}
              {/* Video Section */}
              {blog?.video && (
                <div className="blog-details__video-section">
                  <VideoPopup
                    thumbnail={blog?.video?.thumbnail}
                    videoUrl={blog?.video?.url}
                    gap="tm-height-0"
                  />{" "}
                </div>
              )}
              {/* Conclusion */}
              <p className="blog-details__desp">
                {" "}
                <br />
                <br />
                <span className="hightlight">Conclusion : </span>
                {blog?.conclusion}
              </p>
              <div className="tm-height-100 tm-height-lg-50"></div>
              {/* Comments Section */}
              <div className="comments-box-content">
                <div className="comments-content">
                  <h5 className="comments-title">Comment</h5>
                  {blog.comments.map((comment, index) => (
                    <div key={index}>
                      <CommentBox {...comment} />
                      {comment.replies?.map((reply, i) => (
                        <div className="comments-reply" key={i}>
                          <CommentBox {...reply} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="tm-height-50 tm-height-lg-30"></div>

                <CommentForm />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
      <RecentBlog />
    </>
  );
};

export default BlogDetails;
