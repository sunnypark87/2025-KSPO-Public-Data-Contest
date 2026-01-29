import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Activity, BarChart3, Zap, X, Info, Trophy, Target } from 'lucide-react';
// [참조] 전체 유형 데이터와 이미지 로딩 로직
import { RUN_BTI_TYPES } from '../../utils/runBtiLogic';

const btiImages = import.meta.glob('../../assets/runbti/*.png', { eager: true });

const getBtiImage = (btiCode) => {
  const path = `../../assets/runbti/${btiCode}.png`;
  const imageModule = btiImages[path];
  return imageModule?.default || imageModule || null;
};

const LandingStep = ({ onNext }) => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      {/* 1. Hero Section: 문구 보완 */}
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 pt-12 animate-fade-in bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-tight mb-2 shadow-sm border border-blue-200">
          <Activity size={14} /> 2025 국민체력100 빅데이터 기반
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter">
            Runner-Type
          </h1>
          <p className="text-xl text-slate-800 font-bold leading-tight">
            무작정 달리면 다칩니다.<br/>
            <span className="text-blue-600">내 몸을 알고 뛰는</span> 스마트한 러너.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            국가대표급 스포츠 과학 데이터로 당신의 신체 능력을 분석하고, 16가지 러닝 유형 중 꼭 맞는 스타일을 찾아드려요.
          </p>
        </div>

        <div className="w-full max-w-sm pt-6">
          <Button 
            onClick={onNext} 
            className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-blue-600 text-white rounded-2xl"
          >
            3분 만에 내 러닝 타입 진단하기
          </Button>
          <p className="text-[10px] text-slate-400 mt-3">
            * 별도의 기구 없이 맨몸으로 측정 가능합니다.
          </p>
        </div>
      </div>

      {/* 2. 측정 항목 소개: 러닝과의 연관성 강조 */}
      <div className="px-6 py-10 space-y-8">
        <div className="text-left">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={20} /> 무엇을 분석하나요?
          </h2>
          <p className="text-xs text-slate-500 mt-1 pl-1">달리기에 필수적인 5가지 핵심 능력을 측정합니다.</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <MeasurementItem 
            title="1. 코어 안정성 (플랭크)" 
            desc="러닝 후반부까지 자세가 무너지지 않도록 지탱해주는 상·하체 중심 근력을 확인합니다." 
          />
          <MeasurementItem 
            title="2. 하체 파워 (스쿼트)" 
            desc="지면을 강하게 차고 나가는 추진력(Kick)과 오르막을 오르는 폭발적인 힘을 진단합니다." 
          />
          <MeasurementItem 
            title="3. 하체 지구력 (월시트)" 
            desc="장거리 주행 시 하체에 쌓이는 피로를 견디며 페이스를 유지하는 버티는 힘을 테스트합니다." 
          />
          <MeasurementItem 
            title="4. 유연성 (전굴)" 
            desc="부상을 방지하고 더 넓고 시원한 보폭(Stride)을 만들어낼 수 있는 근육의 유연함을 체크합니다." 
          />
          <MeasurementItem 
            title="5. 리듬 및 탄력 (제자리뛰기)" 
            desc="지면 충격을 흡수하고 에너지를 효율적으로 사용하는 탄력과 케이던스 리듬감을 파악합니다." 
          />
        </div>
      </div>

      {/* 3. 전체 유형 도감: 설명 보완 */}
      <div className="px-6 py-10 pb-20 space-y-6 bg-slate-50 border-t border-slate-100">
        <div className="text-left">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <Trophy className="text-yellow-500" size={20}/> 16가지 러닝 페르소나
          </h2>
          <p className="text-xs text-slate-500 mt-1 pl-1">
            당신은 '육각형 마라토너'일까요, 아니면 '성난 황소'일까요?<br/>
            캐릭터를 눌러 미리 확인해보세요.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {['ESFA', 'PSRA', 'EWFA', 'EWRB'].map((code) => (
            <div key={code} onClick={() => setSelectedType({ code, ...RUN_BTI_TYPES[code] })}>
              <TypeCard 
                bti={code} 
                name={RUN_BTI_TYPES[code].name} 
                img={getBtiImage(code)} 
                color={code.startsWith('P') ? 'bg-red-50' : code.startsWith('E') ? 'bg-blue-50' : 'bg-slate-100'} 
              />
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-slate-400 mt-4">
            ...외 12가지 유형이 더 있어요!
        </div>
      </div>

      {/* 4. 캐릭터 상세 설명 모달 */}
      <AnimatePresence>
        {selectedType && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedType(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedType(null)} className="absolute top-5 right-5 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X size={20} className="text-slate-600" />
              </button>

              <div className="text-center space-y-6">
                <div className="w-40 h-40 mx-auto relative filter drop-shadow-2xl">
                    <img src={getBtiImage(selectedType.code)} alt={selectedType.code} className="w-full h-full object-contain" />
                </div>

                <div>
                   <h2 className="text-4xl font-black text-slate-800 mb-1 tracking-tighter">{selectedType.code}</h2>
                   <span className="text-xl font-bold text-blue-600">{selectedType.name}</span>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left">
                  <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm"><Info size={16} className="text-blue-500"/> 유형 특징</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedType.feature}</p>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-left">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2 text-sm"><Target size={16} className="text-blue-600"/> 추천 가이드</h3>
                  <p className="text-blue-700 text-sm leading-relaxed font-medium">{selectedType.runningGuide}</p>
                </div>

                <Button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  이 유형, 나일까? 확인하기
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MeasurementItem = ({ title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-blue-200 transition-colors">
    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
      <Zap size={20} />
    </div>
    <div>
      <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed word-keep-all">{desc}</p>
    </div>
  </div>
);

const TypeCard = ({ bti, name, img, color }) => (
  <div className={`p-5 rounded-[24px] ${color} border border-white/50 shadow-sm text-center space-y-3 cursor-pointer hover:scale-102 hover:shadow-md transition-all active:scale-95`}>
    <div className="w-24 h-24 mx-auto drop-shadow-md bg-white/60 rounded-full p-2 flex items-center justify-center">
      {img ? (
        <img src={img} alt={bti} className="w-full h-full object-contain" />
      ) : (
        <span className="text-3xl">🏃</span>
      )}
    </div>
    <div>
      <div className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-0.5">TYPE</div>
      <div className="text-base font-black text-slate-800 tracking-tight">{bti}</div>
      <div className="text-xs font-bold text-slate-600 line-clamp-1 mt-1">{name}</div>
    </div>
  </div>
);

export default LandingStep;