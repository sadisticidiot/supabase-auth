import clsx from "clsx";
import { motion } from "motion/react";

export default function BaseInput({ error, className = "", disabled, ...props }) {
  return (
    <motion.input
      {...props}
      disabled={disabled}
      className={clsx(
        "input-base",
        {
           "text-neutral-900 inset-shadow-none cursor-not-allowed": disabled,
        },
        className
      )}
      animate={{
        boxShadow: error
            ? "0 0 0 2px rgba(251, 44, 54, 1)"
            : "0 0 0 0 rgba(251, 44, 54, 0)",

        backgroundColor: disabled 
            ? "rgba(64, 64, 64, 1)"
            : "rgb(10, 10, 10)",
      }}
      transition={{ duration: 0.12 }}
    />
  );
}
