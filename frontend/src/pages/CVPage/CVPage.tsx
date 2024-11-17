import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfFile from "../../assets/cv.pdf";
import "./CVPage.css";

const CvPage = () => {
  const [scale, setScale] = useState(1.3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newScale = width < 768 ? 0.6 : 1.3;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="cv-page">
      <h2>CV</h2>
      <div className="pdf-viewer-container">
        <Worker workerUrl="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile} defaultScale={scale} />
        </Worker>
      </div>
    </div>
  );
};

export default CvPage;
