import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Activity, Ruler, CheckCircle2, Play, Pause, RotateCcw, XCircle, CheckCircle, Volume2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FlexibilityAnimation } from '../visual/FlexibilityAnimation';
import { useExerciseTimer } from '../../hooks/useExerciseTimer';
import { getStandard } from '../../constants/standards';

// [이미지 Import]
import wallSitPic from '../../constants/wall-sit-pic.png';

// ----------------------------------------------------------------------
// [수정된 타이머 컴포넌트] : 가이드 토글 제거 (항상 보임)
// ----------------------------------------------------------------------
const LinearTimer = ({ title, subTitle, duration = 60, bpm = 0, onResult, type, userAge, userGender, guideUrl, precautions }) => {
  const { timeMs, progress, isRunning, isFinished, start, pause, reset } = useExerciseTimer(duration, bpm);
  const [status, setStatus] = useState('idle'); 
  
  // 기준값 가져오기
  const standard = getStandard(type, userAge, userGender);

  // 유튜브 URL 처리
  const getYoutubeEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return null; 
    let videoId = null;
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v');
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
  };

  const isVideo = typeof guideUrl === 'string' && (guideUrl.includes('youtube') || guideUrl.includes('youtu.be'));
  const embedUrl = isVideo ? getYoutubeEmbedUrl(guideUrl) : guideUrl;

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const d = Math.floor((ms % 1000) / 100);
    return `${m}:${s.toString().padStart(2, '0')}.${d}`;
  };

  const handleManualFinish = (isSuccess) => {
    pause(); 
    const finalTime = timeMs;

    if (type === 'squat') {
        setStatus('input_required');
        onResult('INPUT_REQUIRED');
        return;
    }

    setStatus(isSuccess ? 'success' : 'fail');
    onResult(isSuccess ? duration * 1000 : finalTime);
  };

  useEffect(() => {
    if (isFinished && (status === 'idle' || status === 'running')) {
      if(type === 'squat') {
        setStatus('input_required');
        onResult('INPUT_REQUIRED');
      } else {
        setStatus('success');
        onResult(duration * 1000);
      }
    }
  }, [isFinished, status, type, onResult, duration]);

  const handleReset = () => {
    reset();
    setStatus('idle');
    onResult(null);
  };

  const getGoalText = () => {
    if (!standard) return `목표: ${duration}초`;
    if (type === 'squat') return `내 나이 평균: ${standard}회 (60초)`;
    return `내 나이 평균: ${standard}초 버티기`;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-xl flex items-center gap-2">
            {title}
            {bpm > 0 && <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-medium flex items-center gap-1"><Volume2 size={10}/> BPM {bpm}</span>}
          </h4>
          <p className="text-sm text-slate-500 mt-1">{subTitle}</p>
        </div>
        <div>
            {status === 'success' && <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">완료</span>}
            {status === 'fail' && <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">중단</span>}
        </div>
      </div>

      {/* 가이드 영역 (항상 노출) */}
      <div className="mb-6">
        <div className="w-full aspect-video bg-black rounded-xl mb-3 overflow-hidden shadow-sm relative flex items-center justify-center">
                {isVideo ? (
                <iframe 
                    src={embedUrl}
                    title={title}
                    className="w-full h-full"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
                ) : guideUrl ? (
                <img src={guideUrl} alt="운동 자세 가이드" className="w-full h-full object-contain bg-white" />
                ) : (
                <div className="text-slate-400 text-xs">이미지가 없습니다.</div>
                )}
        </div>
        
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">📌 측정 시 주의사항</h5>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                {precautions ? precautions.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                )) : <li>정확한 자세를 유지하며 측정하세요.</li>}
            </ul>
        </div>
      </div>

      {/* 타이머 및 프로그레스 */}
      <div className="mb-6 mt-auto">
        <div className="flex justify-between items-end mb-2">
           <span className="text-5xl font-mono font-black text-slate-800 tracking-wider tabular-nums">
             {formatTime(timeMs)}
           </span>
           <div className="text-right">
             <span className="text-xs font-bold text-slate-400 block">제한시간: {duration}초</span>
             <span className="text-xs text-blue-600 font-bold">{getGoalText()}</span>
           </div>
        </div>
        
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
          <motion.div 
            className={`h-full ${status === 'fail' ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="grid grid-cols-2 gap-3">
        {status === 'idle' && !isRunning && !isFinished && (
          <button onClick={start} className="col-span-2 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98] text-lg shadow-lg shadow-slate-200">
            <Play size={24} fill="currentColor" /> 측정 시작
          </button>
        )}

        {isRunning && !isFinished && (
          <button 
             onClick={() => handleManualFinish(false)} 
             className="col-span-2 py-4 bg-white border-2 border-red-100 text-red-500 rounded-xl font-bold flex items-center justify-center hover:bg-red-50 gap-2"
          >
            <XCircle size={20} /> 측정 종료 (기록 저장)
          </button>
        )}

        {(status === 'success' || status === 'fail' || status === 'input_required') && (
           <button onClick={handleReset} className="col-span-2 py-3 text-slate-500 font-bold hover:text-slate-700 flex items-center justify-center gap-2 border border-slate-200 rounded-xl hover:bg-slate-50">
             <RotateCcw size={18} /> 다시 측정하기
           </button>
        )}
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// [메인 컴포넌트]
// ----------------------------------------------------------------------
export const MeasurementStep = ({ userData, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계 (0 ~ 4)
  const [results, setResults] = useState({
    plank: null,   
    wallSit: null, 
    squat: null,    
    hopping: null, 
    flexibility: 0, 
  });
  
  const [showSquatInput, setShowSquatInput] = useState(false);

  // 각 테스트별 설정 데이터
  const TEST_STEPS = [
    {
        id: 'plank',
        title: '플랭크 (코어)',
        guideUrl: "https://youtu.be/i_TtjVYn9fQ",
        precautions: [
            "엉덩이가 어깨보다 내려가거나 솟지 않도록 일직선을 만드세요.",
            "팔꿈치는 어깨 바로 아래에 위치해야 합니다.",
            "허리 통증이 느껴지면 즉시 중단하세요."
        ]
    },
    {
        id: 'wallSit',
        title: '월시트 (하체 지구력)',
        guideUrl: wallSitPic,
        precautions: [
            "등과 엉덩이를 벽에 완전히 밀착시키세요.",
            "무릎 각도가 90도가 되도록 앉으세요.",
            "손은 허벅지가 아닌 가슴 앞이나 옆으로 두세요."
        ]
    },
    {
        id: 'squat',
        title: '스쿼트 (하체 파워)',
        guideUrl: "https://youtu.be/9jcppMn8oqY",
        precautions: [
            "무릎이 발끝보다 너무 많이 나가지 않도록 주의하세요.",
            "허리는 곧게 펴고 시선은 정면을 유지하세요.",
            "일어날 때 엉덩이에 힘을 주며 완전히 펴주세요."
        ]
    },
    {
        id: 'hopping',
        title: '제자리 뛰기 (순발력)',
        guideUrl: "https://www.youtube.com/watch?v=uy1T5QNARJ4",
        bpm: 160,
        precautions: [
            "BPM 소리에 맞춰 일정한 리듬으로 뛰세요.",
            "착지 시 무릎에 무리가 가지 않도록 사뿐히 뛰세요.",
            "팔은 자연스럽게 앞뒤로 흔들어주세요."
        ]
    },
    {
        id: 'flexibility',
        title: '유연성 (전굴)',
        type: 'manual' // 타이머가 아닌 수동 입력
    }
  ];

  const totalSteps = TEST_STEPS.length;
  const currentTestConfig = TEST_STEPS[currentStep];

  // 현재 단계 완료 여부 확인 (다음 버튼 활성화용)
  const isCurrentStepComplete = () => {
    const val = results[currentTestConfig.id];
    // 유연성은 0일 수도 있으므로 null과 undefined만 체크, 스쿼트는 별도 로직
    if (currentTestConfig.id === 'flexibility') return true; // 유연성은 기본값이 0이므로 항상 통과 가능 (또는 사용자가 조절)
    return val !== null;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
    } else {
        // 마지막 단계면 제출
        onSubmit(results);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    }
  };

  // 기준값 가져오기 (Progress Title용)
  const getStepStandard = (type) => {
    return getStandard(type, userData.age, userData.gender);
  };

  // 스쿼트 입력 핸들러
  const handleSquatResult = (val) => {
    if(val === 'INPUT_REQUIRED' || val >= 60000) {
        setShowSquatInput(true);
    }
  };

  return (
    <div className="pb-10 min-h-[600px] flex flex-col">
      {/* 상단 진행률 표시 */}
      <div className="mb-6 px-1">
        <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-slate-800">🏃 러닝 타입 테스트</h2>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {currentStep + 1} / {totalSteps}
            </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
                className="bg-slate-800 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>
      </div>

      {/* 메인 콘텐츠 영역 (단계별 렌더링) */}
      <div className="flex-1">
        <AnimatePresence mode='wait'>
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
            >
                {/* 1~4. 타이머 기반 테스트 (플랭크, 월시트, 스쿼트, 제자리뛰기) */}
                {currentTestConfig.id !== 'flexibility' && (
                    <div className="h-full">
                        {/* 스쿼트 입력창 예외 처리 */}
                        {currentTestConfig.id === 'squat' && showSquatInput ? (
                             <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-lg h-full flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-center mb-6">스쿼트 횟수 입력</h3>
                                <label className="block text-sm font-bold text-slate-700 mb-2">60초 동안 수행한 횟수는?</label>
                                <div className="flex gap-2 mb-4">
                                    <input 
                                        type="number" 
                                        placeholder="0" 
                                        className="flex-1 p-4 border border-slate-300 rounded-xl text-2xl font-bold outline-blue-500 text-center"
                                        onChange={(e) => setResults(prev => ({ ...prev, squat: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                                <button 
                                    onClick={() => setShowSquatInput(false)} 
                                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700"
                                >
                                    입력 완료
                                </button>
                                {getStepStandard('squat') && <p className="text-xs text-slate-400 mt-4 text-center">※ {userData.age}세 평균: 약 {getStepStandard('squat')}회</p>}
                             </div>
                        ) : currentTestConfig.id === 'squat' && results.squat !== null ? (
                            // 스쿼트 완료 후 결과 표시 화면
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg text-center h-full flex flex-col justify-center items-center">
                                <div className="mb-8">
                                    <p className="text-slate-500 font-bold mb-2">측정 기록</p>
                                    <p className="text-6xl font-black text-blue-600 tracking-tight">{results.squat}<span className="text-3xl ml-2 text-slate-400 font-bold">회</span></p>
                                </div>
                                <button 
                                   onClick={() => {
                                       setResults(prev => ({ ...prev, squat: null }));
                                       setShowSquatInput(false);
                                   }} 
                                   className="py-3 px-6 text-slate-500 font-medium hover:text-slate-700 flex items-center justify-center gap-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <RotateCcw size={18} /> 다시 측정하기
                                </button>
                            </div>
                        ) : (
                            // 일반 타이머 컴포넌트 렌더링
                            <LinearTimer
                                type={currentTestConfig.id}
                                title={currentTestConfig.title}
                                subTitle={`목표: ${getStepStandard(currentTestConfig.id) || 60}${currentTestConfig.id === 'squat' ? '회' : '초'}`}
                                duration={getStandard(currentTestConfig.id, userData.age, userData.gender) || 60}
                                bpm={currentTestConfig.bpm || 0}
                                userAge={userData.age}
                                userGender={userData.gender}
                                guideUrl={currentTestConfig.guideUrl}
                                precautions={currentTestConfig.precautions}
                                onResult={(val) => {
                                    if (currentTestConfig.id === 'squat') handleSquatResult(val);
                                    else setResults(prev => ({ ...prev, [currentTestConfig.id]: val }));
                                }}
                            />
                        )}
                    </div>
                )}

                {/* 5. 유연성 테스트 (슬라이더) */}
                {currentTestConfig.id === 'flexibility' && (
                    <Card title={currentTestConfig.title} icon={<Ruler className="text-pink-500" />}>
                        <div className="mb-6">
                            <FlexibilityAnimation />
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100 mb-6">
                            <p className="font-bold mb-2">💡 측정 팁</p>
                            <ul className="list-disc pl-4 space-y-1 text-xs">
                                <li>반동을 주지 말고 천천히 상체를 숙이세요.</li>
                                <li>무릎이 굽혀지지 않도록 주의하세요.</li>
                                <li>손끝이 발가락을 넘으면 (+), 닿지 않으면 (-) 입니다.</li>
                            </ul>
                        </div>

                        <div className="relative pt-4 px-2 pb-8">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-sm font-bold text-slate-700">측정 결과</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-slate-400">내 나이 평균</span>
                                    <span className="text-sm font-bold text-blue-600">
                                         {getStepStandard('flexibility') ?? '-'} cm
                                    </span>
                                </div>
                            </div>

                            <div className="relative h-10 flex items-center mt-2">
                                <input 
                                    type="range" 
                                    min="-30" 
                                    max="30" 
                                    step="1"
                                    value={results.flexibility}
                                    onChange={(e) => setResults({...results, flexibility: parseInt(e.target.value)})}
                                    className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer z-20 focus:outline-none"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((results.flexibility - (-30)) / 60) * 100}%, #e2e8f0 ${((results.flexibility - (-30)) / 60) * 100}%, #e2e8f0 100%)`
                                    }}
                                />
                                
                                <div 
                                    className="absolute -top-10 -translate-x-1/2 bg-slate-800 text-white text-sm py-1.5 px-3 rounded-lg font-bold shadow-lg pointer-events-none transition-all duration-75 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-slate-800"
                                    style={{ left: `${((results.flexibility - (-30)) / 60) * 100}%` }}
                                >
                                    {results.flexibility > 0 ? `+${results.flexibility}` : results.flexibility} cm
                                </div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                                <span>-30cm</span>
                                <span>0</span>
                                <span>+30cm</span>
                            </div>
                        </div>
                    </Card>
                )}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 네비게이션 버튼 */}
      <div className="mt-6 flex gap-3">
        <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            className="flex-1 py-4 text-slate-500 disabled:opacity-30"
        >
            <ChevronLeft size={20} /> 이전
        </Button>
        
        <Button 
            variant="primary" 
            onClick={handleNext} 
            disabled={!isCurrentStepComplete()}
            className="flex-[2] py-4 text-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none"
        >
            {currentStep === totalSteps - 1 ? (
                <span className="flex items-center gap-2">결과 보기 <CheckCircle2 size={20} /></span>
            ) : (
                <span className="flex items-center gap-2">다음 단계 <ChevronRight size={20} /></span>
            )}
        </Button>
      </div>
    </div>
  );
};