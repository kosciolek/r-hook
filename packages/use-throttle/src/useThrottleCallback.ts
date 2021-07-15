import {
  useCallback,
  useEffect,
  useRef,
} from "react";

const perf = typeof performance !== "undefined" ? performance : Date;
const getNow = () => perf.now();

export function useThrottleCallback<
  T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown
>(callback: T, intervalMs: number) {
  const latestCallbackRef = useRef<T>(callback);
  useEffect(() => {
    latestCallbackRef.current = callback;
  }, [callback]);

  const lastCallRef = useRef<number | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestArgsRef = useRef<Parameters<T> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = getNow();
      const invoke = () => {
        latestCallbackRef.current(...latestArgsRef.current!);
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        latestArgsRef.current = null;
        lastCallRef.current = getNow();
      };
      if (
        lastCallRef.current === null ||
        (lastCallRef.current && now - lastCallRef.current >= intervalMs)
      ) {
        latestArgsRef.current = args;
        invoke();
      } else {
        if (timeout.current !== null) {
          latestArgsRef.current = args;
          return;
        }
        timeout.current = setTimeout(() => {
          invoke();
        }, intervalMs - (now - lastCallRef.current));
      }
    },
    [intervalMs]
  ) as unknown as T;
}
