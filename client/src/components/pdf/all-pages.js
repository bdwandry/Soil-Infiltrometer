import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

const useGesture = createUseGesture([pinchAction]);
export default function AllPages(props) {
  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);
  const [numPages, setNumPages] = useState(null);
  const ref = useRef();
  const [scaleV, setScaleV] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0
  }));
  useGesture(
    {
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }
        console.log({ origin, first, ox, oy, s, a, scaleV });
        setScaleV(s);
        const x = memo[0] - ms * memo[2];
        const y = memo[1] - ms * memo[3];
        api.start({ scale: s * 1.2, a });
        console.log("scrolled", ref.current.offsetTop);
        ref.current.scrollTop = 10;
        return memo;
      }
    },
    {
      target: ref,
      pinch: {
        scaleBounds: { min: 0.1, max: 5 },
        rubberband: true,
        preventScroll: true
      }
    }
  );
  const { pdf } = props;
  console.log(style);
  return (
    <animated.div style={style} ref={ref}>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </animated.div>
  );
}
