var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
export function useElements() {
    var _a = useState({}), elements = _a[0], setElements = _a[1];
    var funcsRef = useRef({});
    var ref = useRef(elements);
    var addElement = useCallback(function (key) {
        if (!funcsRef.current[key])
            funcsRef.current[key] = function (elem) {
                if (elem) {
                    setElements(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[key] = elem, _a)));
                    });
                }
                else {
                    delete funcsRef.current[key];
                    setElements(function (prev) {
                        var copy = __assign({}, prev);
                        if (elem)
                            copy[key] = elem;
                        else
                            delete copy[key];
                        return copy;
                    });
                }
            };
        return funcsRef.current[key];
    }, []);
    useEffect(function () {
        ref.current = elements;
    }, [elements]);
    var hasElements = useMemo(function () { return Object.keys(elements).length > 0; }, [elements]);
    return { elements: elements, addElement: addElement, elementsRef: ref, hasElements: hasElements };
}
