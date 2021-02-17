import * as d3 from "../../../../d3/index.js"
import {
  getTranslateString,
  decodeTranslateString,
  pureDecodeTranslate,
  makeTransitionNodeData,
  translateBackLastMoved,
  translateFromCenterToDefault,
  translateToDefault,
  transformOpenCurrentNode,
  updateBasePeriod,
  updateLastClicked
} from "./TransitionNodesHelperFunctions.js";
import { closeForm, closeNode } from "./transitionFormFunctions.js";
import { restartOptionG, updateStroke } from "./updateFunctions.js";
import { textArrToHTML } from "./StringHelperFunctions.js";
import loadingGif from "../resources/giphy2.gif";
import { editButton, link, t as alphabetT, photo } from "../resources";

export function nodeMouseDown(d, i, DOMEle, app) {
  if (app.optionGroup)
    app.optionGroup
      .transition()
      .duration(300)
      .attr("opacity", 0)
      .on("end", function() {
        app.optionGroup.attr("visibility", "hidden");
      });
  app.mousedownNode = d;
}

export function nodeMouseUp(d, i, DOMEle, app) {
  if (app.state.preview) {
    //setMessage("Can't edit during Preview Mode", 2000);
    return;
  }
  var mousedownNode = app.mousedownNode,
    selectedNode = app.selectedNode;

  app.forceUpdate();

  if (!app.mousedownNode) return;

  // needed by FF
  app.dragLine.classed("hidden", true).style("marker-end", "");

  app.mouseupNode = d;
  if (app.mouseupNode === app.mousedownNode) {
    app.mousedownNode = null;
    app.selectedNode = null;
    app.forceUpdate();
    return;
  }

  const source = app.mousedownNode;
  const target = app.mouseupNode;
  var link = {
    source: source.id,
    target: target.id,
    linkDistance: 250,
    index: app.links.length
  };
  app.links.push(link);

  var command = {
    action: { type: "addLink", link: link },
    inverse: { type: "delLink", link: link }
  };

  app.storeToHistory(command);

  //app.mousedownNode = null;

  app.restart();
}

