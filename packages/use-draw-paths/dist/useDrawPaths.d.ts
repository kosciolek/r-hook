/// <reference types="react" />
import { Id } from "@r-hook/use-elements";
import { Drawer } from "./Drawer";
export declare function useDrawPaths<T extends Id = Id>(drawFuncs: ((rects: Record<T, DOMRect>, drawer: Drawer) => void)[]): readonly [import("react").Dispatch<import("react").SetStateAction<SVGSVGElement | null>>, (key: T) => Record<Id, (instance: HTMLElement | null) => void>[T], string[], () => void];
