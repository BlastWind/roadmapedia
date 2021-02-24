import React, { Component } from "react";
const Conditional = props => {
  return (
    <div style={{ visibility: props.isConditionMet ? "visible" : "hidden" }}>
      {props.children}
    </div>
  );
};

export default Conditional;