export function circleNodeClick(d, iClicked, DOMEle, app) {
  if (app.isTransitioning) {
    return;
  }

  if (app.state.preview) {
    if (app.selectedNode && d.id === app.selectedNode.id) {
      app.selectedLink = null;
      app.selectedNode = null;
      app.restart();
      app.forceUpdate();
    } else {
      app.selectedLink = null;
      app.selectedNode = d;
      app.restart();
      app.forceUpdate();
    }
    return;
  }
  var prevLocation = app.optionG.attr("transform");

  if (isTransitionCircleShowing()) {
    if (app.isFormShowing) saveTransitionNodeData(app, app.lastClickedId);
  }
  app.selectedLink = null;
  app.selectedNode = d;
  app.restart();
  app.selectedLink = null;
  var selectedNode = app.selectedNode;
  app.forceUpdate();

  if (sameCircleClicked() && isTransitionCircleShowing()) {
    if (app.lastClickedNode) {
      if (app.isFormShowing) saveTransitionNodeData(app, app.lastClickedId);
      closeForm(app);
      closeNode(app);
    }
    app.optionG
      .selectAll("g")
      .transition()
      .duration(500)
      .delay(app.isFormShowing ? 500 : 0)
      .attr(
        "transform",
        getTranslateString(
          -(app.selectedNode.x - app.lastClickedCircleD.x),
          -(app.selectedNode.y - app.lastClickedCircleD.y)
        )
      )
      .on("end", function() {
        app.optionG.selectAll("*").remove();
        app.lastClickedCircle = iClicked;
        app.lastClickedCircleD = d;
        app.isFormShowing = false;
        app.selectedNode = null;
        app.forceUpdate();
        app.restart();
      });

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

    return;
  }

  var duration = 500;

  // if not same circle click, but the transition circles were showing: hide old and show new
  if (isTransitionCircleShowing()) {
    app.transitionGDataset[2].href = photo;
    app.transitionGDataset[1].href = editButton;
    app.transitionGDataset[3].href = alphabetT;

    app.transitionGDataset[1].isLoading = false;
    app.transitionGDataset[2].isLoading = false;
    app.transitionGDataset[3].isLoading = false;

    if (app.lastClickedNode && app.isFormShowing) {
      app.optionG.select("foreignObject").attr("transform", function() {
        var decoded = decodeTranslateString(
          prevLocation,
          getTranslateString(0, 0),
          app.selectedNode
        );
        return getTranslateString(decoded.x, decoded.y);
      });
      d3.select("#currentInput")
        .transition()
        .duration(duration)
        .style("width", "0px")
        .style("padding-left", "0px")
        .style("padding-right", "0px")
        .on("end", function() {
          app.optionG.select("foreignObject").remove();
          app.optionG
            .select("foreignObject")
            .attr("transform", getTranslateString(0, 0));
          app.isFormShowing = false;
        });

      var prevTransitionCircles = app.optionG.selectAll("g");
      prevTransitionCircles.each(function() {
        var bruh = decodeTranslateString(
          prevLocation,
          d3.select(this).attr("transform"),
          app.selectedNode
        );

        d3.select(this).attr("transform", getTranslateString(bruh.x, bruh.y));

        app.alreadyDid = true;
      });
      app.lastClickedNode
        .transition()
        .duration(duration)
        .attr("transform", d => {
          var current = app.lastClickedNode.attr("transform");
          var decoded = pureDecodeTranslate(current);
          return getTranslateString(decoded.x - 175, decoded.y);
        })
        .on("end", function() {
          //d3.select(this).attr("transform", getTranslateString(0, 0));
        });
    }

    var prevTransitionCircles = app.optionG.selectAll("g");
    prevTransitionCircles
      .transition()
      .duration(duration)
      .delay(app.isFormShowing ? duration : 0)
      .on("start", function(d2, i) {
        if (!app.alreadyDid) {
          var bruh = decodeTranslateString(
            prevLocation,
            d3.select(this).attr("transform"),
            app.selectedNode
          );

          d3.select(this).attr("transform", getTranslateString(bruh.x, bruh.y));
        }

        if (i === 0) {
          app.isTransitioning = true;

          var fakeNodesData = makeTransitionNodeData(4);
          if (selectedNode.storedInfo.picture !== null) {
            fakeNodesData = makeTransitionNodeData(4);
          }

          var newGs = app.optionG
            .selectAll("g.temp")
            .data(fakeNodesData)
            .enter()
            .append("g")
            .attr("class", "temp");

          // set original transformation so don't start from (0, 0)
          newGs.attr("transform", getTranslateString(0, 0));

          var transitionCircles = newGs
            .append("circle")
            .attr("class", "temp")
            .attr("r", 0)
            .attr("fill", "#FFFFFF");

          var transitionImages = newGs
            .append("svg:image")
            .attr("href", d => d.href)
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "temp");

          // move fake nodes out
          newGs
            .transition()
            .duration(duration)
            .attr("transform", translateFromCenterToDefault());

          newGs
            .selectAll("circle.temp")
            .transition()
            .duration(duration)
            .attr("r", 10)
            .on("start", function() {
              app.isTransitioning = true;
            });

          transitionImages
            .transition()
            .duration(duration)
            .attr("width", 16)
            .attr("height", 16)
            .attr("x", -8)
            .attr("y", -8);
        }
      })
      .on("end", function(d2, i) {
        app.alreadyDid = false;
        if (i == 0) {
          app.lastClickedCircle = iClicked;
          app.lastClickedCircleD = d;
          // after old nodes closed to center and fake nodes came out:
          // 1) remove fake nodes
          // restart accordingly
          app.isTransitioning = false;
          app.optionG.selectAll("g.temp").remove();
          app.shouldTransitionGsAnimate = true;
          app.animationAlreadyCompleted = true;
          app.shouldTransitionGsEnterAnimation = false;

          restartOptionG(app);
          app.shouldTransitionGsEnterAnimation = true;
          app.shouldTransitionGsAnimate = false;
          app.animationAlreadyCompleted = false;
        }
      });

    prevTransitionCircles
      .selectAll("circle.permanent")
      .transition()
      .duration(duration)
      .delay(app.isFormShowing ? duration : 0)
      .attr("r", 0)
      .on("end", function() {
        d3.select(this).attr("r", 10);
      });

    prevTransitionCircles
      .selectAll("image.permanent")
      .transition()
      .duration(duration)
      .delay(app.isFormShowing ? duration : 0)
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0)
      .on("end", function() {
        d3.select(this)
          .attr("width", 16)
          .attr("height", 16)
          .attr("x", -8)
          .attr("y", -8);
      });

    app.isFormShowing = false;
  } else {
    app.shouldTransitionGsAnimate = true;
    app.shouldTransitionGsEnterAnimation = true;

    if (d.storedInfo.picture === null) {
      app.transitionGDataset = makeTransitionNodeData(4);
    } else {
      app.transitionGDataset = makeTransitionNodeData(4);
    }
    app.lastClickedCircle = iClicked;
    app.lastClickedCircleD = d;
    restartOptionG(app);
  }

  function sameCircleClicked() {
    return app.lastClickedCircle === iClicked;
  }

  function isTransitionCircleShowing() {
    return !app.optionG.select("circle").empty();
  }
}

