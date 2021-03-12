import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
} from "react";
import * as d3 from "d3";
import { nodes as nodesData, links as linksData } from "./data.js";
import "./main.scss";

const initialNodes = nodesData;
const initialLinks = linksData;
export const ViewContext = React.createContext();

const Toolbar = ({ setMode, mode }) => {
  /*
    const viewDataContext = useContext(ViewDataContext);
    const { nodes, links, nodesDispatch, linksDispatch } = viewDataContext;
  */

  const modes = ["select", "addCircleNode", "addTextNode", "addLink"];
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

const updateView = (
  viewContainer,
  { nodes, links },
  { selectedElement, setSelectedElement }
) => {
  const textContainerEleName = "textNodeContainer";
  const circleContainerEleName = "circleNodeContainer";
  const textInputEleName = "editableText";
  const circleStrokeWidth = 3;
  const radius = 30;
  const circleNodesEnterData = [];
  const textNodesEnterData = [];
  var isNodeDragged = false;
  var mouseDownElement = null;

  const nodesAll = viewContainer
    .selectAll(`.${textContainerEleName},.${circleContainerEleName}`)
    .data(nodes, (d) => d.id);

  const nodesEnter = nodesAll.enter();
  const nodesExit = nodesAll.exit();

  nodesExit.each(function (d) {
    if (d.type === "circle") {
      var circleContainer = d3.select(this);
      circleContainer
        .select("circle")
        .transition()
        .duration(300)
        .attr("r", 0)
        .on("end", function () {
          circleContainer.remove();
        });
    }
  });

  nodesEnter.each((d, i, list) => {
    // append containers with "enter" suffix
    // in order to group select and use enter exit workflow later
    if (d.type === "circle") {
      viewContainer
        .append("svg")
        .attr("class", circleContainerEleName + "-enter");
      circleNodesEnterData.push(d);
    } else if (d.type === "text") {
      viewContainer
        .append("div")
        .attr("class", textContainerEleName + "-enter");
      textNodesEnterData.push(d);
    }
  });

  var circleNodesEnter = d3
    .selectAll(`.${circleContainerEleName}-enter`)
    .data(circleNodesEnterData);
  var textNodesEnter = d3
    .selectAll(`.${textContainerEleName}-enter`)
    .data(textNodesEnterData);

  circleNodesEnter
    .style("position", "absolute")
    .attr("width", 2 * (radius + circleStrokeWidth))
    .attr("height", 2 * (radius + circleStrokeWidth))
    .style("transform", function (d) {
      return `translate(${
        d.x - (radius + circleStrokeWidth)
      }px, ${d.y - (radius + circleStrokeWidth)}px)`;
    })
    .append("circle")

    .attr("cx", radius + circleStrokeWidth)
    .attr("cy", radius + circleStrokeWidth)
    .style("fill", "#FFFFFF")
    .style("stroke", "#000000")
    .style("stroke-width", `${circleStrokeWidth}px`)
    .transition()
    .duration(300)
    .attr("r", radius);

  const textNodesEnterContainer = textNodesEnter;

  textNodesEnterContainer
    .append("div")
    .attr("contenteditable", true)
    .attr("class", textInputEleName)
    .style("min-width", "10px")
    .style("min-height", "18px") // verbose because height = 0 if not contenteditable
    .text((d) => d.text)
    .on("paste", (e, el) => {
      // WARNING: execCommand is deprecated
      d3.event.preventDefault();
      var textToInsert = d3.event.clipboardData.getData("text/plain");
      if (textToInsert.length > 1000) {
        // ERROR MESSAGE
        console.log("too long!");
        return;
      }
      if (document.queryCommandSupported("insertText")) {
        document.execCommand("insertText", false, textToInsert);
      } else {
        document.execCommand("paste", false, textToInsert);
      }
    });

  textNodesEnterContainer
    .style("position", "absolute")
    .style("transform", (d) => `translate(${d.x}px, ${d.y}px)`)
    .style("border", "1px solid black")
    .style("background", "#FFFFFF")
    .style("padding-left", "0px")
    .style("padding-top", "0px")
    .style("padding-right", "0px")
    .style("padding-bottom", "0px")
    .style("border-radius", "7px")
    .call(attachTextDrag())
    .transition()
    .duration(300)
    .style("padding-left", "10px")
    .style("padding-top", "10px")
    .style("padding-right", "10px")
    .style("padding-bottom", "10px");

  // nodes are no longer in data, enter, exit chain
  // rename in order for next update selection to bypass
  d3.selectAll(`.${circleContainerEleName}-enter`).attr(
    "class",
    circleContainerEleName
  );
  d3.selectAll(`.${textContainerEleName}-enter`).attr(
    "class",
    textContainerEleName
  );

  // call events again so that circle events get access to new data from updateView()
  d3.selectAll(`.${circleContainerEleName}`).call(attachCircleEvents());
  d3.selectAll(`.${textContainerEleName}`).call(attachTextDrag());

  function attachCircleEvents() {
    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    function dragstarted(d) {
      mouseDownElement = d;
      d3.select(this).raise();
    }

    function dragged(d) {
      isNodeDragged = true;
      d3.select(this).style(
        "transform",
        `translate(${(d.x = d3.event.x) - (radius + circleStrokeWidth)}px, ${
          (d.y = d3.event.y) - (radius + circleStrokeWidth)
        }px)`
      );
    }

    function dragended(d) {
      var dragEndedDOMEle = this;
      if (!isNodeDragged) {
        click(d, dragEndedDOMEle); //click doesn't trigger as usual with drag listeners, so manually implement
      }
      isNodeDragged = false;
    }

    function click(d, dragEndedDOMEle) {
      d3.selectAll(
        `.${circleContainerEleName},.${textContainerEleName}`
      ).classed("selected", false);

      mouseDownElement = null;
      if (selectedElement !== d) {
        d3.select(dragEndedDOMEle).classed("selected", true);
        setSelectedElement(d);
      } else {
        setSelectedElement(null);
      }
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
      d.x = d3.event.x;
      d.y = d3.event.y;
      d3.select(this).style(
        "transform",
        `translate(${d3.event.x}px, ${d3.event.y}px)`
      );
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }
  }
};

const RoadmapCreatorView = () => {
  var isNodeDragged = false;
  const [mouseDownElement, setMouseDownElement] = useState(null);
  const [mouseUpElement, setMouseUpElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [links, setLinks] = useState(initialLinks);
  const [mode, setMode] = useState("select");
  const [isCursorInView, setIsCursorInView] = useState(false);

  const viewContainer = useRef(null);
  const addNodeCircleElement = useRef(null);
  const addNodeTextElement = useRef(null);
  const addNodeOverlay = useRef(null);
  const width = 2048;
  const height = 1024;

  const dispatchNodeOperation = (operation) => {
    const { operationName, nodeData, linkData } = operation;
    console.log({ operationName, nodeData });
    switch (operationName) {
      case "addCircleNode":
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
      .style("background", "#ffcc3b26");

    /*
      .on("click", () => {
        /*
        dispatchNodeOperation({
          operationName: "addCircleNode",
          nodeData: {
            x: 100 + 200 * Math.random(),
            y: 100 + 200 * Math.random(),
            type: "circle",
          },
          
        });
        
      });
      */
  }, []);

  useEffect(() => {
    console.log("mode updated to " + mode);
    if (mode === "addTextNode") {
      d3.selectAll(".textNodeContainer>.editableText")
        .attr("contenteditable", false)
        .style("user-select", "none");
    } else if (mode === "select") {
      d3.selectAll(".textNodeContainer>.editableText")
        .attr("contenteditable", true)
        .style("user-select", "auto");
    }
  }, [mode]);

  useEffect(() => {
    updateView(
      d3.select(viewContainer.current),
      { nodes, links },
      { selectedElement, setSelectedElement }
    );
  }, [nodes, links]);

  const handleMouseMove = (event) => {
    if (addNodeCircleElement.current) {
      const ToolbarHeight = 38;
      //TODO: if body has margin, might need to adjust this more
      addNodeCircleElement.current.style.transform = `translate(${
        event.clientX - 33
      }px, ${event.clientY - 33 - ToolbarHeight}px)`;
    } else if (addNodeTextElement.current) {
      const ToolbarHeight = 38;
      const {
        width: textNodeWidth,
        height: textNodeHeight,
      } = addNodeTextElement.current.getBoundingClientRect();
      //TODO: if body has margin, might need to adjust this more
      addNodeTextElement.current.style.transform = `translate(${
        event.clientX - textNodeWidth / 2
      }px, ${event.clientY - ToolbarHeight - textNodeHeight / 2}px)`;
    }
  };

  const handleMouseClick = (event) => {
    if (
      (mode === "addCircleNode" || mode === "addTextNode") &&
      isCursorInView
    ) {
      let target = event.target;
      while (target !== addNodeOverlay.current) {
        target = target.parentNode;
      }
      const { left, top } = target.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;

      setNodes([
        ...nodes,
        {
          type: mode === "addCircleNode" ? "circle" : "text",
          x: mode === "addCircleNode" ? x : x - 16,
          y: mode === "addCircleNode" ? y : y - 20,
          id: nodes.length,
        },
      ]);
    }
  };

  const handleMouseLeave = (event) => {
    setIsCursorInView(false);
  };

  const handleMouseEnter = () => {
    setIsCursorInView(true);
  };

  const onKeyDown = (event) => {
    // TODO: If typing in contenteditable: exit
    switch (event.keyCode) {
      case 46:
        // TODO: Incomplete for links
        console.log({ selectedElement });
        if (selectedElement) {
          const deleteId = selectedElement.id;
          var newNodes = nodes.filter((n) => n.id !== deleteId);
          setNodes(newNodes);
        }

        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Toolbar setMode={(mode) => setMode(mode)} mode={mode} />
      <div
        ref={viewContainer}
        style={{ position: "absolute", outline: "none" }}
        tabIndex="-1"
        onKeyDown={onKeyDown}
      ></div>
      {(mode === "addCircleNode" || mode === "addTextNode") && (
        <div
          ref={addNodeOverlay}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onClick={handleMouseClick}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        >
          {mode === "addCircleNode" && (
            <svg
              ref={addNodeCircleElement}
              style={{
                visibility: isCursorInView ? "visible" : "hidden",
                width: "66px",
                height: "66px",
                position: "absolute",
              }}
            >
              <circle
                r={30}
                cx={33}
                cy={33}
                strokeWidth="3px"
                stroke="black"
                strokeDasharray={[20, 7]}
                fill="#D5F3FE"
              />
            </svg>
          )}
          {mode === "addTextNode" && (
            <div
              ref={addNodeTextElement}
              style={{
                visibility: isCursorInView ? "visible" : "hidden",
                position: "absolute",
                padding: " 10px 20px 10px 20px",
                background: "white",
                border: "1px solid black",
                borderRadius: "7px ",
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

const RoadmapCreator = () => {
  return <RoadmapCreatorView />;
};

export default RoadmapCreator;
