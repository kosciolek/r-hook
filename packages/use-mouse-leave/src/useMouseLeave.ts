import { useEffect, useRef } from "react";
import { useElements } from "@r-hook/use-elements";

export function useMouseAway(callback?: (e: MouseEvent) => void) {
  const { elements: roots, addElement: addRoot } = useElements();

  const callbackLatestRef = useRef(callback);
  useEffect(() => {
    callbackLatestRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        Object.values(!roots).some((root) =>
          root.contains(e.relatedTarget as HTMLElement)
        )
      ) {
        callbackLatestRef.current?.(e);
      }
    };

    Object.values(roots).forEach((elem) =>
      elem.addEventListener("mouseleave", listener)
    );
    return () =>
      Object.values(roots).forEach((elem) =>
        elem.removeEventListener("mouseleave", listener)
      );
  }, [roots]);

  return addRoot;
}
