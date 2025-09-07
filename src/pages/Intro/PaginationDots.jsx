import { motion } from "framer-motion";

export default function PaginationDots({ total, current }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{
            scale: current === i ? 1.2 : 0.8,
            opacity: current === i ? 1 : 0.4,
            backgroundColor: current === i ? "#dfdfdf" : "#fffffff",
          }}
          transition={{ duration: 0.3 }}
          className="w-8 h-1 rounded-full"
        />
      ))}
    </div>
  );
}