export function onTransitionNodeClick(dClicked, iClicked, list, DOMEle, app) {
  if (app.transitionGDataset[iClicked].isLoading === true) {
    app.setMessage("Please click again after load", 3000);
    return;
  }
  var globalRadius = 35;
  var clickedNode = d3.select(DOMEle);
  var selectedNode = app.selectedNode;
  var base = dClicked.basePeriod;
  app.forceUpdate();

  if (app.isFormShowing === true) {
    saveTransitionNodeData(app, app.lastClickedId, iClicked);
    closeForm(app);

    app.lastClickedNode
      .transition()
      .duration(500)
      .attr("transform", d => getTranslateString(globalRadius, 0))

      .on("end", function(d, i) {
        // if clicked on URL node again when no picture node
        // clicked on URL node with picture node

        if (iClicked === app.lastClickedId) {
          app.transitionGs
            .transition()
            .duration(500)
            .attrTween("transform", translateToDefault())
            .on("end", function(d, i) {
              var periodSpaceBetween = Math.PI / (list.length + 1);
              updateBasePeriod(d, Math.PI / 2 - periodSpaceBetween * (i + 1));
              updateLastClicked(app, iClicked, clickedNode, dClicked);
              app.optionG.select("foreignObject").remove();
            });
          return;

          //  not the same clicked, and,
        } else if (iClicked !== app.lastClickedId) {
          app.isTyping = true;

          app.transitionGs
            .transition()
            .duration(500)
            .attrTween("transform", translateBackLastMoved(base))
            .on("end", function(d, i) {
              updateBasePeriod(d, d.basePeriod - base);
              if (i === iClicked) {
                openForm(d, iClicked);
              }
              updateLastClicked(app, iClicked, clickedNode, dClicked);
            });

          return;
        }

        // clicking on URL node with other node's form open
      });
    return;
  }

  //TODO: GIVE BACK ZOOM WHENEVER ISFORMSHOWING IS FALSE
  app.svg.on(".zoom", null);
  app.isTyping = true;
  app.isFormShowing = true;
  app.optionG
    .append("foreignObject")
    .lower()
    .attrs({
      width: 175,
      height: 60,
      x: globalRadius
    });

  app.transitionGs
    .merge(app.transitionGsEnter)
    .transition()
    .duration(500)
    .attrTween("transform", translateBackLastMoved(base))
    .on("end", function(d, i) {
      updateBasePeriod(d, d.basePeriod - base);
      if (i === iClicked) {
        openForm(d, iClicked);
      }
      updateLastClicked(app, iClicked, clickedNode, dClicked);
    });

  function shouldAnimate() {
    if (iClicked === 1 && list.length === 4) {
      return false;
    }
    return true;
  }

  function openForm(d, i) {
    if (i == 1) {
      app.transitionForm = app.optionG
        .select("foreignObject")
        .attrs({
          y: i === 1 ? -30 : -11.5
        })
        .append("xhtml:textarea");
    } else {
      app.transitionForm = app.optionG
        .select("foreignObject")
        .attrs({
          y: i === 1 ? -30 : -11.5
        })
        .append("xhtml:input");
    }
    app.transitionForm
      .style("width", "0px")
      .attr("id", "currentInput")
      .attr("maxlength", function() {
        switch (i) {
          case 0:
            return 300;
            break;
          case 1:
            return 250;
            break;
          case 3:
            return 150;
            break;
        }
      })
      .attr("spellcheck", false)
      .attr("placeholder", function() {
        switch (i) {
          case 0:
            return "Link Resource URL here!";
          case 1:
            return "Talk about this resource!";
          case 2:
            return "Custom Node image URL";
          case 3:
            return "Custom title";
          default:
        }
      })
      .attr("value", function() {
        switch (i) {
          case 0:
            return selectedNode.storedInfo.url;
          case 1:
            d3.select(this).node().innerText = selectedNode.storedInfo.info;
            break;
          case 2:
            return selectedNode.storedInfo.picture;
          case 3:
            return selectedNode.storedInfo.title;
          default:
        }
      })
      .style("padding-right", "0px")
      .on("focus", function() {
        app.svg.on(".zoom", null);
      })
      .on("blur", function() {
        var zoom = d3.zoom().on("zoom", function() {
          app.container.attr("transform", d3.event.transform);
        });

        app.svg.call(zoom).on("dblclick.zoom", null);

        app.isTyping = false;
      });

    app.transitionForm
      .transition()
      .duration(500)
      .style("overflow", "hidden")
      .style("width", "150px")
      .style("padding-right", "15px")
      .style("padding-left", "5px")
      .on("end", function() {
        d3.select(this).style("overflow", "auto");

        if (!app.showModal)
          d3.select(this)
            .node()
            .focus();
      });

    clickedNode
      .transition()
      .duration(500)
      .attr("transform", d => transformOpenCurrentNode(d));

    app.isFormShowing = true;
  }
}

