import { textArrToHTML } from "./StringHelperFunctions.js";
import {
  getTranslateString,
  pureDecodeTranslate,
  decodeTranslateString,
  translateFromCenterToDefault,
  translateToDefault,
  translateBackLastMoved,
  transformCloseCurrentNode,
  transformOpenCurrentNode,
  updateBasePeriod,
  makeTransitionNodeData
} from "./TransitionNodesHelperFunctions.js";
import {
  getInitialSVG,
  setSVGDefs,
  setSVGEvents,
  getInitialDrag,
  getInitialForce,
  setDefsGradient
} from "./setUp.js";

import {
  nodeMouseDown,
  nodeMouseUp,
  textNodeClick,
  textNodeDblClick,
  circleNodeClick,
  saveTransitionNodeData
} from "./mouseFunctions.js";

import {
  windowClick,
  windowMouseUp,
  windowMouseDown,
  windowMouseMove,
  keyup,
  keydown,
  keypress,
  resize
} from "./windowMouseFunctions.js";
import {
  invertOptionGroupVisibility,
  isOptionGroupFormVisible,
  stretchCloseOptionGroupForm,
  stretchOutOptionGroupForm,
  isTransitionCircleShowing,
  closeForm,
  closeNode
} from "./transitionFormFunctions.js";
import { updateStroke } from "./updateFunctions.js";

import {
  setOptionGroupLinkMouseEvents,
  setOptionGroupTextMouseEvents
} from "./optionGroupClicks.js";

import { cleanURLForQuery } from "./urlValidationFunctions.js";


import { svgString2Image, getSVGString } from "./SVGtoImage.js";

export {
  textArrToHTML,
  getTranslateString,
  pureDecodeTranslate,
  decodeTranslateString,
  translateFromCenterToDefault,
  translateToDefault,
  
  translateBackLastMoved,
  transformCloseCurrentNode,
  transformOpenCurrentNode,
  updateBasePeriod,
  makeTransitionNodeData,
  getInitialSVG,
  setSVGDefs,
  setSVGEvents,
  getInitialDrag,
  getInitialForce,
  setDefsGradient,
  nodeMouseDown,
  nodeMouseUp,
  textNodeClick,
  textNodeDblClick,
  circleNodeClick,
  saveTransitionNodeData,
  windowClick,
  windowMouseUp,
  windowMouseDown,
  windowMouseMove,
  keyup,
  keydown,
  keypress,
  resize,
  invertOptionGroupVisibility,
  isOptionGroupFormVisible,
  stretchCloseOptionGroupForm,
  stretchOutOptionGroupForm,
  isTransitionCircleShowing,
  closeForm,
  closeNode,
  updateStroke,
  setOptionGroupLinkMouseEvents,
  setOptionGroupTextMouseEvents,
  cleanURLForQuery,

  svgString2Image,
  getSVGString
};
