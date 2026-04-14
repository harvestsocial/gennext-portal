import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { TextPlugin } from "gsap/TextPlugin";

// Register plugins (একবার করলেই হবে)
gsap.registerPlugin(
  useGSAP,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  TextPlugin
);

export {
  gsap,
  useGSAP,
  SplitText,
  ScrollTrigger,
  ScrollToPlugin,
  DrawSVGPlugin,
  TextPlugin,
};
