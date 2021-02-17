import * as d3 from "d3";
import {
  transformCloseCurrentNode,
  getTranslateString,
  updateBasePeriod,
  translateToDefault,
  translateFromCenterToDefault
} from "./TransitionNodesHelperFunctions.js";

import { onTransitionNodeClick } from "./mouseFunctions.js";

export function closeForm(app) {
  d3.select("#currentInput")
    .style("overflow", "hidden")
    .transition()
    .duration(500)
    .style("width", "0px")
    .style("padding-left", "0px")
    .style("padding-right", "0px")
    .on("end", function() {
      d3.select(this).remove();
      app.isFormShowing = false;
    });
}

export function closeNode(app) {
  if (app.lastClickedNode)
    app.lastClickedNode
      .transition()
      .duration(500)
      .attr("transform", d => transformCloseCurrentNode(d));
}

export function isTransitionCircleShowing(app) {
  return !app.optionG.select("circle").empty();
}

export function stretchOutOptionGroupForm(app) {
  app.optionGroupG
    .transition()
    .duration(600)
    .ease(d3.easeBounce)
    .attr("transform", getTranslateString(100, 0));
  app.optionGroupConnector
    .transition()
    .duration(600)
    .ease(d3.easeBounce)
    .attr("width", 100);
}

export function stretchCloseOptionGroupForm(app, endFunction = null) {
  app.optionGroupG
    .transition()
    .duration(600)
    .attr("transform", getTranslateString(0, 0));
  app.optionGroupConnector
    .transition()
    .duration(600)
    .attr("width", 0)
    .on("end", function() {
      if (endFunction) {
        endFunction(app);
      }
    });
}

export function isOptionGroupFormVisible(app) {
  return app.optionGroup.attr("visibility") === "visible";
}

export function invertOptionGroupVisibility(app) {
  app.optionGroupConnector.attr(
    "visibility",
    isOptionGroupFormVisible(app) ? "hidden" : "visible"
  );

  app.optionGroup
    .attr("visibility", isOptionGroupFormVisible(app) ? "hidden" : "visible")
    .attr("transform", function(d) {
      if (app.selectedNode && app.selectedNode.type === "circle") {
        return getTranslateString(
          app.selectedNode.x + 115,
          app.selectedNode.y - 5
        );
      } else if (app.selectedNode && app.selectedNode.type === "text") {
        return getTranslateString(
          app.selectedNode.x + app.selectedNode.width + 10,
          app.selectedNode.y - 5 + app.selectedNode.height / 2 - 25
        );
      }
    });
}
