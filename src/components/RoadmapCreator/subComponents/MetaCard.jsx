import React, { Component } from "react";
import { SketchPicker, ChromePicker } from "react-color";
import * as d3 from "../../../../d3/index.js"
import  "../subComponentStyles/MetaCard.scss";
import { paletteSvg, infoSvg, uploadSvg } from "../resources/SVGExports.js";
import wheel from "../resources/wheel.svg";
import colorPalette from "../resources/color-palette.svg";
import uploadImg from "../resources/upload.svg";

import {
  DragAndDrop,
  handleDrop,
  handleThumbnailInputChange
} from "./ImageUpload.jsx";
export default class MetaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabMode: "info",
      backgroundColor: this.props.initialBackgroundColor,
      font: this.props.initialFont,
      title: this.props.initialTitle,
      category: this.props.initialCategory,
      description: this.props.initialDescription,
      uploadImg: this.props.initialUploadImg,
      fileExtension: this.props.initialFileExtension
    };

    this.fileInputRef = React.createRef();
  }

  onSelectChange = event => {
    if (event.target.id === "font") {
      this.props.setGlobalFont(event.target.value);
      this.setState({ font: event.target.value });
    } else if (event.target.id === "category") {
      this.setState({ category: event.target.value });
    }
  };
  onChange = (color, event) => {
    d3.select("svg").style("background", color.hex);
    this.setState({ backgroundColor: color.hex });
  };

  onChangeComplete = color => {
    this.props.setGlobalBackground(color.hex);
  };

  wheelToggle = event => {
    this.props.hideCard(event.target, "wheel");
  };

  handlePublish = () => {
    this.props.handlePublish(this.state);
  };

  handleSave = () => {
    this.props.handleSave(this.state);
  };

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  /*
  handlePreview = async () => {
    var SVGstring = new XMLSerializer().serializeToString(
      d3.select(".container").node()
    );

    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");
    v.resize(1920, 1080, "xMidYMid meet");
    // Render only first frame, ignoring animations and mouse.
    await v.render();
    var that = this;
    canvas.toBlob(function(blob, callback) {
      var url = URL.createObjectURL(blob);
      that.setState({ defaultPreview: url });
    });

    d3.select("canvas").style("background-color", this.backgroundColor);
  };

  */

  render() {
console.log(this.props.isModeUpdate)
    let metaCardBody;
    switch (this.state.tabMode) {
      case "info":
        metaCardBody = (
          <React.Fragment>
            <div className="metaCardFieldContainer">
              <input
                className="metaCardInput"
                placeholder="Roadmap Title"
                id="title"
                value={this.state.title}
                //onChange={this.handleInputChange}
              />
            </div>
            <div className="metaCardFieldContainer">
              <input
                className="metaCardInput"
                resizable="false"
                placeholder="Roadmap Description"
                id="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div
              className="metaCardFieldContainer"
              style={{ paddingBottom: "2rem" }}
            >
              <div className="metaCardFieldText">Category</div>
              <div className="select">
                <select
                  id="category"
                  value={this.state.category}
                  onChange={this.onSelectChange}
                >
                  <option value="Arts and Humanities">
                    Arts and Humanities
                  </option>
                  <option value="Business">Business</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Health">Health</option>
                  <option value="Math and Logic">Math and Logic</option>
                  <option value="Personal Development">
                    Personal Development
                  </option>
                  <option value="Physical Science and Engineering">
                    Physical Science and Engineering
                  </option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Language Learning">Language Learning</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="roadmapPublishButtonContainer">
              {!this.props.isModeUpdate ? (
                <React.Fragment>
                  <span
                    className={
                      this.props.isPublishing
                        ? "roadmapPublishButton save gray"
                        : "roadmapPublishButton save"
                    }
                    onClick={() => {
                      if (!this.props.isPublishing) this.handleSave();
                    }}
                  >
                    Save
                  </span>

                  <span
                    className={
                      this.props.isPublishing
                        ? "roadmapPublishButton gray"
                        : "roadmapPublishButton"
                    }
                    onClick={() => {
                      if (!this.props.isPublishing) this.handlePublish();
                    }}
                  >
                    Publish
                  </span>
                </React.Fragment>
              ) : (
                <span
                  className={
                    this.props.isPublishing
                      ? "roadmapPublishButton gray"
                      : "roadmapPublishButton"
                  }
                  onClick={() => {
                    if (!this.props.isPublishing) this.handlePublish();
                  }}
                >
                  Update
                </span>
              )}
            </div>
          </React.Fragment>
        );
        break;
      case "art":
        metaCardBody = (
          <React.Fragment>
            <div className="metaCardFieldContainer">
              <div className="metaCardFieldText">Background Color</div>
              <ChromePicker
                onChange={this.onChange}
                onChangeComplete={this.onChangeComplete}
                disableAlpha={true}
                color={this.state.backgroundColor}
              />
            </div>
            <div
              className="metaCardFieldContainer"
              style={{ paddingBottom: "2rem" }}
            >
              <div className="metaCardFieldText">Font</div>
              <div className="select">
                <select
                  id="font"
                  value={this.state.font}
                  onChange={this.onSelectChange}
                >
                  <option value="Segoe UI">Segoe UI</option>
                  <option value="Roboto" style={{ fontFamily: "Roboto" }}>
                    Roboto
                  </option>
                  <option value="Arial" style={{ fontFamily: "Arial" }}>
                    Arial
                  </option>
                  <option value="Georgia" style={{ fontFamily: "Georgia" }}>
                    Georgia
                  </option>
                  <option value="Verdana" style={{ fontFamily: "Verdana" }}>
                    Verdana
                  </option>
                </select>
              </div>
            </div>
          </React.Fragment>
        );
        break;
      case "upload":
        metaCardBody = (
          <React.Fragment>
            <div className="metaCardFieldContainer">
              <div className="metaCardFieldText">Custom Thumbnail</div>
              <DragAndDrop
                handleDrop={file => {
                  handleDrop(file, (dataurl, type) => {
                    this.setState({ uploadImg: dataurl, fileExtension: type });
                  });
                }}
              >
                <img
                  className="metaCardThumbnail"
                  src={this.state.uploadImg}
                  style={{
                    backgroundColor:
                      this.state.uploadImg === uploadImg
                        ? null
                        : this.props.initialBackgroundColor
                  }}
                />
                <input
                  ref={this.fileInputRef}
                  type="file"
                  accept="image/x-png, image/jpeg"
                  hidden
                  onChange={event => {
                    handleThumbnailInputChange(event, (dataurl, type) => {
                      this.setState({
                        uploadImg: dataurl,
                        fileExtension: type
                      });
                    });
                  }}
                />
                <span
                  style={{
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    lineHeight: "1.3rem",
                    fontSize: "15px"
                  }}
                >
                  Drop image here or use the{" "}
                  <a
                    onClick={() => {
                      this.fileInputRef.current.click();
                    }}
                    className="link"
                  >
                    file browser
                  </a>
                </span>
              </DragAndDrop>
            </div>

            <div className="metaCardFieldContainer">
              <div className="metaCardFieldText">Default Thumbnail</div>
              {this.state.uploadImg !== uploadImg ? (
                <p
                  onClick={() => {
                    this.setState({ uploadImg: uploadImg });
                  }}
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    textDecoration: "underline",
                    paddingLeft: ".5rem"
                  }}
                >
                  Use Default Instead
                </p>
              ) : (
                <p>You are using Default</p>
              )}
              <p className="link" onClick={this.handlePreview}>
                Preview Default
              </p>
              <img
                src={this.state.defaultPreview}
                className="metaCardThumbnail preview"
                style={{
                  backgroundColor: d3.select(".container").style("background")
                }}
              />
              <p className="note">
                Note: Due to CORS Policies, logos fetched from websites can't be
                used. If you want the thumbnail to be a snapshot of your
                roadmap, you can take a screenshot and upload it as a custom
                thumbnail
              </p>
            </div>
          </React.Fragment>
        );
        break;
      default:
        metaCardBody = null;
    }

    return (
      <div className="metaCardContainerOuter">
        <div className="metaCardContainer">
          <div className="metaCardTabs">
            <div
              className="metaCardTabContainer"
              onClick={() => {
                this.setState({ tabMode: "info" });
              }}
            >
              {infoSvg(this.state.tabMode === "info")}
            </div>
            <div
              className="metaCardTabContainer"
              onClick={() => {
                this.setState({ tabMode: "art" });
              }}
            >
              {paletteSvg(this.state.tabMode === "art")}
            </div>
            <div
              className="metaCardTabContainer"
              onClick={() => {
                this.setState({ tabMode: "upload" });
              }}
            >
              {uploadSvg(this.state.tabMode === "upload")}
            </div>
          </div>

          <div className="metaCardMetaText">Meta</div>
          <div className="metaCardInfoContainer">{metaCardBody}</div>
        </div>
        <img
          src={wheel}
          className={
            this.props.isCardHidden
              ? "colorCardToggle hidden"
              : "colorCardToggle"
          }
          onClick={this.wheelToggle}
          style={{
            transform: this.props.isCardHidden
              ? "rotate(90deg)"
              : "rotate(0deg)"
          }}
        />
      </div>
    );
  }
}