export function isFetching(app) {
  app.map(eachTransitionNode => {
    if (eachTransitionNode.isLoading) {
      return true;
    }
  });
  return false;
}

export function saveTransitionNodeData(app, lastClickedId, newClickedId) {
  console.log("saving node data", app.selectedNode);
  // set app's selectedNode's what to ..?
  var selectedNode = app.selectedNode;
  var newInputValue = d3.select("#currentInput")._groups[0][0].value;
  if (!newInputValue.includes("http") & newInputValue.includes("www")) {
    newInputValue = "http://" + newInputValue;
  }
  switch (lastClickedId) {
    case 0:
      if (selectedNode.storedInfo.url === newInputValue) return;
      app.showModal = true;
      app.forceUpdate();
      d3.select(".btn.ok").on("click", () => {
        console.log("now, the seelctednode is...", selectedNode);
        app.onLoadIt(
          app,
          lastClickedId,
          newClickedId,
          newInputValue,
          selectedNode
        );
      });
      d3.select(".btn.no").on("click", () => {
        app.onNoLoad(
          app,
          lastClickedId,
          newClickedId,
          newInputValue,
          selectedNode
        );
      });
      break;
    case 1:
      var newInfo = newInputValue;
      if (newInfo === selectedNode.storedInfo.info) return;
      var prevInfo = selectedNode.storedInfo;
      prevInfo = JSON.parse(JSON.stringify(prevInfo));
      selectedNode.storedInfo.info = newInfo;
      var command = {
        action: {
          type: "modifyResourceNode",
          node: selectedNode,
          storedInfo: selectedNode.storedInfo
        },
        inverse: {
          type: "modifyResourceNode",
          node: selectedNode,
          storedInfo: prevInfo
        }
      };

      app.storeToHistory(command);

      break;
    case 2:
      var prevInfo = JSON.parse(JSON.stringify(selectedNode.storedInfo));
      var newValue = d3.select("#currentInput")._groups[0][0].value;

      if (newValue === selectedNode.storedInfo.picture) {
        return;
      }
      var prevValue = selectedNode.storedInfo.picture;
      selectedNode.storedInfo.picture = newValue;
      app.circleGroups.selectAll(".nodeImage").each(function(d) {
        if (d.id !== selectedNode.id) return;
        var pictureRef = this;
        if (selectedNode.storedInfo.picture === "") {
          // if there's nothing appended, href null
          d3.select(this).attr("href", null);
          console.log("SET to null for some reason");
        } else {
          // set src
          var img = new Image();
          img.onload = function() {
            console.log("SETTING HREF", img.src);
            d3.select(pictureRef).attr("href", img.src);
          };
          img.onerror = function() {
            app.setMessage("Image 404, reverting to previous Image URL", 2000);
            d3.select(pictureRef).attr("href", null);
            selectedNode.storedInfo.picture = prevValue;
          };
          img.src = selectedNode.storedInfo.picture;

          d3.select(this).attr("href", loadingGif);
        }
        var command = {
          action: {
            type: "modifyResourceNode",
            node: selectedNode,
            storedInfo: selectedNode.storedInfo
          },
          inverse: {
            type: "modifyResourceNode",
            node: app.selectedNode,
            storedInfo: prevInfo
          }
        };
        app.storeToHistory(command);
      });
      break;
    case 3:
      selectedNode.storedInfo.title = d3.select(
        "#currentInput"
      )._groups[0][0].value;

      var newInfo = d3.select("#currentInput")._groups[0][0].value;
      if (newInfo === selectedNode.storedInfo.title) return;
      var prevInfo = selectedNode.storedInfo;
      selectedNode.storedInfo.title = newInfo;
      var command = {
        action: {
          type: "modifyResourceNode",
          node: selectedNode,
          storedInfo: selectedNode.storedInfo
        },
        inverse: {
          type: "modifyResourceNode",
          node: app.selectedNode,
          storedInfo: prevInfo
        }
      };

      app.storeToHistory(command);
    default:
  }
}

