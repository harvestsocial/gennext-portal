
import React from "react";

const SearchBox: React.FC = () => {
  return (
    <div className="sidebar-search">
      <input type="text" className="search-input" placeholder="Search." />
      <button className="search-btn" type="submit">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M15.682 14.318L12.025 10.662C12.722 9.719 13.111 8.563 13.111 7.333C13.111 3.868 10.244 1 6.778 1C3.312 1 0.444 3.868 0.444 7.333C0.444 10.798 3.312 13.666 6.778 13.666C8.008 13.666 9.163 13.277 10.106 12.579L13.762 16.236C13.975 16.448 14.311 16.448 14.524 16.236L15.681 15.08C15.894 14.868 15.894 14.533 15.682 14.318ZM6.778 11.889C4.347 11.889 2.222 9.763 2.222 7.333C2.222 4.902 4.347 2.777 6.778 2.777C9.208 2.777 11.333 4.902 11.333 7.333C11.333 9.763 9.208 11.889 6.778 11.889Z"
            fill="#333"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
