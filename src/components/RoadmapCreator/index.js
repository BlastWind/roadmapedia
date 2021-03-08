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

const Toolbar = ({ setMode, mode }) => {
  /*
    const viewDataContext = useContext(ViewDataContext);
    const { nodes, links, nodesDispatch, linksDispatch } = viewDataContext;
  */

  const modes = ["addNode", "addLink"];
  //<div onClick={() => nodesDispatch("addNode")}>add a god damn node</div>

  return (
    <>
      <div
        style={{
          display: "flex",
          background: "black",
          color: "white",
          userSelect: "none",
        }}
      >
        {modes.map((eachMode, i) => (
          <div
            key={i}
            onClick={() => {
              setMode(eachMode);
            }}
            style={{
              padding: "10px 20px 10px 20px",
              background: eachMode === mode ? "blue" : "none",
              cursor: "pointer",
            }}
          >
            {eachMode}
          </div>
        ))}
      </div>
    </>
  );
};
const RoadmapCreatorView = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [links, setLinks] = useState(initialLinks);
  const [mode, setMode] = useState();

  const viewContainer = useRef(null);
  const width = 2048;
  const height = 1024;

  const dispatchNodeOperation = (operation) => {
    const { operationName, nodeData, linkData } = operation;
    console.log({ operationName, nodeData });
    switch (operationName) {
      case "addNode":
        setNodes((nodes) => [...nodes, nodeData]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    d3.select(viewContainer.current)
      .style("width", width / 2 + "px")
      .style("height", height / 2 + "px")
      .style("background", "#ffcc3b26")
      .on("click", () => {
        dispatchNodeOperation({
          operationName: "addNode",
          nodeData: {
            x: 100 + 200 * Math.random(),
            y: 100 + 200 * Math.random(),
            type: "circle",
          },
        });
      });
  }, []);

  useEffect(() => {
    console.log("mode updated to " + mode);
  }, [mode]);
  useEffect(() => {
    console.log("nodes updated, new nodes: ", { nodes });
    d3.select(viewContainer.current).call((viewContainer) =>
      updateView(viewContainer, { nodes, links })
    );
  }, [nodes, links]);
  return (
    <>
      <Toolbar setMode={(mode) => setMode(mode)} mode={mode} />
      <div ref={viewContainer} />;
    </>
  );
};

const updateView = (viewContainer, { nodes, links }) => {
  /* structure: 
    <div class="everything-container">
        <svg><circle/></svg>
        <svg><circle/></svg>
        <div contentEditable></div>
        <div contentEditable></div>
    </div>
  */
  const circleNodesData = nodes.filter((node) => node.type === "circle");
  const textNodesData = nodes.filter((node) => node.type === "text");

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

  console.log({ circleNodesEnter });
  console.log({ textNodesEnter });

  circleNodesEnter
    .append("svg")
    .attr("class", "circleNodeContainer")
    .style("position", "absolute")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("circle")
    .attr("r", 30)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);

  textNodesEnter
    .append("div")
    .attr("class", "textNodeContainer")
    .style("position", "absolute")
    .style("transform", (d) => `translate(${d.x}px, ${d.y}px)`)
    .attr("contenteditable", true)
    .text("akdlfj");
};

const RoadmapCreator = () => {
  return <RoadmapCreatorView />;
};

export default RoadmapCreator;
