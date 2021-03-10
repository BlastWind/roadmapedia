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

  const modes = ["select", "addNode", "addLink"];
  //<div onClick={() => nodesDispatch("addNode")}>add a god damn node</div>

  return (
    <>
      <div
        style={{
          display: "flex",
          background: "black",
          color: "white",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
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
  const [mode, setMode] = useState("select");
  const [hasAddNodeBeenInView, setHasAddNodeBeenInView] = useState(false);

  const viewContainer = useRef(null);
  const circleNodesContainer = useRef(null);
  const textNodesContainer = useRef(null);
  const addNodeOverlayContainer = useRef(null);
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
        /*
        dispatchNodeOperation({
          operationName: "addNode",
          nodeData: {
            x: 100 + 200 * Math.random(),
            y: 100 + 200 * Math.random(),
            type: "circle",
          },
          
        });
        */
      });
  }, []);

  useEffect(() => {
    console.log("mode updated to " + mode);
    setHasAddNodeBeenInView(false);
  }, [mode]);
  useEffect(() => {
    d3.select(viewContainer.current).call((viewContainer) => {
      updateView(viewContainer, {
        nodes,
        links,
      });
    });
  }, [nodes, links]);

  const handleMouseMove = (event) => {
    if (!addNodeOverlayContainer.current) {
      return;
    }
    setHasAddNodeBeenInView(true);
    addNodeOverlayContainer.current.style.transform = `translate(${
      event.clientX - 33
    }px, ${event.clientY - 33 - 38}px)`;
  };

  const handleMouseClick = (event) => {
    console.log("mouse clicked");
    let target = event.target;
    while (target !== viewContainer.current) {
      target = target.parentNode;
    }
    const { left, top } = target.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    console.log("append cirlce at...", x, y);
    setNodes([...nodes, { type: "circle", x: x, y: y, id: nodes.length }]);
  };

  return (
    <div>
      <Toolbar setMode={(mode) => setMode(mode)} mode={mode} />
      <div
        ref={viewContainer}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
      >
        {mode === "addNode" && (
          <svg
            ref={addNodeOverlayContainer}
            style={{
              visibility: hasAddNodeBeenInView ? "visible" : "hidden",
              strokeWidth: "3px",
              stroke: "black",
              strokeDasharray: [20, 7],
              width: "66px",
              height: "66px",
            }}
          >
            <circle r={30} cx={33} cy={33} fill="#D5F3FE" />
          </svg>
        )}
      </div>
    </div>
  );
};

const updateView = (viewContainer, { nodes, links }) => {
  const textNodesData = nodes.filter((node) => node.type === "text");
  const textElementName = "textNodeContainer";
  const circleElementName = "circleNodeContainer";

  const nodesEnter = viewContainer
    .selectAll(`.${circleElementName},.${textElementName}`)
    .data(nodes, (d) => d.id)
    .enter();

  const circleStrokeWidth = 3;
  const radius = 30;
  const circleNodesEnterData = [];
  const textNodesEnterData = [];
  nodesEnter.each((d, i, list) => {
    if (d.type === "circle") {
      const circleNodeContainer = viewContainer
        .append("svg")
        .attr("class", circleElementName + "-enter");
      circleNodesEnterData.push(d);
    } else if (d.type === "text") {
      viewContainer.append("div").attr("class", textElementName + "-enter");
      textNodesEnterData.push(d);
    }
  });

  var circleNodesEnter = d3
    .selectAll(`.${circleElementName}-enter`)
    .data(circleNodesEnterData);
  var textNodesEnter = d3
    .selectAll(`.${textElementName}-enter`)
    .data(textNodesData);

  circleNodesEnter
    .style("position", "absolute")
    .attr("width", 2 * (radius + circleStrokeWidth))
    .attr("height", 2 * (radius + circleStrokeWidth))
    .style("transform", (d) => `translate(${d.x}px, ${d.y}px)`)
    .call(attachCircleDrag())
    .append("circle")
    .attr("r", radius)
    .attr("cx", radius + circleStrokeWidth)
    .attr("cy", radius + circleStrokeWidth)
    .style("fill", "#FFFFFF")
    .style("stroke", "#000000")
    .style("stroke-width", `${circleStrokeWidth}px`);

  textNodesEnter
    .data(textNodesData)
    .style("padding", "10px 20px 10px 20px")
    .style("position", "absolute")
    .style("transform", (d) => `translate(${d.x}px, ${d.y}px)`)
    .style("border", "1px solid black")
    .style("background", "#FFFFFF")
    .style("border-radius", "7px")
    .call(attachTextDrag())
    .append("div")
    .attr("contenteditable", true)
    .text("akdlfj");

  d3.selectAll(`.${circleElementName}-enter`).attr("class", circleElementName);
  d3.selectAll(`.${textElementName}-enter`).attr("class", textElementName);

  function attachCircleDrag() {
    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    function dragstarted(d) {
      //circleNodesContainer.raise();
      d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
      d3.select(this).style(
        "transform",
        `translate(${(d.x = d3.event.x)}px, ${(d.y = d3.event.y)}px)`
      );
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
      //circleNodesContainer.lower();
    }
  }

  function attachTextDrag() {
    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
      .filter(() => {
        if (d3.event.target.className === "textNodeContainer") {
          return true;
        }
      });

    function dragstarted(d, e, i) {
      d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
      d3.select(this).style(
        "transform",
        `translate(${(d.x = d3.event.x)}px, ${(d.y = d3.event.y)}px)`
      );
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }
  }
};

const RoadmapCreator = () => {
  return <RoadmapCreatorView />;
};

export default RoadmapCreator;
