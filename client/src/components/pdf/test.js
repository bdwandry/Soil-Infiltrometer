import React, { useEffect, useRef } from "react";

import PDFViewer from "pdf-viewer-reactjs";

const ExamplePDFViewer = () => {
  const ref = useRef();
  /*useEffect(() => {
    if (ref.current)
      console.log(
        ref.current.addEventListener("a", () => {
          console.log("asd");
        })
      );
  }, [ref]);*/
  return (
    <PDFViewer
      ref={ref}
      document={{
        url: "https://arxiv.org/pdf/quant-ph/0410100.pdf"
      }}
    />
  );
};

export default ExamplePDFViewer;
