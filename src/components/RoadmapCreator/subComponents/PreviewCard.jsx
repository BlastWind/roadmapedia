import  "../subComponentStyles/PreviewCard.css";
import React from "react";
const PreviewCard = props => {
  const { node } = props;
  return (
    <div className="previewCardContainer">
      <div className="cardGradient"></div>
      <div className="imgContainer">
        <img src={node.picture ? node.picture : null} className="cardImg" />
      </div>
      <br />
      <div className="container">
        <span className="title">{node.title ? node.title : "No Title"}</span>
        <br />
        <span className="description">
          {node.info ? node.info : "No Description"}
        </span>
        <br />
        <span
          className="description url"
          onClick={() => {
            if (node.url) {
              if (node.url.includes("https://www.")) {
                window.open(node.url, "_blank");
              } else if (node.url.includes("www.")) {
                window.open("https://" + node.url, "_blank");
              } else window.open("https://www." + node.url, "_blank");
            }
          }}
        >
          <i className="fas fa-globe"></i>{" "}
          {node.url ? " Open In New Tab" : "No URL"}
        </span>
      </div>
    </div>
  );
};

export default PreviewCard;
