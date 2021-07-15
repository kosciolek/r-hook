/// <reference types="react" />
export declare function useIntersection({ rootMargin, threshold, }?: Omit<IntersectionObserverInit, "root">): (import("react").Dispatch<import("react").SetStateAction<HTMLElement | null>> | IntersectionObserverEntry | null)[];
