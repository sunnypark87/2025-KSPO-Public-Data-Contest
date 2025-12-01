import { motion } from 'framer-motion';
import { Share2, RefreshCw, ChevronDown, PlayCircle, Trophy, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { RadarChart } from '../visual/RadarChart';

export const ResultStep = ({ userData, measurements, onReset }) => {
  // 점수 계산 (예시 로직)
  const calculateScore = () => {
    const coreScore = Math.min(parseInt(measurements.plank) * 1.5, 100);
    const squatScore = Math.min(parseInt(measurements.squat) * 3, 100);
    const flexScore = Math.min((parseInt(measurements.flexibility) + 15) * 3, 100);
    
    const total = Math.floor((coreScore + squatScore + flexScore) / 3);
    return { total, core: coreScore, lowerBody: squatScore, flexibility: flexScore };
  };

  const scores = calculateScore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-10"
    >
      <div className="text-center space-y-2 mb-2">
        <h2 className="text-3xl font-bold text-slate-800">종합 건강 리포트</h2>
        <p className="text-slate-500">
          <span className="font-semibold text-slate-700">{userData.age}세 {userData.gender}</span> 데이터 기반 분석 결과입니다.
        </p>
      </div>

      {/* --- 상단 메인 섹션 (2열 그리드) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* [왼쪽 열] : 점수 + 상세분석 (세로 배치) */}
        <div className="space-y-4 flex flex-col">
            
            {/* 1. 종합 점수 카드 (Top Left) */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="flex flex-col items-center">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full mb-2">
                        <Trophy size={20} />
                    </div>
                    <span className="text-slate-400 font-bold tracking-widest text-xs uppercase mb-1">Total Score</span>
                    <div className="text-6xl font-black text-slate-800 tracking-tighter mb-2">
                        {scores.total}
                    </div>
                    <div className="px-4 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-100">
                        상위 35% (양호)
                    </div>
                </div>
            </div>

            {/* 2. 상세 분석 (Middle Left) - 왼쪽 아래에 배치 */}
            <Card title="항목별 상세 분석" icon={<ChevronDown className="text-slate-400" />}>
                <div className="space-y-5 py-1">
                    {/* 하체 근력 */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-sm font-bold text-slate-700">
                            <span>하체 근력 (스쿼트 {measurements.squat}회)</span>
                            <span className="text-red-500 text-[10px] bg-red-50 px-1.5 py-0.5 rounded">부족</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${scores.lowerBody}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-red-400 rounded-full" 
                            />
                        </div>
                        <p className="text-[11px] text-slate-400">또래 평균보다 근력이 다소 부족합니다.</p>
                    </div>

                    {/* 코어 안정성 */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-sm font-bold text-slate-700">
                            <span>코어 (플랭크 {measurements.plank}초)</span>
                            <span className="text-blue-500 text-[10px] bg-blue-50 px-1.5 py-0.5 rounded">양호</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${scores.core}%` }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="h-full bg-blue-500 rounded-full" 
                            />
                        </div>
                        <p className="text-[11px] text-slate-400">코어 지구력이 평균 이상입니다.</p>
                    </div>

                    {/* 유연성 */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-sm font-bold text-slate-700">
                            <span>유연성 (전굴 {measurements.flexibility}cm)</span>
                            <span className="text-slate-500 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">보통</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${scores.flexibility}%` }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="h-full bg-slate-400 rounded-full" 
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        {/* [오른쪽 열] : 레이더 차트 (Top Right) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center h-full min-h-[300px]">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 self-start">Balance Chart</h3>
             <div className="w-full flex-1 flex items-center justify-center scale-110">
                <RadarChart data={scores} />
             </div>
        </div>

      </div>

      {/* --- 하단 섹션 (Full Width) --- */}
      {/* 3. AI 맞춤 처방 (Bottom) - 가로로 길게 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
         <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <AlertCircle size={20} />
            </div>
            <h3 className="font-bold text-slate-800">AI 맞춤 처방</h3>
         </div>
         
         <p className="text-sm text-slate-600 mb-6 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            하체 근력이 부족하여 <strong>무릎 관절 부상 위험</strong>이 있습니다. 
            코어 힘을 활용한 하체 강화 운동을 추천합니다.
         </p>
         
         {/* 비디오 리스트 (가로 그리드) */}
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
                { title: "하체 강화 10분 루틴", time: "10:00", desc: "매일 아침 10분 투자" },
                { title: "무릎 통증 예방 스트레칭", time: "15:30", desc: "관절을 보호하는 습관" },
                { title: "코어 & 밸런스 운동", time: "12:00", desc: "전신 균형 잡기" }
            ].map((video, idx) => (
                <div key={idx} className="group cursor-pointer flex flex-col gap-2">
                    <div className="bg-slate-800 aspect-video rounded-xl relative overflow-hidden shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-1">
                        {/* 썸네일 플레이스홀더 */}
                        <img 
                            src={`https://source.unsplash.com/random/400x300?gym,${idx}`} 
                            alt="thumbnail" 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="text-white drop-shadow-lg scale-90 group-hover:scale-110 transition-transform" size={48} />
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                            {video.time}
                        </span>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                            {video.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                            {video.desc}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="flex gap-4 pt-2 max-w-md mx-auto">
        {/* 수정된 부분: 배경색을 bg-slate-100으로 변경하여 잘 보이게 함 */}
        <Button 
            variant="secondary" 
            onClick={onReset} 
            className="flex-1 bg-slate-100 text-slate-600 border-none hover:bg-slate-200 transition-colors"
        >
           <RefreshCw size={18} /> 다시 측정
        </Button>
        <Button variant="primary" className="flex-1 bg-slate-900 shadow-xl shadow-slate-200">
           <Share2 size={18} /> 결과 공유
        </Button>
      </div>
    </motion.div>
  );
};