import { useEffect, useRef, useState } from "react";

export function useIsCentered() {
  const ref = useRef<HTMLDivElement>(null);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    function checkCentered() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      // Check if the center of the card is within a threshold of the viewport center
      const cardCenter = rect.top + rect.height / 2;
      setIsCentered(Math.abs(cardCenter - centerY) < rect.height / 2);
    }

    window.addEventListener("scroll", checkCentered);
    window.addEventListener("resize", checkCentered);
    checkCentered();

    return () => {
      window.removeEventListener("scroll", checkCentered);
      window.removeEventListener("resize", checkCentered);
    };
  }, []);

  return [ref, isCentered] as const;
}
