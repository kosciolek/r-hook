import { useLayoutEffect, useState } from "react";

export function useIntersection({
  rootMargin,
  threshold,
}: Omit<IntersectionObserverInit, "root"> = {}) {
  const [observed, setObserved] = useState<HTMLElement | null>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useLayoutEffect(() => {
    if (!observed) {
      setEntry(null);
      return () => {};
    }

    const io = new IntersectionObserver(
      ([_entry]) => {
        setEntry(_entry);
      },
      { rootMargin, threshold, root }
    );

    io.observe(observed);
    return () => io.disconnect();
  }, [observed, root, rootMargin, threshold]);

  return [setObserved, entry, setRoot];
}
