import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// React Router swaps pages without a full reload, so the browser keeps the previous scroll
// position. Reset it on every link navigation (header, footer, buttons). Back/forward (POP)
// is left alone so the browser can return visitors to where they were.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;

    // Links to a section (e.g. /page#section) scroll to that section instead.
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // "instant" overrides the site-wide `scroll-behavior: smooth`, so the new page
    // opens at the top instead of visibly scrolling up.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
