"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";

interface StoriesProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const ringVariants: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  animate: {
    scale: 1.1,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const Stories = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: StoriesProps) => {
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
            setTimeout(handleReset, 300);
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
        {/* Outer ring */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          variants={ringVariants}
          animate={controls}
          initial="normal"
        />
        {/* Inner circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="6"
          variants={ringVariants}
          animate={controls}
          initial="normal"
        />
        {/* Center dot */}
        <motion.circle
          cx="12"
          cy="12"
          r="2"
          fill={stroke}
          variants={ringVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  );
};

export { Stories };