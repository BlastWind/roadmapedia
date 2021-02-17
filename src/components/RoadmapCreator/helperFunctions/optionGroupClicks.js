import * as d3 from "../../../../d3/index.js"
import alphabetT from "../resources/t-alphabet.svg";
import alphabetTPurple from "../resources/t-alphabet-purple.svg";
import purpleLink from "../resources/purpleLink.svg";
import { getTranslateString } from "./TransitionNodesHelperFunctions.js";
import link from "../resources/link.svg";

export function setOptionGroupTextMouseEvents(app, optionGroupT) {
  optionGroupT
    .on("mouseover", function() {
      d3.select(this).attr("xlink:href", alphabetTPurple);
    })
    .on("mouseout", function() {
      d3.select(this).attr("xlink:href", alphabetT);
    })
    .on("click", function(d) {
      app.optionGroup
        .transition()
        .duration(300)
        .attr("opacity", 0);
      if (app.inConnectMode) {
        console.log("in connect mode!");
        app.optionGroup.attr("opacity", 0);
        app.optionGroupConnector.attr("width", 0);
        app.optionGroupG.attr("transform", getTranslateString(0, 0));
        const node = {
          type: "text",
          id: app.nodes.length,
          width: 150,
          height: 60,
          text: [""],
          x: app.selectedNode.x + app.selectedNode.width + 100,
          y: app.selectedNode.y,
          backgroundColor: "#FFFFFF",
          strokeColor: "#000000",
          groupID: null,
          textSize: 15,
          textColor: "#000000"
        };
        app.point = null;
        app.nodes.push(node);

        app.restart();
        const source = app.selectedNode;
        const target = node;
        var link = {
          source: source,
          target: target,
          linkDistance:
            node.x - app.selectedNode.x > 250
              ? node.x - app.selectedNode.x
              : 250,
          index: app.links.length
        };
        app.links.push(link);

        var command = {
          action: { type: "addNodeLink", node: node, links: [link] },
          inverse: { type: "delNodeLink", node: node, links: [link] }
        };

        app.storeToHistory(command);

        //not triggering doubleclicking prohibits force from calculating x & y properly?
        var toDispatch = d3.selectAll("rect.node").filter(function(d, i, list) {
          return i === list.length - 1;
        });
        toDispatch.dispatch("click");
        toDispatch.dispatch("dblclick");

        app.restart();
        // update stroke after restart because
        // update stroke will be selecting new elems
      } else {
        const node = {
          type: "text",
          id: app.nodes.length,
          width: 150,
          height: 60,
          text: [""],
          x: app.point[0],
          y: app.point[1],
          backgroundColor: "#FFFFFF",
          strokeColor: "#000000",
          groupID: null,
          textSize: 15,
          textColor: "#000000"
        };
        app.point = null;
        app.nodes.push(node);
        var command = {
          action: { type: "addNode", node: node },
          inverse: { type: "delNode", node: node }
        };
        app.storeToHistory(command);

        app.restart();
        var toDispatch = d3.selectAll("rect.node").filter(function(d, i, list) {
          return i === list.length - 1;
        });
        toDispatch.dispatch("click");
        toDispatch.dispatch("dblclick");

        app.restart();
      }
    });
}

export function setOptionGroupLinkMouseEvents(app, optionGroupLink) {
  optionGroupLink
    .on("mouseover", function() {
      d3.select(this).attr("xlink:href", purpleLink);
    })
    .on("mouseout", function() {
      d3.select(this).attr("xlink:href", link);
    })
    .on("click", function(d) {
      app.optionGroup
        .transition()
        .duration(300)
        .attr("opacity", 0);

      if (app.inConnectMode) {
        console.log("in connect mode!");
        app.optionGroup.attr("opacity", 0);
        app.optionGroupConnector.attr("width", 0);
        app.optionGroupG.attr("transform", getTranslateString(0, 0));
        const node = {
          type: "circle",
          id: app.nodes.length,
          width: 150,
          height: 40,
          text: [""],
          x: app.selectedNode.x + app.selectedNode.width + 100,
          y: app.selectedNode.y,
          storedInfo: {
            url: "",
            info: "",
            picture: "",
            title: ""
          },
          backgroundColor: "#FFFFFF",
          strokeColor: "#000000",
          groupID: null
        };
        app.point = null;
        app.nodes.push(node);
        app.restart();
        const source = app.selectedNode;
        const target = node;

        var link = {
          source: source,
          target: target,
          linkDistance:
            node.x - app.selectedNode.x > 250
              ? node.x - app.selectedNode.x
              : 250,
          index: app.links.length
        };
        app.links.push(link);

        var command = {
          action: { type: "addNodeLink", node: node, links: [link] },
          inverse: { type: "delNodeLink", node: node, links: [link] }
        };

        app.storeToHistory(command);
        //not triggering doubleclicking prohibits force from calculating x & y properly?
        var toDispatch = d3
          .selectAll(".circleGroup")
          .filter(function(d, i, list) {
            return i === list.length - 1;
          });

        app.selectedNode = app.nodes[app.nodes.length - 1];
        app.restart();
        app.forceUpdate();
        toDispatch.dispatch("click");
      } else {
        const node = {
          type: "circle",
          id: app.nodes.length,
          width: 150,
          height: 40,
          text: [""],
          x: app.point[0],
          y: app.point[1],
          storedInfo: {
            url: "",
            info: "",
            picture: "",
            title: ""
          },
          backgroundColor: "#FFFFFF",
          strokeColor: "#000000",
          groupID: null
        };
        app.point = null;
        app.nodes.push(node);

        var command = {
          action: { type: "addNode", node: node },
          inverse: { type: "delNode", node: node }
        };

        app.storeToHistory(command);

        app.mousedownNode = app.nodes[app.nodes.length - 1];
        app.restart();
        var toDispatch = d3
          .selectAll(".circleGroup")
          .filter(function(d, i, list) {
            return i === list.length - 1;
          });

        toDispatch.dispatch("click");
      }
    });
}
