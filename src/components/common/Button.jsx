export const Button = ({ children, disabled, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30 hover:scale-[1.01]",
    disabled: "bg-slate-300 text-slate-500 cursor-not-allowed active:scale-100",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl"
  };

  const currentStyle = disabled ? variants.disabled : variants[variant];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${currentStyle} ${className}`}
    >
      {children}
    </button>
  );
};