# GSAP Usage Guide - Daevnt Template

## ⚠️ IMPORTANT: How to Use GSAP in This Project

### ✅ CORRECT Way (Always use this!)

```typescript
// Import from centralized config
import { gsap, useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, ScrollToPlugin } from "@/lib/gsapConfig";

// Use directly - plugins are already registered!
const MyComponent = () => {
  useGSAP(() => {
    gsap.to(".element", { x: 100 });
    
    gsap.to(".scroll-element", {
      scrollTrigger: {
        trigger: ".scroll-element",
        start: "top center"
      },
      opacity: 1
    });
  });
  
  return <div className="element">Animated</div>;
};
```

### ❌ WRONG Way (Never do this!)

```typescript
// ❌ Don't import directly from gsap packages
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ❌ Don't register plugins in components
gsap.registerPlugin(ScrollTrigger, useGSAP);
```

---

## 📦 Available GSAP Exports from `@/lib/gsapConfig`

```typescript
export {
  gsap,              // Main GSAP object
  useGSAP,          // React hook for GSAP
  SplitText,        // For text animations
  ScrollTrigger,    // For scroll-based animations
  ScrollToPlugin,   // For smooth scrolling
  DrawSVGPlugin,    // For SVG drawing animations
};
```

---

## 🎯 Common Use Cases

### 1. Basic Animation
```typescript
import { gsap, useGSAP } from "@/lib/gsapConfig";

const Component = () => {
  const ref = useRef(null);
  
  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      duration: 1
    });
  }, { scope: ref });
  
  return <div ref={ref}>Content</div>;
};
```

### 2. Scroll-Based Animation
```typescript
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsapConfig";

const Component = () => {
  const ref = useRef(null);
  
  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });
  }, { scope: ref });
  
  return <div ref={ref}>Scroll Content</div>;
};
```

### 3. Text Animation with SplitText
```typescript
import { gsap, SplitText } from "@/lib/gsapConfig";

const animateText = (element: HTMLElement) => {
  const split = new SplitText(element, { type: "chars" });
  
  gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.8
  });
};
```

### 4. SVG Drawing Animation
```typescript
import { gsap, useGSAP, DrawSVGPlugin } from "@/lib/gsapConfig";

const Component = () => {
  const pathRef = useRef(null);
  
  useGSAP(() => {
    gsap.set(pathRef.current, { drawSVG: "0%" });
    
    gsap.to(pathRef.current, {
      drawSVG: "100%",
      duration: 2,
      ease: "power2.inOut"
    });
  }, { scope: pathRef });
  
  return (
    <svg>
      <path ref={pathRef} d="..." />
    </svg>
  );
};
```

### 5. Smooth Scroll
```typescript
import { gsap, ScrollToPlugin } from "@/lib/gsapConfig";

const scrollToTop = () => {
  gsap.to(window, {
    scrollTo: { y: 0 },
    duration: 1,
    ease: "power2.inOut"
  });
};
```

---

## 🔍 Why This Pattern?

### Benefits:
✅ **No Duplicate Registrations** - Plugins registered only once  
✅ **Performance** - Faster initial load  
✅ **Maintainability** - One place to update GSAP config  
✅ **Consistency** - All components use same GSAP instance  
✅ **TypeScript** - Better type inference and safety  

### Problems with Old Pattern:
❌ Multiple plugin registrations slow down app  
❌ Potential version conflicts  
❌ Harder to maintain and debug  
❌ More bundle size  

---

## 📝 Checklist for New Components

When adding GSAP to a new component:

- [ ] Import from `@/lib/gsapConfig`
- [ ] Do NOT import directly from `gsap` or `gsap/*`
- [ ] Do NOT call `gsap.registerPlugin()` in component
- [ ] Use `useGSAP` hook for React components
- [ ] Clean up animations in `useGSAP` return function if needed
- [ ] Test animation performance

---

## 🚨 Common Mistakes to Avoid

### Mistake 1: Double Import
```typescript
// ❌ Wrong
import gsap from "gsap";
import { gsap as gsapConfig } from "@/lib/gsapConfig";
```

```typescript
// ✅ Correct
import { gsap } from "@/lib/gsapConfig";
```

### Mistake 2: Registering Plugins Again
```typescript
// ❌ Wrong
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
gsap.registerPlugin(ScrollTrigger); // Already registered!
```

```typescript
// ✅ Correct
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
// Just use it - already registered!
gsap.to(...);
```

### Mistake 3: Mixing Import Sources
```typescript
// ❌ Wrong
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Different source!
```

```typescript
// ✅ Correct
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
```

---

## 🛠️ If You Need to Add a New GSAP Plugin

1. Install the plugin if not already installed
2. Open `src/lib/gsapConfig.ts`
3. Import the plugin
4. Register it with `gsap.registerPlugin()`
5. Export it from the file
6. Use it in your components via `@/lib/gsapConfig`

Example:
```typescript
// In src/lib/gsapConfig.ts
import { CustomPlugin } from "gsap/CustomPlugin";

gsap.registerPlugin(
  // ... existing plugins
  CustomPlugin  // Add new plugin
);

export {
  // ... existing exports
  CustomPlugin  // Export new plugin
};
```

---

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [useGSAP Hook](https://gsap.com/resources/react/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/)
- [SplitText](https://greensock.com/docs/v3/Plugins/SplitText)

---

**Remember:** Always import from `@/lib/gsapConfig` - it's the single source of truth for all GSAP functionality!
