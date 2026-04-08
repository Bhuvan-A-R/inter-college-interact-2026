import React from "react";
import * as motion from "motion/react-client"

const Presenthomepage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute top-80 left-10 z-10"
    >
      <motion.h1
        className="text-primary_heading bg-clip-text leading-relaxed font-border  font-bold  font-sans text-5xl flex gap-5 flex-col"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg viewBox="0 0 1000 100" className="w-[60rem]" >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            className="text-5xl font-extrabold fill-primary_heading stroke-white stroke-[2px]"
          >
            Global Academy of Technology
            
          </text>
        </svg>

        <svg viewBox="0 0 1000 100" className="w-[60rem]" >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            className="text-5xl font-extrabold fill-primary_heading stroke-white stroke-[2px]"
          >
            Presents
          </text>
        </svg>

        {/*  */}
        <motion.span
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <svg viewBox="0 0 1000 100" className="w-[60rem]" >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            className="text-5xl font-extrabold fill-primary_heading stroke-white stroke-[2px]"
          >
            VTU Youth Fest
          </text>
        </svg>
        </motion.span>
      </motion.h1>
    </motion.div>
  );
};

export default Presenthomepage;