export function textNodeClick(d, i, DOMEle, app) {
  app.selectedLink = null;
  var prevLocation = app.optionG.attr("transform");
  var duration = 500;
  if (app.selectedNode && app.selectedNode.type === "circle") {
    app.lastClickedCircle = null;
    // if we were selecting circles, close them
    if (app.isFormShowing) {
      saveTransitionNodeData(app, app.lastClickedId);
      closeForm(app);
      closeNode(app);
    }

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
  if (d === app.selectedNode) {
    app.selectedNode = null;
    app.forceUpdate();
    app.restart();
  } else {
    app.selectedNode = d;
    app.forceUpdate();
    app.restart();
  }
  console.log("after", app.selectedNode);
}

export function textNodeDblClick(rectData, i, DOMEle, app) {
  updateStroke(app);
  app.selectedNode = rectData;
  app.forceUpdate();
  app.mousedownNode = null;

  if (app.state.preview) {
    app.setMessage("Can't edit during preview mode", 2000);
    return;
  }
  app.isTyping = true;
  app.svg.on(".zoom", null);
  app.startText = rectData.text;

  app.nodes.map(eachNode => {
    if (eachNode.id === rectData.id) {
      eachNode.opacity = 0;
      app.restart();
    }
  });

  app.textInputCircle = rectData;

  app.textBox = app.textBox
    .attr("x", rectData.x)
    .attr("y", rectData.y)
    .attr("width", "500%")
    .attr("height", "300vh");
  console.log(rectData.text, textArrToHTML(rectData.text));
  var paragraph = app.textBox
    .append("xhtml:textarea")
    .attr("id", "textBoxP")
    .html(() => {
      var stringBuilder = "";
      for (var i = 0; i < rectData.text.length; i++) {
        stringBuilder += rectData.text[i];
        if (rectData.text.length > 1) {
          stringBuilder += "\n";
        }
      }

      console.log({ stringBuilder });
      return stringBuilder;
    })
    .attr("spellcheck", false)
    .style("height", "300vh")
    .style("width", "5000%")
    .style("outline", "none")
    .style("font", rectData.textSize + "px " + rectData.textFont)
    .style("font-family", app.font)
    .style("line-height", rectData.textSize + "px")
    .style("display", "block")
    .style("border", "none")
    .style("resize", "none")
    .style("overflow", "auto")
    .style("background", "none")
    .attr("maxlength", 2000);
  paragraph
    .on("click", () => {
      console.log("cliekd");
    })
    .on("blur", function() {
      var zoom = d3.zoom().on("zoom", function() {
        app.container.attr("transform", d3.event.transform);
      });

      app.svg.call(zoom).on("dblclick.zoom", null);

      d3.selectAll("foreignObject").remove();
      app.textBox = app.container.append("foreignObject");
      app.resourceForm = app.container
        .append("foreignObject")
        .attr("id", "resourceForm");
      app.nodes.map(eachNode => {
        if (eachNode.id === app.textInputCircle.id) {
          eachNode.opacity = 1;
          app.restart();
        }
      });

      //TODO: if text isn't the same or the node is brand new, store to history
      //on add new node, notNewNode is false
      //on dblclick, blur, notNewNode is true
      if (app.startText !== rectData.text) {
        app.nodeToChange = rectData;
        var command = {
          action: {
            type: "modifyText",
            node: app.nodeToChange,
            text: rectData.text
          },
          inverse: {
            type: "modifyText",
            node: app.nodeToChange,
            text: app.startText
          }
        };

        app.storeToHistory(command);
      }

      app.startText = null;
      app.nodeToChange = null;
      app.isTyping = false;
      app.textInputCircle = null;
    })
    .on("keydown", function() {
      if (d3.event.keyCode === 13 && !d3.event.shiftKey) {
        d3.event.preventDefault();
      }

      if (
        d3.event.keyCode === 13 &&
        d3.event.shiftKey &&
        rectData.text.length === 1 &&
        rectData.text[0] === ""
      ) {
        d3.event.preventDefault();
        app.setMessage("Please write something before starting a new line", 2000);
        return;
      } else {
      }
    })
    .on("keyup", function() {
      if (d3.event.keyCode === 13 && !d3.event.shiftKey) {
        this.blur();
      } else if (d3.select(this).node().value.length > 1999) {
        app.setMessage("This textbox has reached the 2000 character limit", 1000);

        app.restart();
      } else {
        var node = d3.select(this).node();
        // note, d.text is referring to the d in dblclick, d in g, d in text, from app.nodes
        var nodeHTML = d3.select(this).node().value;

        /*

        nodeHTML = nodeHTML.slice(3, nodeHTML.length - 4);

        if (
          nodeHTML.substring(nodeHTML.length - 4, nodeHTML.length) === "<br>"
        ) {
          nodeHTML = nodeHTML.slice(0, nodeHTML.length - 4);
        }
*/
        var textArr = nodeHTML.split("\n");
        console.log(nodeHTML === "\n");
        console.log({ textArr });
        rectData.text = textArr;
        app.restart();
      }
    })
    .on("keypress", function() {})
    .on("paste", function() {
      if (d3.select(this).node().value.length > 1999) {
        app.setMessage("This textbox has reached the 2000 character limit", 1000);
        app.restart();
      }
      /*
      function insertTextAtCursor(text) {
        var sel, range, html;
        if (window.getSelection) {
          sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
          }
        } else if (document.selection && document.selection.createRange) {
          document.selection.createRange().text = text;
        }
      }
*/
    });

  paragraph.node().focus();
}
