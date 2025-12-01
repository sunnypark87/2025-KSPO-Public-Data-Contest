import { motion } from 'framer-motion';

export const FlexibilityAnimation = () => {
  return (
    <div className="flex justify-center items-center h-32 bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="stroke-slate-800 stroke-2 fill-none stroke-linecap-round stroke-linejoin-round"
      >
        <line x1="10" y1="90" x2="90" y2="90" className="stroke-slate-300" />
        <line x1="30" y1="90" x2="70" y2="90" />
        
        {/* 몸통 */}
        <motion.path
          d="M30 90 L30 50"
          animate={{ d: ["M30 90 L30 50", "M30 90 L60 60", "M30 90 L30 50"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
        
        {/* 팔 */}
        <motion.path
           d="M30 60 L50 60"
           animate={{
             d: ["M30 60 L50 60", "M60 70 L80 80", "M30 60 L50 60"],
             translateX: [0, 10, 0],
             translateY: [0, 10, 0]
           }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
        
        {/* 머리 */}
        <motion.circle 
            cx="30" cy="40" r="8" 
            animate={{ cx: [30, 55, 30], cy: [40, 55, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
      </motion.svg>
    </div>
  );
};