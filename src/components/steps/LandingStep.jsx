import React from 'react';
import { Button } from '../common/Button';

const LandingStep = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-10 animate-fade-in">
        
        {/* 타이틀 영역 */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter">
            Runner-type
          </h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            나만의 <span className="text-blue-600 font-bold">러닝 스타일</span>을 발견하고<br />
            부상 없이 더 멀리 달려보세요.
          </p>
        </div>

        {/* 특징 소개 카드 (Grid) */}
        <div className="grid grid-cols-1 gap-4 w-full px-2">
          <FeatureItem 
            icon="🦶" 
            title="유연성 측정" 
            desc="간단한 동작으로 신체 유연성을 진단합니다." 
          />
          <FeatureItem 
            icon="👟" 
            title="장비 추천" 
            desc="내 발과 주법에 딱 맞는 러닝화를 찾습니다." 
          />
        </div>

        {/* CTA 버튼 */}
        <div className="w-full max-w-sm pt-4 space-y-3">
          <Button 
            onClick={onNext} 
            className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-blue-600 text-white rounded-xl"
          >
            지금 무료로 시작하기
          </Button>
          <p className="text-xs text-gray-400">
            * 약 3분 정도 소요됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// 재사용 가능한 특징 아이템 컴포넌트
const FeatureItem = ({ icon, title, desc }) => (
  <div className="bg-gray-50 p-5 rounded-2xl flex items-start text-left space-x-4 hover:bg-blue-50 transition-colors duration-300">
    <span className="text-3xl bg-white p-2 rounded-lg shadow-sm">{icon}</span>
    <div>
      <h3 className="font-bold text-gray-800 text-base">{title}</h3>
      <p className="text-sm text-gray-500 break-keep mt-1 leading-snug">{desc}</p>
    </div>
  </div>
);

export default LandingStep;