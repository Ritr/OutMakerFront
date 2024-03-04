import React, { useState, useEffect } from "react";

const Description = ({ data }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  
  useEffect(() => {
    const customCss = `
    <style>
      /* Add your custom CSS rules here */
      img {
        max-width: 100%;
        height: auto;
      }
      h2{
        font-size:16px;
      }
      li{
        font-size:16px;
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
    <div>
      {blobUrl && (
        <iframe
          src={blobUrl}
          id="auto-height-iframe"
          frameBorder="0"
          scrolling="no"
          width="100%"
          title="Auto Height Iframe"
        />
      )}
    </div>
  );
};

export default Description;

