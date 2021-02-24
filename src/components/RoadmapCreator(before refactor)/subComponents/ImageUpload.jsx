import React, { Component } from "react";

export class DragAndDrop extends Component {
  dropRef = React.createRef();
  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  state = {
    dragging: false
  };
  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };
  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };
  handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ drag: false });
    if (event.dataTransfer.files && event.dataTransfer.files.length === 1) {
      this.props.handleDrop(event.dataTransfer.files[0]);
      //event.dataTransfer.clearData();
      this.dragCounter = 0;
      this.setState({ dragging: false });
    }
  };
  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }
  render() {
    return (
      <div
        style={{ display: "inline-block", position: "relative", width: "100%" }}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36
              }}
            >
              <div>Drop it!</div>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

// accept file, return dataURL
export function handleDrop(file, callbackOnImgLoad) {
  if (file.type === "image/jpeg" || file.type === "image/png") {
    var img = new Image();
    img.onload = function() {
      var width = this.width,
        height = this.height;
      console.log({ width }, { height });
      if (this.width / this.height !== 16 / 9) {
        //alert("Your image will be scaled to 16:9");
      }
      var MAX_WIDTH = 640;
      var MAX_HEIGHT = 360;

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }

      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      var dataurl = canvas.toDataURL("image/png");
      callbackOnImgLoad(dataurl, file.name.split(".").pop());
    };

    img.src = URL.createObjectURL(file);
  } else {
    alert("only jpg and png accepted!");
  }
}

export function handleThumbnailInputChange(event, callbackOnImgLoad) {
  event.preventDefault();

  if (event.target.files[0]) {
    var name = event.target.files[0].name.split(".").pop();
    var that = this;

    var img = new Image();

    let uh = URL.createObjectURL(event.target.files[0]);

    img.onload = function() {
      var width = this.width,
        height = this.height;
      if (this.width / this.height !== 16 / 9) {
        //alert("Your image will be scaled to 16:9");
      }

      var MAX_WIDTH = 640;
      var MAX_HEIGHT = 360;

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }

      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      var dataurl = canvas.toDataURL("image/png");

      callbackOnImgLoad(dataurl, name);
    };

    img.src = uh;
  }
}
