import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
export default function AllPages(props) {
  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [scale, setScale] = useState(1);
  const { pdf } = props;
  const ref = useRef();
  const [transformValue, settransformValue] = useState({});
  const onUpdate = ({ x, y, scale }) => {
    const newValue = make3dTransformValue({ x, y, scale });
    console.log({ newValue, x, y, scale });
    settransformValue(newValue);
    setScale(scale);
    //ref.current.scrollTop = 10;
  };
  return (
    <div className="target">
      <QuickPinchZoom
        onUpdate={onUpdate}
        enabled={true}
        minZoom={0.1}
        tapZoomFactor={0}
        containerProps={{
          style: {
            touchAction: "auto"
          }
        }}
      >
        <div
          style={{
            transform: transformValue,
            height: "400px",
            overflow: "scroll"
          }}
          ref={ref}
        >
          <Document
            file={pdf}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </QuickPinchZoom>
    </div>
  );
}
