
import React from "react";
import SearchBox from "./SearchBox";
import AuthorWidget from "./AuthorWidget";
import CategoryList from "./CategoryList";
import RecentComments from "./RecentComments";
import PopularTags from "./PopularTags";

const Sidebar: React.FC = () => {
  return (
    <div id="infoProduto">
      <div className="blog-widgets">
        <SearchBox />
        <AuthorWidget />
        <CategoryList />
        <RecentComments />
        <PopularTags />
      </div>
    </div>
  );
};

export default Sidebar;
