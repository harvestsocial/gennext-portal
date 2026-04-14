import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const useScrollRestoration = () => {
  window.history.scrollRestoration = "manual";
  const location = useLocation();
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
}, [location.pathname]);
};

export default useScrollRestoration;
