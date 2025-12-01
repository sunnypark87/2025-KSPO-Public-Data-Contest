import { useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Activity, Ruler, CheckCircle2 } from 'lucide-react';
import { StickyTimer } from '../visual/StickyTimer';
import { FlexibilityAnimation } from '../visual/FlexibilityAnimation';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const MeasurementStep = ({ userData, onSubmit }) => {
  const [measurements, setMeasurements] = useState({
    plank: '',
    squat: '',
    flexibility: 0, 
  });

  const isComplete = measurements.plank && measurements.squat;

  const handleInputChange = (field, value) => {
    const intValue = value.replace(/[^0-9]/g, '');
    setMeasurements(prev => ({ ...prev, [field]: intValue }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 pb-10"
    >
      <StickyTimer />

      <div className="px-1 mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-1">체력 측정</h2>
        <p className="text-sm text-slate-500">
          상단의 타이머를 활용하여<br/>각 항목을 측정하고 기록하세요.
        </p>
      </div>

      <Card title="플랭크 (코어)" icon={<Timer className="text-blue-500" />}>
        <p className="text-sm text-slate-500 mb-4">가능한 오래 버틴 시간을 기록하세요.</p>
        <div className="relative">
            <input
              type="tel"
              pattern="[0-9]*"
              placeholder="0"
              value={measurements.plank}
              onChange={(e) => handleInputChange('plank', e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-right pr-12 text-2xl font-bold text-slate-800 focus:outline-blue-500 transition-colors placeholder:text-slate-300"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">초</span>
        </div>
      </Card>

      <Card title="스쿼트 (하체)" icon={<Activity className="text-green-500" />}>
        <p className="text-sm text-slate-500 mb-4">30초 동안 실시한 횟수를 기록하세요.</p>
        <div className="relative">
            <input
              type="tel"
              pattern="[0-9]*"
              placeholder="0"
              value={measurements.squat}
              onChange={(e) => handleInputChange('squat', e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-right pr-12 text-2xl font-bold text-slate-800 focus:outline-blue-500 transition-colors placeholder:text-slate-300"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">회</span>
        </div>
      </Card>

      <Card title="전굴 (유연성)" icon={<Ruler className="text-purple-500" />}>
        <p className="text-sm text-slate-500 mb-4">앉아서 다리를 펴고 굽힌 거리를 측정하세요.</p>
        <FlexibilityAnimation />
        <div className="relative pt-8 pb-2 px-2">
            {/* 말풍선 위치 계산 로직 수정: -30 ~ +30 (총 범위 60) */}
            <motion.div 
                className="absolute top-0 left-0 bg-slate-800 text-white text-xs py-1 px-3 rounded-full font-bold shadow-lg z-10"
                style={{ 
                    // (현재값 - 최소값) / 전체범위 * 100
                    left: `calc(${((measurements.flexibility - (-30)) / 60) * 100}% - 1.5rem)` 
                }}
            >
                {measurements.flexibility > 0 ? `+${measurements.flexibility}` : measurements.flexibility} cm
            </motion.div>
            
            <input 
                type="range" 
                min="-30" 
                max="30" 
                step="1"
                value={measurements.flexibility}
                onChange={(e) => setMeasurements({...measurements, flexibility: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 hover:accent-purple-500 transition-all"
            />
            
            <div className="flex justify-between text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-wider">
                <span>-30cm</span>
                <span>0</span>
                <span>+30cm</span>
            </div>
        </div>
      </Card>

      <Button
        variant="primary"
        disabled={!isComplete}
        onClick={() => onSubmit(measurements)}
      >
        진단 결과 보기 <CheckCircle2 size={20} />
      </Button>
    </motion.div>
  );
};