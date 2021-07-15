import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Id, useElements } from "@r-hook/use-elements";
import { Drawer } from "./Drawer";

export function useDrawPaths<T extends Id = Id>(
  drawFuncs: ((rects: Record<T, DOMRect>, drawer: Drawer) => void)[]
) {
  const latestFuncsRef = useRef<typeof drawFuncs>(drawFuncs);
  useEffect(() => {
    latestFuncsRef.current = drawFuncs;
  }, [drawFuncs]);

  const { elements, addElement, hasElements } = useElements<T>();
  const [root, setRoot] = useState<null | SVGSVGElement>(null);

  const canDraw = root && hasElements;

  const [paths, setPaths] = useState<string[]>([]);

  const recalculate = useCallback(() => {
    if (!canDraw) return;

    const rects = Object.entries(elements).reduce((acc, [key, elem]) => {
      acc[key] = elem.getBoundingClientRect();
      return acc;
    }, {} as any);

    const rootRect = root!.getBoundingClientRect();
    const drawers = latestFuncsRef.current.map((func) => {
      const drawer = new Drawer(rootRect.x, rootRect.y);
      func(rects, drawer);
      return drawer;
    });

    setPaths(drawers.map((drawer) => drawer.get()));
  }, [elements, canDraw, root]);

  useLayoutEffect(() => {
    const listener = () => recalculate();
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [recalculate]);

  useEffect(() => {
    if (!canDraw) return () => {};
    const ro = new ResizeObserver(() => recalculate());
    Object.values(elements).forEach((elem) => ro.observe(elem));

    return () => ro.disconnect();
  }, [elements, recalculate, canDraw]);

  return [setRoot, addElement, paths, recalculate] as const;
}
