"use client";

import { MotionConfig, motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
}

export default function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="min-h-screen flex flex-col justify-between"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
