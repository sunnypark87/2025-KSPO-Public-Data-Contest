import { motion } from 'framer-motion';

export const RadarChart = ({ data }) => {
  // 데이터 정규화 (0~100 사이 값으로 가정)
  // 순서: 코어(플랭크), 하체(스쿼트), 유연성(전굴), 지구력(가상), 순발력(가상)
  const stats = [
    data.core || 50,
    data.lowerBody || 50,
    data.flexibility || 50,
    70, // 가상 데이터 (지구력)
    65  // 가상 데이터 (순발력)
  ];

  // 5각형 좌표 계산 함수
  const getPoints = (values, scale = 1) => {
    const angleStep = (Math.PI * 2) / 5;
    return values.map((val, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (val / 100) * 40 * scale; // 반지름 40
      const x = 50 + r * Math.cos(angle);
      const y = 50 + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const polygonPoints = getPoints(stats);
  const bgPoints = getPoints([100, 100, 100, 100, 100]); // 배경 오각형

  return (
    <div className="w-full aspect-square max-w-[200px] mx-auto relative">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        {/* 배경 가이드라인 */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
            <polygon 
                key={scale}
                points={getPoints([100,100,100,100,100], scale)} 
                fill="none" 
                stroke="#E2E8F0" 
                strokeWidth="0.5" 
            />
        ))}
        
        {/* 실제 데이터 차트 */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          points={polygonPoints}
          fill="rgba(37, 99, 235, 0.5)" // blue-600 with opacity
          stroke="#2563EB"
          strokeWidth="2"
        />
      </svg>
      
      {/* 라벨 (절대 위치로 배치) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[10px] text-slate-500 font-bold">코어</div>
      <div className="absolute top-[35%] right-0 translate-x-2 text-[10px] text-slate-500 font-bold">하체</div>
      <div className="absolute bottom-[10%] right-0 text-[10px] text-slate-500 font-bold">유연성</div>
      <div className="absolute bottom-[10%] left-0 text-[10px] text-slate-500 font-bold">지구력</div>
      <div className="absolute top-[35%] left-0 -translate-x-2 text-[10px] text-slate-500 font-bold">순발력</div>
    </div>
  );
};