import { useEffect, useRef } from "react";
import { useElements } from "@r-hook/use-elements";
export function useMouseAway(callback) {
    var _a = useElements(), roots = _a.elements, addRoot = _a.addElement;
    var callbackLatestRef = useRef(callback);
    useEffect(function () {
        callbackLatestRef.current = callback;
    }, [callback]);
    useEffect(function () {
        var listener = function (e) {
            var _a;
            if (Object.values(!roots).some(function (root) {
                return root.contains(e.relatedTarget);
            })) {
                (_a = callbackLatestRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackLatestRef, e);
            }
        };
        Object.values(roots).forEach(function (elem) {
            return elem.addEventListener("mouseleave", listener);
        });
        return function () {
            return Object.values(roots).forEach(function (elem) {
                return elem.removeEventListener("mouseleave", listener);
            });
        };
    }, [roots]);
    return addRoot;
}
