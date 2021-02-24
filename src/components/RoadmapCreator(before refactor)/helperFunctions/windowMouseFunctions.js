import * as d3 from "../../../../d3/index.js"
import { getTranslateString } from "./TransitionNodesHelperFunctions.js";
import {
  isOptionGroupFormVisible,
  stretchCloseOptionGroupForm,
  invertOptionGroupVisibility,
  stretchOutOptionGroupForm
} from "./transitionFormFunctions.js";

export function windowClick(DOMEle, app) {
  console.log({d3}, d3.event)

  //WHY IS CLICK() TRIGGERING FOR ONLY FOR CIRCULAR NODES, DEBUG?
  var mousedownNode = app.mousedownNode,
    selectedNode = app.selectedNode;

  app.forceUpdate();

  if (app.inConnectMode) {
    app.optionGroup
      .transition()
      .duration(300)
      .attr("opacity", 0)
      .on("end", function() {
        app.optionGroup.attr("visibility", "hidden");
        app.optionGroupConnector.attr("visibility", "hidden");
        app.optionGroupG.attr("transform", getTranslateString(0, 0));
        app.optionGroupConnector.attr("width", 0);
      });
  } else {
    if (app.optionGroup)
      app.optionGroup
        .transition()
        .duration(300)
        .attr("opacity", 0)
        .on("end", function() {
          app.optionGroup.attr("visibility", "hidden");
          app.optionGroupConnector.attr("visibility", "hidden");
        });
  }

  app.inConnectMode = false;

  //    optionGroupConnector.attr("visibility", "hidden");
  //triggers if there is no mouse down node
  if (d3.event.ctrlKey && !app.mousedownNode) {
    if (app.state.preview) {
      //setMessage("Can't Edit during Preview Mode", 2000);
      return;
    }
    //TODO: run a function app updates circles & rectangles to their appropriate colors

    var point = d3.mouse(DOMEle);
    var transform = d3.zoomTransform(app.container.node());
    app.point = transform.invert(point);
    app.optionGroupConnector.attr("visibility", "hidden");
    app.optionGroup
      .attr("transform", `translate(${app.point[0]}, ${app.point[1]})`)
      .transition()
      .duration(300)
      .attr("opacity", 1)
      .on("start", function() {
        app.optionGroup.attr("visibility", "visible");
      });
  }

  app.mousedownNode = null;
}

export function windowMouseDown() {}

export function windowMouseMove(DOMEle, app) {
  app.mouseupNode = null;
  if (!app.mousedownNode) return;
  if (app.state.preview) {
    //setMessage("Can't edit during Preview Mode", 2000);
    return;
  }

  // update drag line
  if (d3.event.ctrlKey) {
    app.dragLine
      .classed("hidden", false)
      .style("marker-end", "url(#end-arrow)");

    var transform = d3.zoomTransform(app.container.node());
    var xy1 = transform.invert(d3.mouse(app.svg.node()));
    app.dragLine.attr(
      "d",
      `M${app.mousedownNode.x + app.mousedownNode.width / 2},${app.mousedownNode
        .y +
        app.mousedownNode.height / 2}L${xy1[0]},${xy1[1]}`
    );
  }
}

export function windowMouseUp(DOMEle, app) {
  // hide drag line
  if (app.mousedownNode)
    app.dragLine.classed("hidden", true).style("marker-end", "");
  if (app.mousedownNode && app.mouseupNode) {
    if (app.mousedownNode.type === "text" || app.mouseupNode.type === "text") {
      // use to need windowclick, now no need for some reason
    }
  }
}

export function keydown(app) {
  if (d3.event.ctrlKey && !app.isTyping) {
    if (
      (d3.event.keyCode === 17 && d3.event.shiftKey) ||
      d3.event.keyCode === 89
    ) {
      if (app.state.preview) {
        app.setMessage("Can't edit during Preview Mode", 2000);
        return;
      }

      app.redo();
    } else if (d3.event.keyCode === 90) {
      if (app.state.preview) {
        app.setMessage("Can't edit during Preview Mode", 2000);
        return;
      }
      app.undo();
    }
  }

  if (!app.selectedNode && !app.selectedLink) return;

  switch (d3.event.keyCode) {
    case 9: //tab
      break;

    case 46: // delete
      if (app.state.preview) {
        app.setMessage("Can't edit during Preview Mode", 2000);
        return;
      }
      if (app.isFormShowing) {
        app.setMessage("Please submit form first", 2000);
        return;
      }

      if (app.selectedNode && !app.isTyping) {
        if (app.selectedNode && app.selectedNode.type === "circle") {
          app.lastClickedCircle = null;
          app.optionG
            .selectAll("circle.permanent")
            .transition()
            .duration(500)
            .delay(app.isFormShowing ? 500 : 0)
            .attr("r", 0);
          app.optionG
            .selectAll("image.permanent")
            .transition()
            .duration(500)
            .delay(app.isFormShowing ? 500 : 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", 0)
            .attr("y", 0);
        }

        var node = app.selectedNode;
        var links = splicelinksForNode(app, app.selectedNode);
        app.nodes = app.nodes.filter(n => n.id !== app.selectedNode.id);

        var command = {
          action: { type: "delNodeLink", node: node, links: links },
          inverse: { type: "addNodeLink", node: node, links: links }
        };

        app.selectedNode = null;
      app.forceUpdate()

        app.storeToHistory(command);
        app.restart();
      } else if (app.selectedLink) {
        app.links.splice(app.links.indexOf(app.selectedLink), 1);
        var command = {
          action: { type: "delLink", link: app.selectedLink },
          inverse: {
            type: "addLink",
            link: app.selectedLink
          }
        };

        app.storeToHistory(command);
        app.selectedLink = null;


        app.restart();

        app.forceUpdate();
      }

      break;
  }
}

export function keyup(app) {
  switch (d3.event.keyCode) {
    case 9: //tab
      //toggleFocus();
      break;
    case 192: // ` ~ key
      if (app.selectedNode && !app.isTyping) {
        if (app.state.preview) {
          app.setMessage("Can't edit during Preview Mode", 2000);
          return;
        }

        app.inConnectMode = true;

        if (isOptionGroupFormVisible(app)) {
          stretchCloseOptionGroupForm(app, invertOptionGroupVisibility);
        } else {
          // not visible
          app.optionGroupConnector.attr("visibility", "visible");
          app.optionGroupConnector.attr("opacity", 1);
          app.optionGroup.attr("opacity", 1);
          app.optionGroup.attr("visibility", "visible");
          stretchOutOptionGroupForm(app);
        }

        // now, move each element by 150 to the right, do this
      }
  }
}

export function keypress(app) {}

export function resize(app) {
  app.svg.style("width", window.innerWidth).style("height", window.innerHeight);
}

export function splicelinksForNode(app, node) {
  const toSplice = app.links.filter(
    l => l.source === node || l.target === node
  );
  for (const l of toSplice) {
    app.links.splice(app.links.indexOf(l), 1);
  }

  return toSplice;
}
