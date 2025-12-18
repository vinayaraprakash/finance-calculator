import { useEffect, useState } from "react";

export function useCountUp(value: number, duration = 400) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return Math.round(display);
}
