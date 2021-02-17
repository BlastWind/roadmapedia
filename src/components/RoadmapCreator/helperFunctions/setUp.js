import { select, selection } from 'd3-selection';
import "d3-selection-multi"

import { nodeMouseDown, circleNodeClick } from "./mouseFunctions.js";
import {
  windowClick,
  windowMouseDown,
  windowMouseMove,
  windowMouseUp
} from "./windowMouseFunctions.js";
export function getInitialSVG() {
  return select(".GraphEditorContainer")
    .append("svg")
    .attr("class", "container")
    .style("width", window.innerWidth + "px")
    .attr("height", window.innerHeight + "px");
}

export function setSVGDefs(svg) {
  svg
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "end-arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 6)
    .attr("markerWidth", 3)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#000");
  svg
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "start-arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 4)
    .attr("markerWidth", 3)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M10,-5L0,0L10,5")
    .attr("fill", "#000");
}

export function setSVGEvents(svg, mainRef) {
  svg
    .on("mousedown", function() {
      windowMouseDown(this, mainRef);
    })
    .on("mousemove", function() {
      windowMouseMove(this, mainRef);
    })
    .on("mouseup", function() {
      windowMouseUp(this, mainRef);
    })
    .on("click", function() {
      windowClick(this, mainRef);
    })
    .on("drop", function() {

    });
}

export function setDefsGradient(defs) {
  var gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", "red")
    .attr("stop-opacity", 1);

  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "100%")
    .attr("stop-color", "blue");
}

export function getInitialDrag(mainRef) {
  return d3
    .drag()
    .on("start", d => {
      if (!d3.event.active) mainRef.force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      mainRef.isDragging = true;
    })
    .on("drag", d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    })
    .on("end", d => {
      if (!d3.event.active) mainRef.force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      mainRef.isDragging = false;
      mainRef.mousedownNode = null;
      mainRef.mousedownLink = null;
    });
}

export function getInitialForce(mainRef) {
  console.log(mainRef.links, "mainRef links");
  return d3
    .forceSimulation(mainRef.nodes)
    .velocityDecay(0.5)
    .force(
      "link",
      d3
        .forceLink(mainRef.links)
        .id(d => d.id)
        .distance(function(d) {
          return d.linkDistance;
        })
    )
    .force("charge", d3.forceManyBody().strength(-30))
    .on("tick", () => {
      mainRef.tick();
    });
}
