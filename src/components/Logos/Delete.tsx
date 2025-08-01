"use client";

import type { Variants, Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface DeleteProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const lidVariants: Variants = {
  normal: { y: 0 },
  animate: { y: -1.1 },
};

const springTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const Delete = ({
  width = 35,
  height = 35,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: DeleteProps) => {
  const controls = useAnimation();
  const breakpoint = useBreakpoint();
  const isLargeScreen = breakpoint === "lg";

  const handleMouseEnter = () => {
    if (isLargeScreen) {
      controls.start("animate");
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      controls.start("normal");
    }
  };

  const handleClick = () => {
    if (!isLargeScreen) {
      controls.start("animate").then(() => {
        setTimeout(() => {
          controls.start("normal");
        }, 300);
      });
    }
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
        <motion.g
          variants={lidVariants}
          animate={controls}
          transition={springTransition}
        >
          <path d="M3 6h18" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </motion.g>
        <motion.path
          d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8"
          variants={{
            normal: { d: "M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8" },
            animate: { d: "M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9" },
          }}
          animate={controls}
          transition={springTransition}
        />
        <motion.line
          x1="10"
          x2="10"
          y1="11"
          y2="17"
          variants={{
            normal: { y1: 11, y2: 17 },
            animate: { y1: 11.5, y2: 17.5 },
          }}
          animate={controls}
          transition={springTransition}
        />
        <motion.line
          x1="14"
          x2="14"
          y1="11"
          y2="17"
          variants={{
            normal: { y1: 11, y2: 17 },
            animate: { y1: 11.5, y2: 17.5 },
          }}
          animate={controls}
          transition={springTransition}
        />
      </svg>
    </div>
  );
};

export { Delete };
