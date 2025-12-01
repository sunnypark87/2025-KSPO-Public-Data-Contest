import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { usePrecisionTimer } from '../../hooks/usePrecisionTimer';

export const StickyTimer = () => {
  const { time, isRunning, toggle, reset } = usePrecisionTimer();

  // 헬퍼 함수: ms -> 00.000 포맷
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor(ms % 1000);
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl mb-6 flex justify-between items-center ring-1 ring-white/10"
    >
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Measurement Timer</span>
        <div className="font-mono text-3xl font-black tracking-widest text-blue-400 tabular-nums">
          {formatTime(time)}<span className="text-sm text-slate-500 ml-1">s</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className={`p-3 rounded-xl transition-all active:scale-95 ${
            isRunning 
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-1 ring-red-500/50' 
            : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
          }`}
        >
          {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
        {!isRunning && time > 0 && (
            <button 
                onClick={reset}
                className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors"
            >
                <RefreshCw size={24} />
            </button>
        )}
      </div>
    </motion.div>
  );
};