export class Drawer {
  constructor(public rootX: number, public rootY: number) {}

  private cursorPos: {
    x: number;
    y: number;
  } | null = null;

  private lines: string[] = [];

  start(x: number, y: number) {
    const _x = x - this.rootX;
    const _y = y - this.rootY;
    this.lines.push(`M ${_x} ${_y}`);
    this.cursorPos = { x: _x, y: _y };
    return this;
  }

  move(x: number, y: number) {
    this.start(x, y);
    return this;
  }

  line(x: number, y: number) {
    const _x = x - this.rootX;
    const _y = y - this.rootY;
    this.lines.push(`L${this.cursorPos!.x},${this.cursorPos!.y} ${_x},${_y}`);
    return this;
  }

  smoothBezier(x: number, y: number) {
    const _x = x - this.rootX;
    const _y = y - this.rootY;
    this.lines.push(`S${this.cursorPos!.x},${this.cursorPos!.y} ${_x},${_y}`);
    return this;
  }

  bezier({
    endX: _endX,
    endY: _endY,
    ctrlOffsetEndX = 0,
    ctrlOffsetEndY = 0,
    ctrlOffsetStartX = 0,
    ctrlOffsetStartY = 0,
  }: {
    endX: number;
    endY: number;

    ctrlOffsetStartX?: number;
    ctrlOffsetStartY?: number;
    ctrlOffsetEndX?: number;
    ctrlOffsetEndY?: number;
  }) {
    const endX = _endX - this.rootX;
    const endY = _endY - this.rootY;

    this.lines.push(
      `C ${this.cursorPos!.x + ctrlOffsetStartX} ${
        this.cursorPos!.y + ctrlOffsetStartY
      }, ${endX + ctrlOffsetEndX} ${endY + ctrlOffsetEndY}, ${endX} ${endY}`
    );

    this.cursorPos = {
      x: endX,
      y: endY,
    };

    return this;
  }

  close() {
    this.lines.push("Z");
    return this;
  }

  get() {
    return this.lines.join("");
  }
}
