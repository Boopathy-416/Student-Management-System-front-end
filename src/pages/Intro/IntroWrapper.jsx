import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowRightCircle,
  ArrowRightSquare,
  DecimalsArrowRight,
  RollerCoaster,
} from "lucide-react";
import { Link } from "react-router-dom";

import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import PaginationDots from "./PaginationDots";

const slides = [Slide1, Slide2, Slide3];

export default function IntroWrapper() {
  const [step, setStep] = useState(0);

  const CurrentSlide = slides[step];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    setStep(slides.length - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Glassmorphism Card */}
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-contain bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dpm3bum4n/image/upload/v1746289278/fin1_3_febk7z.png')",
        }}
      ></div>
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-10 max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl tracking-tighter text-center text-shadow-2xl drop-shadow-black text-white font-extrabold mb-4 ">
          Student Management System
        </h1>

        <p className="text-lg md:text-sm tracking-widest text-center text-gray-100 mb-8 max-w-lg mx-auto">
          Begin your journey with an interactive introduction flow.
        </p>

        {/* Slide Content with Motion */}
        <div className="min-h-[150px] mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CurrentSlide onNext={handleNext} onSkip={handleSkip} />
            </motion.div>
          </AnimatePresence>
        </div>
        <PaginationDots  total={slides.length} current={step} />

        <div className="flex justify-end ">
          {step < slides.length - 1 ? (
            <button
              onClick={handleNext}
              className="relative w-10 h-10 cursor-pointer ring-black  hover:ring-offset-white ring-4 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-500 to-blue-700 shadow-lg hover:scale-105 transition-transform"
            >
              <ArrowRight className="w-8 h-8  text-white hover:text-black" />
              <span className="absolute inset-0 rounded-full border-1 border-white/30 animate-ping"></span>
            </button>
          ) : (
            <Link
              to="/choose-role"
              className="px-7 py-2 rounded-sm hover:ring-amber-100 ring-1 bg-blue-500 hover:bg-blue-600 text-sm font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              Choose Role
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
