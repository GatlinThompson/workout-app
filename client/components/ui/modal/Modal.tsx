"use client";

import React from "react";
import { useModal } from "@/contexts/ModalContext";
import ModalContainer from "./ModalContainer";
import ModalBackdrop from "./ModalBackdrop";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.module.css";
import { BsX as Cross } from "react-icons/bs";
import Divider from "../divider/Divider";

export default function Modal() {
  const { isOpen, modalContent, closeModal } = useModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${styles.modal} rounded-lg py-2 px-3 shadow-lg z-50 relative max-w-2xl w-full mx-2`}
          >
            <div className="flex justify-center items-center py-2">
              <h2 className="text-2xl font-bold text-center">
                {modalContent?.title}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-2 right-3"
              >
                <div>
                  <Cross className="w-12 h-12 text-red-orange hover:text-red-800" />
                </div>
              </button>
            </div>
            <Divider />

            <div className="px-2 pb-5 pt-5">{modalContent?.content}</div>
          </motion.div>
          <ModalBackdrop onClick={closeModal} />
        </ModalContainer>
      )}
    </AnimatePresence>
  );
}
