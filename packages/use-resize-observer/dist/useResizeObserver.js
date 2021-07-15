import { useLayoutEffect, useState } from "react";
export function useResizeObserver() {
    var _a = useState(null), observed = _a[0], setObserved = _a[1];
    var _b = useState(null), entry = _b[0], setEntry = _b[1];
    useLayoutEffect(function () {
        if (!observed) {
            setEntry(null);
            return function () { };
        }
        var ro = new ResizeObserver(function (_a) {
            var _entry = _a[0];
            var _b = _entry.borderBoxSize[0], height = _b.blockSize, width = _b.inlineSize;
            setEntry({ width: width, height: height });
        });
        ro.observe(observed);
        return function () { return ro.disconnect(); };
    }, [observed]);
    return [setObserved, entry];
}
