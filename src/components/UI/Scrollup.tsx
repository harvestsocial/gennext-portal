import React, { useState, useEffect, useCallback, useRef } from "react";

const ScrollUpButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const debouncedHandleScroll = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleScrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    // Clear existing timeout
    if (debouncedHandleScroll.current) {
      clearTimeout(debouncedHandleScroll.current);
    }

    // Debounce the scroll handling
    debouncedHandleScroll.current = setTimeout(() => {
      setIsVisible(window.scrollY >= 350);
    }, 10); // 10ms debounce
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleScrollUp();
      }
    },
    [handleScrollUp]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      handleScrollUp();
    },
    [handleScrollUp]
  );

  useEffect(() => {
    // Use React-style event handling
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // Proper cleanup
      window.removeEventListener("scroll", handleScroll);
      if (debouncedHandleScroll.current) {
        clearTimeout(debouncedHandleScroll.current);
      }
    };
  }, [handleScroll]);

  return (
    <span
      className={`tm-scrollup ${isVisible ? "tm-scrollup-show" : ""}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top"
    >
      <i className="flaticon-arrow-left-1" />
    </span>
  );
};

export default ScrollUpButton;
