import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { CheckCircle, Activity, ShieldCheck, BarChart3, Zap, ChevronRight, X, Info } from 'lucide-react';
// [참조] 전체 유형 데이터와 이미지 로딩 로직을 가져옵니다.
import { RUN_BTI_TYPES } from '../../utils/runBtiLogic';

const btiImages = import.meta.glob('../../assets/runbti/*.png', { eager: true });

const getBtiImage = (btiCode) => {
  const path = `../../assets/runbti/${btiCode}.png`;
  const imageModule = btiImages[path];
  return imageModule?.default || imageModule || null;
};

const LandingStep = ({ onNext }) => {
  // [추가] 모달 상태 관리를 위한 state
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      {/* 1. Hero Section */}
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 pt-12 animate-fade-in bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-tight mb-2">
          <Activity size={14} /> 2025 국민체력100 데이터 기반 분석
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter">
            Runner-type
          </h1>
          <p className="text-xl text-gray-700 font-semibold leading-tight">
            내 몸에 딱 맞는 <span className="text-blue-600 underline underline-offset-4">러닝 스타일</span>을 찾고 계신가요?
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
            간단한 5가지 신체 측정으로 당신의 러닝 MBTI를 확인하고 맞춤형 부상 방지 솔루션을 받아보세요.
          </p>
        </div>

        <div className="w-full max-w-sm pt-4">
          <Button 
            onClick={onNext} 
            className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-blue-600 text-white rounded-2xl"
          >
            3분 만에 진단 시작하기
          </Button>
        </div>
      </div>

      {/* 2. 측정 항목 소개 */}
      <div className="px-6 py-10 space-y-8">
        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={22} /> 어떤 항목을 측정하나요?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <MeasurementItem title="1. 코어 안정성 (플랭크)" desc="상하체 밸런스를 잡아주는 코어 근지구력을 측정합니다." />
          <MeasurementItem title="2. 하체 파워 (스쿼트)" desc="지면을 박차고 나가는 하체의 폭발적인 힘을 진단합니다." />
          <MeasurementItem title="3. 하체 지구력 (월시트)" desc="장거리 러닝 시 피로도를 버텨내는 근력을 테스트합니다." />
          <MeasurementItem title="4. 유연성 (전굴)" desc="근육의 가동범위를 확인하여 부상 위험도를 체크합니다." />
          <MeasurementItem title="5. 리듬 및 탄력 (제자리뛰기)" desc="일정한 BPM에 맞춰 효율적인 착지 리듬을 파악합니다." />
        </div>
      </div>

      {/* 3. 전체 유형 도감: 클릭 시 모달 오픈 */}
      <div className="px-6 py-10 pb-20 space-y-6 bg-slate-50">
        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-800">나의 러닝 캐릭터는?</h2>
          <p className="text-sm text-gray-500 mt-1">캐릭터를 누르면 상세 특징을 볼 수 있습니다.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {['ESFA', 'PSRA', 'EWFA', 'EWRB'].map((code) => (
            <div key={code} onClick={() => setSelectedType({ code, ...RUN_BTI_TYPES[code] })}>
              <TypeCard 
                bti={code} 
                name={RUN_BTI_TYPES[code].name} 
                img={getBtiImage(code)} 
                color={code === 'ESFA' ? 'bg-blue-50' : code === 'PSRA' ? 'bg-red-50' : code === 'EWFA' ? 'bg-green-50' : 'bg-orange-50'} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. 캐릭터 상세 설명 모달 (ResultStep의 로직 활용) */}
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
                   <h2 className="text-4xl font-black text-slate-800 mb-1">{selectedType.code}</h2>
                   <span className="text-xl font-bold text-blue-600">{selectedType.name}</span>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left">
                  <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Info size={18} className="text-blue-500"/> 유형 특징</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedType.feature}</p>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-left">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Activity size={18} className="text-blue-600"/> 추천 러닝 가이드</h3>
                  <p className="text-blue-700 text-sm leading-relaxed font-medium">{selectedType.runningGuide}</p>
                </div>

                <Button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">
                  나도 테스트 해보기
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
  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
      <Zap size={16} className="text-blue-600" />
    </div>
    <div>
      <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{desc}</p>
    </div>
  </div>
);

const TypeCard = ({ bti, name, img, color }) => (
  <div className={`p-6 rounded-[32px] ${color} border border-white shadow-md text-center space-y-3 cursor-pointer hover:scale-105 transition-transform`}>
    <div className="w-28 h-28 mx-auto drop-shadow-xl bg-white/50 rounded-2xl p-2">
      {img ? (
        <img src={img} alt={bti} className="w-full h-full object-contain" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-3xl bg-white/50 rounded-full">🏃</div>
      )}
    </div>
    <div>
      <div className="text-xs font-black text-slate-800 tracking-tighter uppercase">{bti}</div>
      <div className="text-[13px] font-bold text-slate-600 line-clamp-1">{name}</div>
    </div>
  </div>
);

export default LandingStep;