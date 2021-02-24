import React, { Component } from "react";
import  "../subComponentStyles/Manual.css";
class Manual extends Component {
  //warning: modal doesn't display on windows iphone
  render() {
    return (
      <div className="ModalContainer">
        <div className="ModalBlock">
          <button className="ManualButton">ctrl</button> +
          <button className="ManualButton">click</button> to add new node
        </div>
        <div className="ModalBlock">
          <button className="ManualButton">ctrl</button> +
          <button className="ManualButton">drag</button> to links nodes
        </div>
        <div className="ModalBlock">
          <button className="ManualButton">select</button> +
          <button className="ManualButton">delete</button> to delete node
        </div>
        <div className="ModalBlock">
          <button className="ManualButton">ctrl</button> +
          <button className="ManualButton">z</button>
          <button className="ManualButton">y</button> for undo/redo
        </div>
      </div>
    );
  }
}

export default Manual;
