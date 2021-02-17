/** import "d3-selection-multi" not applying .attrs (perhaps due to snowpack) 
 * therefore, I configure selections to have attrs myself. 
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
