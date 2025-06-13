import { useEffect, useRef } from "react";

export function useDebounce(callback, deps, delay) {
  const handler = useRef();

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler.current);
  }, [...deps, delay]);
}
