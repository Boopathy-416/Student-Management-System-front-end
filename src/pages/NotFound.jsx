

import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(containerRef.current, { opacity: 0 })
      .from(headingRef.current, { y: -50, opacity: 0 }, "-=0.6")
      .from(textRef.current, { y: 30, opacity: 0 }, "-=0.5")
      .from(buttonRef.current, { scale: 0.8, opacity: 0 }, "-=0.4");
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage:
          "url('https://studio.uxpincdn.com/studio/wp-content/uploads/2023/03/404-page-best-practice.png.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1
          ref={headingRef}
          className="text-6xl md:text-8xl font-extrabold tracking-wide mb-4"
        >
          404
        </h1>
        <p
          ref={textRef}
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-lg mx-auto"
        >
          Oops! The page you’re looking for doesn’t exist. Maybe you mistyped the
          URL or the page has been moved.
        </p>
        <Link
          ref={buttonRef}
          to="/"
          className="px-6 py-3 rounded-xl border-black border-2 bg-black/40 tracking-tighter hover:tracking-widest  transition-8s hover:boder-blue-600 text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
           Back to Home
        </Link>
      </div>
    </div>
  );
}
