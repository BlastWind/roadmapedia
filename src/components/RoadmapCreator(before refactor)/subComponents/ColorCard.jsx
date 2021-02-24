import * as d3 from "../../../../d3/index.js"
import React, { Component } from "react";
import  "../subComponentStyles/ColorCard.scss";
import colorPalette from "../resources/color-palette.svg";

export default class ColorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textSize: this.props.textSize,
      backgroundColor: this.props.selectedNode
        ? this.props.selectedNode.backgroundColor
        : null,
      strokeColor: this.props.selectedNode
        ? this.props.selectedNode.strokeColor
        : null,
      textColor: this.props.selectedNode
        ? this.props.selectedNode.textColor
        : null,
      linkColor: this.props.selectedLink
        ? this.props.selectedLink.linkColor
        : null
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      textSize: newProps.textSize
    });

    if (newProps.selectedNode) {
      this.setState({
        backgroundColor: newProps.selectedNode.backgroundColor,
        strokeColor: newProps.selectedNode.strokeColor,
        textColor: newProps.selectedNode.textColor
      });
    } else if (newProps.selectedLink) {
      this.setState({ linkColor: newProps.selectedLink.linkColor });
    }
  }

  textSizeDecrement = () => {
    if (this.state.textSize >= 11) {
      this.props.changeAttribute(
        "Node",
        "textSize",
        Number(this.state.textSize) - 1
      );
    }
  };

  textSizeIncrement = () => {
    if (this.state.textSize <= 29) {
      this.props.changeAttribute(
        "Node",
        "textSize",
        Number(this.state.textSize) + 1
      );
      this.setState({ textSize: Number(this.state.textSize) + 1 });
    }
  };

  onSubmit = e => {
    if (e.target.value <= 30 && e.target.value >= 10) {
      this.setState({ textSize: e.target.value });

      this.props.changeAttribute("Node", "textSize", Number(e.target.value));
    } else {
      this.setState({ textSize: Number(this.props.textSize) });
    }
  };

  changeColor = (type, color) => {
    this.props.changeAttribute("Node", type, color);
  };

  changeLinkColor = color => {
    this.props.changeAttribute("Link", "linkColor", color);
  };

  onChange = e => {
    this.setState({ textSize: e.target.value });
  };

  colorPaletteClick = e => {
    this.props.hideCard(e.target, "palette");
  };

  onColorInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onColorInputSubmit = e => {
    function isHexColor(str) {
      var regexp = /^[0-9a-fA-F]+$/;
      if (regexp.test(str)) {
        return true;
      } else {
        return false;
      }
    }
    let color = e.target.value
      .trim()
      .replace("#", "")
      .toUpperCase();
    if (isHexColor(color)) {
      this.props.changeAttribute(
        e.target.id.includes("link") ? "Link" : "Node",
        e.target.id,
        "#" + color
      );
    } else {
      this.setState({
        [e.target.id]: this.props.selectedNode
          ? this.props.selectedNode[e.target.id]
          : this.props.selectedLink[e.target.id]
      });
      console.log(":(");
    }
  };
  render() {
    //need 15
    // 4 for black to #FFFFFF
    // others for
    var colorArray = [
      "#FF6900",
      "#FCB900",
      "#7BDCB5",
      "#00D084",
      "#8ED1FC",
      "#0693E3",
      "#EB144C",
      "#F78DA7",

      "#FFFFFF",
      "#000000"
    ];
    var selectedNode = this.props.selectedNode;
    var selectedLink = this.props.selectedLink;
    var selectedBackgroundColor,
      selectedStrokeColor,
      selectedTextColor,
      selectedLinkColor;
    const backgroundColorArray = colorArray;
    const strokeColorArray = colorArray;
    if (selectedNode) {
      selectedBackgroundColor = this.state.backgroundColor;
      selectedStrokeColor = this.state.strokeColor;
      selectedTextColor = this.state.textColor;
    }
    if (selectedLink) {
      selectedLinkColor = this.state.linkColor;
    }

    var cardType = null;
    var textContent = null;
    if (selectedNode && selectedNode.type === "text") {
      textContent = (
        <React.Fragment>
          <div>
            <a className="colorCardA">Text Color</a>
          </div>
          <div className="textColorGrid">
            {strokeColorArray.map(eachColor =>
              eachColor === selectedTextColor ? (
                <div
                  className="textColorBlock selected"
                  style={{ backgroundColor: eachColor }}
                ></div>
              ) : (
                  <div
                    className="textColorBlock"
                    style={{ backgroundColor: eachColor }}
                    onClick={() => {
                      this.changeColor("textColor", eachColor);
                    }}
                  ></div>
                )
            )}
          </div>
          <span className="hexText">HEX</span>
          <div className="colorInputContainer">
            <input
              spellCheck="false"
              value={selectedTextColor}
              className="colorInput"
              id="textColor"
              maxLength="7"
              onChange={this.onColorInputChange}
              onBlur={this.onColorInputSubmit}
            />
          </div>
          <div>
            <a className="colorCardA">Text Size</a>
            <div className="textSizeContainer">
              <span
                className="input-number-decrement"
                onClick={this.textSizeDecrement}
              >
                –
              </span>
              <input
                className="input-number"
                type="integer"
                value={this.state.textSize}
                onChange={this.onChange}
                onBlur={this.onSubmit}
                min="0"
                max="30"
                maxLength="2"
              />
              <span
                className="input-number-increment"
                onClick={this.textSizeIncrement}
              >
                +
              </span>
            </div>
          </div>
        </React.Fragment>
      );
    }
    if (this.props.selectedNode) {
      if (selectedNode.type === "text") {
        cardType = "colorCardContainer text";
      } else {
        cardType = "colorCardContainer";
      }
    } else {
      cardType = "colorCardContainer path";
    }
    const nodeCard = (
      <div
        className={cardType}
        style={{
          opacity: this.props.isCardHidden ? 0 : 1
        }}
      >
        <div className="colorCardContainerInner">
          <div>
            <a className="colorCardA">Background Color</a>
          </div>
          <div className="backgroundColorGrid">
            {backgroundColorArray.map(eachColor =>
              eachColor === selectedBackgroundColor ? (
                <div
                  className="backgroundColorBlock selected"
                  style={{
                    backgroundColor: eachColor
                  }}
                ></div>
              ) : (
                  <div
                    className="backgroundColorBlock"
                    style={{ backgroundColor: eachColor }}
                    onClick={() => {
                      this.changeColor("backgroundColor", eachColor);
                    }}
                  ></div>
                )
            )}
          </div>
          <span className="hexText">HEX</span>
          <div className="colorInputContainer">
            <input
              spellCheck="false"
              value={selectedBackgroundColor}
              className="colorInput"
              id="backgroundColor"
              maxLength="7"
              onChange={this.onColorInputChange}
              onBlur={this.onColorInputSubmit}
            />
          </div>

          <div>
            <a className="colorCardA">Stroke Color</a>
          </div>
          <div className="strokeColorGrid">
            {strokeColorArray.map(eachColor =>
              eachColor === selectedStrokeColor ? (
                <div
                  className="strokeColorBlock selected"
                  style={{
                    backgroundColor: eachColor
                  }}
                ></div>
              ) : (
                  <div
                    className="strokeColorBlock"
                    style={{
                      backgroundColor: eachColor,
                      border: eachColor === "#FFFFFF" ? "1px solid grey" : null
                    }}
                    onClick={() => {
                      this.changeColor("strokeColor", eachColor);
                    }}
                  ></div>
                )
            )}
          </div>
          <span className="hexText">HEX</span>
          <div className="colorInputContainer">
            <input
              id="strokeColor"
              spellCheck="false"
              value={selectedStrokeColor}
              className="colorInput"
              maxLength="7"
              onChange={this.onColorInputChange}
              onBlur={this.onColorInputSubmit}
            />
          </div>
          {textContent}
        </div>
      </div>
    );
    const pathCard = (
      <React.Fragment>
        <div
          className="colorCardContainer path"
          style={{
            opacity: this.props.isCardHidden ? 0 : 1
          }}
        >
          <div className="colorCardContainerInner">
            <div>
              <a className="colorCardA">Path Color</a>
            </div>
            <div className="backgroundColorGrid">
              {backgroundColorArray.map(eachColor =>
                eachColor === selectedLinkColor ? (
                  <div
                    className="backgroundColorBlock selected"
                    style={{ backgroundColor: eachColor }}
                  ></div>
                ) : (
                    <div
                      className="backgroundColorBlock"
                      style={{
                        backgroundColor: eachColor,
                        border: eachColor === "#FFFFFF" ? "1px solid grey" : null
                      }}
                      onClick={() => {
                        this.changeLinkColor(eachColor);
                      }}
                    ></div>
                  )
              )}
            </div>
            <span className="hexText">HEX</span>
            <div className="colorInputContainer">
              <input
                spellCheck="false"
                value={selectedLinkColor}
                className="colorInput"
                id="linkColor"
                maxLength="7"
                onChange={this.onColorInputChange}
                onBlur={this.onColorInputSubmit}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {this.props.selectedNode ? nodeCard : pathCard}
        <img
          className={
            this.props.isCardHidden
              ? "colorCardToggle hidden"
              : "colorCardToggle"
          }
          src={colorPalette}
          onClick={this.colorPaletteClick}
          style={{
            transform: this.props.isCardHidden
              ? "rotate(90deg)"
              : "rotate(0deg)"
          }}
        />
      </React.Fragment>
    );
  }
}
