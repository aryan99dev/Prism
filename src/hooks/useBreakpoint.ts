import { useEffect, useState } from "react";

// Returns 'md' if width < 1024, 'lg' if width >= 1024
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'md' | 'lg'>(() =>
    window.innerWidth >= 1024 ? 'lg' : 'md'
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(window.innerWidth >= 1024 ? 'lg' : 'md');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
} 