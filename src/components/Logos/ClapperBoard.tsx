"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

interface ClapperboardProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const transition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 10,
  mass: 0.8,
};

const variants: Variants = {
  normal: {
    rotate: 0,
    originX: 0,
    originY: 1,
    y: 0,
  },
  animate: {
    rotate: [-45, 0],
    y: [-2, 0],
    transition,
  },
};

const Clapperboard = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: ClapperboardProps) => {
  const controls = useAnimation();
  const breakpoint = useBreakpoint();

  const handleAnimate = () => controls.start("animate");
  const handleReset = () => controls.start("normal");

  const eventProps =
    breakpoint === "lg"
      ? {
          onMouseEnter: handleAnimate,
          onMouseLeave: handleReset,
        }
      : {
          onClick: () => {
            handleAnimate();
            setTimeout(handleReset, 400); // match animation duration
          },
        };

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...eventProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.g variants={variants} animate={controls} initial="normal">
          <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
          <path d="m6.2 5.3 3.1 3.9" />
          <path d="m12.4 3.4 3.1 4" />
        </motion.g>
        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    </div>
  );
};

export { Clapperboard };
