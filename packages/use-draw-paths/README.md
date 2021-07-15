```tsx
  const [setRoot, addElement, paths] = useDrawPaths<"c1" | "c2" | "c3" | "c4">([
    ({ c1, c2 }, drawer) => {
      drawer.start(c1.x + c1.width / 2, c1.y + c1.height + 15).bezier({
        endY: c2.y - 15,
        endX: c2.x + c2.width / 2,
        ctrlOffsetStartY: 80,
        ctrlOffsetEndY: -80
      });
    },
    ({ c2, c3, c4 }, drawer) => {
      drawer
        .start(c2.x + c2.width + 10, c2.y + c2.height / 2)
        .bezier({
          endX: c3.x + c3.width / 2,
          endY: c3.y - 10,
          ctrlOffsetStartY: 80,
          ctrlOffsetEndY: -80
        })
        .smoothBezier(c4.left + c4.width / 2, c4.y);
    }
  ]);

<Card ref={addElement("c1")}></Card>
<Card ref={addElement("c2")}></Card>
<Card ref={addElement("c3")}></Card>
<Card ref={addElement("c4")}></Card>
```

![](https://i.imgur.com/XG0kiur.png)
