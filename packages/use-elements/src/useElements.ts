import {
  RefCallback,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Id = number | string;

export function useElements<T extends Id = Id>() {
  const [elements, setElements] = useState<Record<Id, HTMLElement>>({});

  const funcsRef = useRef<Record<Id, RefCallback<HTMLElement>>>({});

  const ref = useRef<typeof elements>(elements);

  const addElement = useCallback((key: T) => {
    if (!funcsRef.current[key])
      funcsRef.current[key] = (elem: HTMLElement | null) => {
        if (elem) {
          setElements((prev) => ({ ...prev, [key]: elem }));
        } else {
          delete funcsRef.current[key];

          setElements((prev) => {
            const copy = { ...prev };
            if (elem) copy[key] = elem;
            else delete copy[key];
            return copy;
          });
        }
      };
    return funcsRef.current[key];
  }, []);

  useEffect(() => {
    ref.current = elements;
  }, [elements]);

  const hasElements = useMemo(
    () => Object.keys(elements).length > 0,
    [elements]
  );

  return { elements, addElement, elementsRef: ref, hasElements } as const;
}
