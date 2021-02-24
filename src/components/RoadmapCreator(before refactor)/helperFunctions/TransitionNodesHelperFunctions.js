import { editButton, link, photo, t as alphabetT} from "../resources";

var globalRadius = 35;

export function getTranslateString(x, y) {
  return "translate(" + x + " " + y + ")";
}

export function pureDecodeTranslate(translateString) {
  var x, y;
  if (translateString.includes(",")) {
    x = translateString.substring(
      translateString.indexOf("(") + 1,
      translateString.indexOf(",")
    );
    y = translateString.substring(
      translateString.indexOf(",") + 1,
      translateString.indexOf(")")
    );
  } else {
    x = translateString.substring(
      translateString.indexOf("(") + 1,
      translateString.indexOf(" ")
    );
    y = translateString.substring(
      translateString.indexOf(" ") + 1,
      translateString.indexOf(")")
    );
  }

  return { x: x, y: y };
}

export function decodeTranslateString(
  prevOptionGTransform,
  eachCircleTransform,
  selectedNode
) {
  var prevLocationX, prevLocationY, prevX, prevY;
  if (prevOptionGTransform.includes(",")) {
    prevLocationX = prevOptionGTransform.substring(
      prevOptionGTransform.indexOf("(") + 1,
      prevOptionGTransform.indexOf(",")
    );
    prevLocationY = prevOptionGTransform.substring(
      prevOptionGTransform.indexOf(",") + 1,
      prevOptionGTransform.indexOf(")")
    );
  } else {
    prevLocationX = prevOptionGTransform.substring(
      prevOptionGTransform.indexOf("(") + 1,
      prevOptionGTransform.indexOf(" ")
    );
    prevLocationY = prevOptionGTransform.substring(
      prevOptionGTransform.indexOf(" ") + 1,
      prevOptionGTransform.indexOf(")")
    );
  }

  var diffX = prevLocationX - selectedNode.x;
  var diffY = prevLocationY - selectedNode.y;

  if (eachCircleTransform.includes(",")) {
    prevX = eachCircleTransform.substring(
      eachCircleTransform.indexOf("(") + 1,
      eachCircleTransform.indexOf(",")
    );
    prevY = eachCircleTransform.substring(
      eachCircleTransform.indexOf(",") + 1,
      eachCircleTransform.indexOf(")")
    );
  } else {
    prevX = eachCircleTransform.substring(
      eachCircleTransform.indexOf("(") + 1,
      eachCircleTransform.indexOf(" ")
    );
    prevY = eachCircleTransform.substring(
      eachCircleTransform.indexOf(" ") + 1,
      eachCircleTransform.indexOf(")")
    );
  }

  return {
    x: Number(diffX) + Number(prevX) - 75,
    y: Number(diffY) + Number(prevY) - 20
  };
}

export function translateFromCenterToDefault() {
  return function(d, i, list) {
    var periodSpaceBetween = Math.PI / (list.length + 1);
    updateBasePeriod(d, Math.PI / 2 - periodSpaceBetween * (i + 1));
    var x = globalRadius * Math.cos(Math.PI / 2 - periodSpaceBetween * (i + 1));
    var y =
      -globalRadius * Math.sin(Math.PI / 2 - periodSpaceBetween * (i + 1));

    return getTranslateString(x, y);
  };
}

export function translateToDefault() {
  return function(d, i, list) {
    var periodSpaceBetween = Math.PI / (list.length + 1);
    var goTo = Math.PI / 2 - periodSpaceBetween * (i + 1);

    return function(t) {
      var x = globalRadius * Math.cos(d.basePeriod + (goTo - d.basePeriod) * t);
      var y =
        -globalRadius * Math.sin(d.basePeriod + (goTo - d.basePeriod) * t);
      return getTranslateString(x, y);
    };
  };
}

export function translateBackLastMoved(base) {
  return function(d, i, list) {
    return function(t) {
      var y = -globalRadius * Math.sin(-base * t + d.basePeriod);
      var x = +globalRadius * Math.cos(-base * t + d.basePeriod);
      return getTranslateString(x, y);
    };
  };
}

export function updateBasePeriod(d, newBasePeriod) {
  d.basePeriod = newBasePeriod;
}

export function makeTransitionNodeData(length) {
  var temp = [
    {
      href: link,
      isLoading: false
    },
    {
      href: editButton,
      isLoading: false
    }
  ];
  if (length === 4) {
    temp.push(
      {
        href: photo,
        isLoading: false
      },
      {
        href: alphabetT,
        isLoading: false
      }
    );
  }

  return temp;
}

export function transformCloseCurrentNode(d) {
  return getTranslateString(globalRadius, 0);
}

export function transformOpenCurrentNode(d) {
  return getTranslateString(globalRadius + 175, 0);
}

export function updateLastClicked(
  app,
  newClickedId,
  newClickedNode,
  newClickedData
) {
  app.lastClickedId = newClickedId;
  app.lastClickedNode = newClickedNode;
  app.lastClickedD = newClickedData;
}
