export declare class Drawer {
    rootX: number;
    rootY: number;
    constructor(rootX: number, rootY: number);
    private cursorPos;
    private lines;
    start(x: number, y: number): this;
    move(x: number, y: number): this;
    line(x: number, y: number): this;
    smoothBezier(x: number, y: number): this;
    bezier({ endX: _endX, endY: _endY, ctrlOffsetEndX, ctrlOffsetEndY, ctrlOffsetStartX, ctrlOffsetStartY, }: {
        endX: number;
        endY: number;
        ctrlOffsetStartX?: number;
        ctrlOffsetStartY?: number;
        ctrlOffsetEndX?: number;
        ctrlOffsetEndY?: number;
    }): this;
    close(): this;
    get(): string;
}
