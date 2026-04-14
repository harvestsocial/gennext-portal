
import React, { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";

const useStickyHeader = (headerRef: React.RefObject<HTMLElement>) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollTop = useRef(0);
  const debouncedHandleScroll = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const handleScroll = () => {
      const headerHeight = (headerRef.current?.offsetHeight || 0) + 30;
      const windowTop = window.scrollY || document.documentElement.scrollTop;

      setIsSticky(windowTop >= headerHeight);
      setIsHeaderVisible(windowTop < lastScrollTop.current);

      lastScrollTop.current = windowTop;
    };

    // Create debounced function with proper cleanup
    debouncedHandleScroll.current = debounce(handleScroll, 50, {
      leading: false,
      trailing: true,
    });

    // Use React-style event handling
    const scrollHandler = debouncedHandleScroll.current;
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      // Proper cleanup
      if (debouncedHandleScroll.current) {
        debouncedHandleScroll.current.cancel();
        window.removeEventListener("scroll", debouncedHandleScroll.current);
      }
    };
  }, [headerRef]);

  return { isSticky, isHeaderVisible };
};

export default useStickyHeader;