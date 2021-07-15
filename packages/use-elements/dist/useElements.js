
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElements = void 0;
const react_1 = require("react");

function useElements() {
    const [elements, setElements] = react_1.useState({});
    const funcsRef = react_1.useRef({});
    const ref = react_1.useRef(elements);
    const addElement = react_1.useCallback((key) => {
        if (!funcsRef.current[key])
            funcsRef.current[key] = (elem) => {
                if (elem) {
                    setElements((prev) => ({...prev, [key]: elem}));
                }
                else {
                    delete funcsRef.current[key];
                    setElements((prev) => {
                        const copy = { ...prev};
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
    react_1.useEffect(() => {
        ref.current = elements;
    }, [elements]);
    const hasElements = react_1.useMemo(() => Object.keys(elements).length > 0, [elements]);
    return { elements, addElement, elementsRef: ref, hasElements };
}
exports.useElements = useElements;
