var Drawer = /** @class */ (function () {
    function Drawer(rootX, rootY) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.cursorPos = null;
        this.lines = [];
    }
    Drawer.prototype.start = function (x, y) {
        var _x = x - this.rootX;
        var _y = y - this.rootY;
        this.lines.push("M " + _x + " " + _y);
        this.cursorPos = { x: _x, y: _y };
        return this;
    };
    Drawer.prototype.move = function (x, y) {
        this.start(x, y);
        return this;
    };
    Drawer.prototype.line = function (x, y) {
        var _x = x - this.rootX;
        var _y = y - this.rootY;
        this.lines.push("L" + this.cursorPos.x + "," + this.cursorPos.y + " " + _x + "," + _y);
        return this;
    };
    Drawer.prototype.smoothBezier = function (x, y) {
        var _x = x - this.rootX;
        var _y = y - this.rootY;
        this.lines.push("S" + this.cursorPos.x + "," + this.cursorPos.y + " " + _x + "," + _y);
        return this;
    };
    Drawer.prototype.bezier = function (_a) {
        var _endX = _a.endX, _endY = _a.endY, _b = _a.ctrlOffsetEndX, ctrlOffsetEndX = _b === void 0 ? 0 : _b, _c = _a.ctrlOffsetEndY, ctrlOffsetEndY = _c === void 0 ? 0 : _c, _d = _a.ctrlOffsetStartX, ctrlOffsetStartX = _d === void 0 ? 0 : _d, _e = _a.ctrlOffsetStartY, ctrlOffsetStartY = _e === void 0 ? 0 : _e;
        var endX = _endX - this.rootX;
        var endY = _endY - this.rootY;
        this.lines.push("C " + (this.cursorPos.x + ctrlOffsetStartX) + " " + (this.cursorPos.y + ctrlOffsetStartY) + ", " + (endX + ctrlOffsetEndX) + " " + (endY + ctrlOffsetEndY) + ", " + endX + " " + endY);
        this.cursorPos = {
            x: endX,
            y: endY,
        };
        return this;
    };
    Drawer.prototype.close = function () {
        this.lines.push("Z");
        return this;
    };
    Drawer.prototype.get = function () {
        return this.lines.join("");
    };
    return Drawer;
}());
export { Drawer };
