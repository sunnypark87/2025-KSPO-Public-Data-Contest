import { motion } from 'framer-motion';

export const Card = ({ title, icon, children }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 transition-shadow hover:shadow-md"
  >
    <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-700">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </motion.div>
);