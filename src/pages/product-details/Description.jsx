import React, { useState, useEffect } from "react";

const Description = ({ data }) => {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const customCss = `
    <style>
      /* Add your custom CSS rules here */
      li, p {
        font-family: "ITCAvantGardeStd";
        color: #333333;
        text-align: justify;
        text-justify: inter-word;
        max-width: 700px;
      }
      h2 {
        font-size: 22px;
      }
      li, p {
        font-size: 18px;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    </style>
  `;
    const fullHtml = customCss + data;
    const fetchedBlobData = new Blob([fullHtml], { type: "text/html" });

    const url = URL.createObjectURL(fetchedBlobData);
    setBlobUrl(url);

    // Clean up Blob URL when component unmounts
    return () => URL.revokeObjectURL(url);
  }, [data]);

  useEffect(() => {
    const resizeIframe = () => {
      const iframe = document.getElementById("auto-height-iframe");
      if (iframe) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
      }
    };

    const iframe = document.getElementById("auto-height-iframe");
    if (iframe) {
      iframe.onload = resizeIframe;
    }
  }, [blobUrl]);


  return (
    <div dangerouslySetInnerHTML={{ __html: data }}>
    </div>
  );
};

export default Description;





Description.jsx