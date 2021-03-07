import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
} from "react";
import * as d3 from "d3";
import { nodes as nodesData, links as linksData } from "./data.js";

const initialNodes = nodesData;
const initialLinks = linksData;

export const ViewDataContext = React.createContext();
const NodesReducer = (state, action) => {
  switch (action) {
    case "addNode":
      console.log("node added");
      return state;
    default:
      console.log("default case");
      return state;
  }
};

const LinksReducer = (state, action) => {
  switch (action) {
    case "addLink":
      console.log("link added");
      return state;
    default:
      console.log("default case");
      return state;
  }
};
const RoadmapCreatorView = () => {
  const viewDataContext = useContext(ViewDataContext);
  const { nodes, links, nodesDispatch, linksDispatch } = viewDataContext;
  const viewContainer = useRef(null);
  const width = 2048;
  const height = 1024;
  useEffect(() => {
    d3.select(viewContainer.current)
      .style("width", width / 2 + "px")
      .style("height", height / 2 + "px")
      .style("background", "#ffcc3b26")
      .on("click", () => {
        nodesDispatch("addNode");
      });
  }, []);

  useEffect(() => {
    d3.select(viewContainer.current).call((viewContainer) =>
      updateView(viewContainer, { nodes, links })
    );
    console.log("Nodes updated in creator view");
  }, [nodes, links]);
  return <div ref={viewContainer} />;
};

const updateView = (viewContainer, { nodes, links }) => {
  console.log({ viewContainer });
  console.log({ nodes }, { links });

  /*
    <div class="everything-container">
        <svg><circle/></svg>
        <div contentEditable></div>
        <svg><circle/></svg>
        <div contentEditable></div>
    </div>


  */
  const circleNodesData = nodes.filter((node) => node.type === "circle");
  const textNodesData = nodes.filter((node) => node.type === "text");

  console.log({ circleNodesData });

  const nodesEnter = viewContainer
    .selectAll(".circleNodeContainer,.textNodeContainer")
    .data(nodes)
    .enter();

  const circleNodesEnter = viewContainer
    .selectAll(".circleNodeContainer")
    .data(circleNodesData)
    .enter();
  const textNodesEnter = viewContainer
    .selectAll(".textNodeContainer")
    .data(textNodesData)
    .enter();

  circleNodesEnter
    .append("svg")
    .style("position", "absolute")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("class", "circleNodeContainer")
    .append("circle")
    .attr("r", 30)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);

  textNodesEnter
    .append("div")
    .style("position", "absolute")
    .style("transform", (d) => `translate(${d.x}px, ${d.y}px)`)
    .attr("contenteditable", true)
    .text("akdlfj");
};

const Toolbar = () => {
  const viewDataContext = useContext(ViewDataContext);
  const { nodes, links, nodesDispatch, linksDispatch } = viewDataContext;

  return (
    <div onClick={() => nodesDispatch("addNode")}>add a god damn node</div>
  );
};

const RoadmapCreator = () => {
  const [nodes, nodesDispatch] = useReducer(NodesReducer, initialNodes);
  const [links, linksDispatch] = useReducer(LinksReducer, initialLinks);

  return (
    <ViewDataContext.Provider
      value={{
        nodes: nodes,
        nodesDispatch: nodesDispatch,
        links: links,
        linksDispatch: linksDispatch,
      }}
    >
      <Toolbar />
      <RoadmapCreatorView />
    </ViewDataContext.Provider>
  );
};

export default RoadmapCreator;
