/// <reference types="react" />
export declare type Id = number | string;
export declare function useElements<T extends Id = Id>(): {
    readonly elements: Record<Id, HTMLElement>;
    readonly addElement: (key: T) => Record<Id, (instance: HTMLElement | null) => void>[T];
    readonly elementsRef: import("react").MutableRefObject<Record<Id, HTMLElement>>;
    readonly hasElements: boolean;
};
