import { useLayoutEffect, useState } from "react";
export function useIntersection(_a) {
    var _b = _a === void 0 ? {} : _a, rootMargin = _b.rootMargin, threshold = _b.threshold;
    var _c = useState(null), observed = _c[0], setObserved = _c[1];
    var _d = useState(null), root = _d[0], setRoot = _d[1];
    var _e = useState(null), entry = _e[0], setEntry = _e[1];
    useLayoutEffect(function () {
        if (!observed) {
            setEntry(null);
            return function () { };
        }
        var io = new IntersectionObserver(function (_a) {
            var _entry = _a[0];
            setEntry(_entry);
        }, { rootMargin: rootMargin, threshold: threshold, root: root });
        io.observe(observed);
        return function () { return io.disconnect(); };
    }, [observed, root, rootMargin, threshold]);
    return [setObserved, entry, setRoot];
}
