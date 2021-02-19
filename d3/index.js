/** import "d3-selection-multi" not applying .attrs (perhaps due to snowpack) 
 * therefore, I configure selections to have attrs myself. 
 */

/** FUTURE IMPROVEMENTS
 *  Submodularize D3 packages, issue: 
 *      "event" module should be exported from "d3-selection" <=@1.4.2
 *      This works on playground sandbox: https://codesandbox.io/s/tender-benz-p5dtn?file=/src/index.js
 *      Does not work here yet.  
 */

import { select, selection, selectAll} from "d3-selection"

function attrsFunction(selection, map) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = select(this);
        for (var name in x) s.attr(name, x[name]);
    });
}

function attrsObject(selection, map) {
    for (var name in map) selection.attr(name, map[name]);
    return selection;
}

selection.prototype.attrs = function (map) {
    return (typeof map === "function" ? attrsFunction : attrsObject)(this, map);
}



export * from "d3"
export { select, selection, selectAll }
