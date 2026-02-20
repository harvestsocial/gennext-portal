import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useScrollRestoration from "../hooks/useScrollRestoration";
import ScrollUpButton from "@/components/UI/Scrollup";
import TextScrollSlider from "@/components/TextScrollSlider/TextScrollSlider";

const Main: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultHeaderStyle = "default";
  const headerStyle = queryParams.get("h") || defaultHeaderStyle;


  useScrollRestoration();


  return (
    <div>
      <Header style={headerStyle} />
      <Outlet />
      {location.pathname === "/register" ? <TextScrollSlider /> : null}
      <Footer />
      <ScrollUpButton />
    </div>
  );
};

export default Main;

