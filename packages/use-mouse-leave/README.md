# use-mouse-leave

Be notified when the mouse leaves an area.

```tsx
import { useMouseAway } from "@r-rook/use-mouse-away";

const addIgnored = useMouseAway((e) => console.log("Area left!"));

<div>
  <div ref={addIgnored(1)}></div>
  <div ref={addIgnored(123)}></div>
  <div ref={addIgnored("another-id")}></div>
</div>;
```
