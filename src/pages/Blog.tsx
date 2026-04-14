import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import RecentNewsItem from "@/components/RecentNews/RecentNewsItem";
import { PrimaryBtn } from "@/components/UI/Button";
import newsData from "../jsonData/blogData.json";

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

const Blog: React.FC = () => {
  const breadcrumbData: BreadcrumbData = {
    title: "Blogs",
    image: "/assets/img/hero/comm-breadcrumb.png",
    links: [{ label: "Home", path: "/" }, { label: "Blogs" }],
  };

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="recent-news__list">
          {(newsData as NewsItem[])?.map((item, idx) => (
            <RecentNewsItem key={idx} {...item} />
          ))}
        </div>
        <div className="tm-height-50 tm-height-lg-30"></div>
        <div className="tm-center">
          <PrimaryBtn btnLink="/blog">View More</PrimaryBtn>
        </div>
        <div className="tm-height-125 tm-height-lg-80"></div>
      </div>
    </>
  );
};

export default Blog;
