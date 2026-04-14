import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import RecentNewsItem from "@/components/RecentNews/RecentNewsItem";
import newsData from "../jsonData/blogData.json";
import { PrimaryBtn } from "@/components/UI/Button";
import Sidebar from "@components/Blog/Sidebar";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

interface NewsItem {
  id: number;
  imgSrc: string;
  alt: string;
  category: string;
  date: string;
  title: string;
}

const BlogStandard: React.FC = () => {
  const breadcrumbData: BreadcrumbData = {
    title: "Blog Standard",
    image: "/assets/img/hero/comm-breadcrumb.png",
    links: [{ label: "Home", path: "/" }, { label: "Blog Standard" }],
  };

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div
          className="row justify-content-between flex-column-reverse flex-lg-row"
          id="containerAround"
        >
          <div className="col-lg-8">
            <div id="scrollGaleria">
              <div className="recent-news recent-news-style2">
                <div className="recent-news__list">
                  {(newsData as NewsItem[])?.slice(0, 4).map((item) => (
                    <RecentNewsItem key={item.id} {...item} />
                  ))}
                </div>
                <div className="tm-height-50 tm-height-lg-30"></div>
                <div className="tm-center">
                  <PrimaryBtn btnLink="/blog-standard">View More</PrimaryBtn>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="tm-height-125 tm-height-lg-80"></div>
    </>
  );
};

export default BlogStandard;
