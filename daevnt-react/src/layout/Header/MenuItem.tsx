import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavItem {
  title: string;
  path: string;
  submenu?: NavItem[];
}

interface MenuItemProps {
  item: NavItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleSubnav   = () => {
    setShowMenu(prev => !prev);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      toggleSubnav();
    }
  };

  return (
    <li
      className={
        item?.submenu?.length
          ? `menu-item-has-children ${showMenu ? "active" : ""}`
          : ""
      }
    >
      <Link to={item.path} className="tm-text_b_line">
        <span>{item.title}</span>
      </Link>

      {item?.submenu?.length && (
        <>
          <ul aria-expanded={showMenu}>
            {item.submenu.map((submenu, subIndex) => (
              <li key={subIndex}>
                <Link to={submenu.path} className="tm-text_b_line">
                  <span>{submenu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <span
            className={`tm-munu_dropdown_toggle ${showMenu ? "active" : ""}`}
            onClick={toggleSubnav}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label="Toggle submenu"
            aria-expanded={showMenu}
          ></span>
        </>
      )}
    </li>
  );
};

export default MenuItem;
