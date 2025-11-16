import React from 'react';

const PrismaticBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-br from-gray-50 to-blue-100">
      <div 
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[40px] opacity-60 animate-[float_20s_ease-in-out_infinite]" 
        style={{ background: 'radial-gradient(circle, #667eea40, transparent 70%)' }} 
      />
      <div 
        className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full blur-[40px] opacity-60 animate-[float_25s_ease-in-out_infinite_5s]" 
        style={{ background: 'radial-gradient(circle, #764ba240, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full blur-[40px] opacity-60 animate-[float_30s_ease-in-out_infinite_10s]" 
        style={{ background: 'radial-gradient(circle, #f093fb40, transparent 70%)' }} 
      />
      <div 
        className="absolute top-[30%] right-[40%] w-[500px] h-[500px] rounded-full blur-[40px] opacity-60 animate-[float_22s_ease-in-out_infinite_15s]" 
        style={{ background: 'radial-gradient(circle, #4facfe40, transparent 70%)' }} 
      />
    </div>
  );
};

export default PrismaticBackground;
