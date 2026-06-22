"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/utils";

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink("Hi Plaas Gedrag, I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-ember text-bone shadow-[0_10px_30px_-6px_rgba(181,64,42,0.7)]"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-ember/40" />
          <MessageCircle size={26} className="relative" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
