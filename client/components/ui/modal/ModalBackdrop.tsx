"use client";

import { motion } from "framer-motion";

export default function ModalBackdrop({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="z-49 fixed inset-0 bg-black z-40 cursor-pointer"
      onClick={onClick}
    ></motion.div>
  );
}
