import { useCallback, useEffect, useLayoutEffect, useRef, useState, } from "react";
import { useElements } from "@r-hook/use-elements";
import { Drawer } from "./Drawer";
export function useDrawPaths(drawFuncs) {
    var latestFuncsRef = useRef(drawFuncs);
    useEffect(function () {
        latestFuncsRef.current = drawFuncs;
    }, [drawFuncs]);
    var _a = useElements(), elements = _a.elements, addElement = _a.addElement, hasElements = _a.hasElements;
    var _b = useState(null), root = _b[0], setRoot = _b[1];
    var canDraw = root && hasElements;
    var _c = useState([]), paths = _c[0], setPaths = _c[1];
    var recalculate = useCallback(function () {
        if (!canDraw)
            return;
        var rects = Object.entries(elements).reduce(function (acc, _a) {
            var key = _a[0], elem = _a[1];
            acc[key] = elem.getBoundingClientRect();
            return acc;
        }, {});
        var rootRect = root.getBoundingClientRect();
        var drawers = latestFuncsRef.current.map(function (func) {
            var drawer = new Drawer(rootRect.x, rootRect.y);
            func(rects, drawer);
            return drawer;
        });
        setPaths(drawers.map(function (drawer) { return drawer.get(); }));
    }, [elements, canDraw, root]);
    useLayoutEffect(function () {
        var listener = function () { return recalculate(); };
        listener();
        window.addEventListener("resize", listener);
        return function () { return window.removeEventListener("resize", listener); };
    }, [recalculate]);
    useEffect(function () {
        if (!canDraw)
            return function () { };
        var ro = new ResizeObserver(function () { return recalculate(); });
        Object.values(elements).forEach(function (elem) { return ro.observe(elem); });
        return function () { return ro.disconnect(); };
    }, [elements, recalculate, canDraw]);
    return [setRoot, addElement, paths, recalculate];
}
