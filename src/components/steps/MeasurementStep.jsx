import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Activity, Ruler, CheckCircle2, Play, Pause, RotateCcw, XCircle, CheckCircle, Volume2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FlexibilityAnimation } from '../visual/FlexibilityAnimation';
import { useExerciseTimer } from '../../hooks/useExerciseTimer';
import { getStandard } from '../../constants/standards';

// [이미지 Import] constants 폴더의 월시트 사진 가져오기
import wallSitPic from '../../constants/wall-sit-pic.png';

// [타이머 컴포넌트] (수정 없음)
const LinearTimer = ({ title, subTitle, duration = 60, bpm = 0, onResult, type, userAge, userGender, guideUrl, precautions }) => {
  const { timeMs, progress, isRunning, isFinished, start, pause, reset } = useExerciseTimer(duration, bpm);
  const [status, setStatus] = useState('idle'); 
  const [showGuide, setShowGuide] = useState(false);

  // [수정] 성별 정보 전달
  const standard = getStandard(type, userAge, userGender);

  // 유튜브 URL 판별 및 변환
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
    <div className="bg-white rounded-2xl p-5 mb-6 border border-slate-100 shadow-lg relative overflow-hidden transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            {title}
            {bpm > 0 && <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-medium flex items-center gap-1"><Volume2 size={10}/> BPM {bpm}</span>}
          </h4>
          <p className="text-xs text-slate-400 mt-1">{subTitle}</p>
        </div>
        {status === 'success' && <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Pass</span>}
        {status === 'fail' && <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Fail</span>}
      </div>

      <div className="mb-4">
        <button 
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg w-full justify-center"
        >
            <Info size={14} />
            {showGuide ? '측정 가이드 닫기' : '자세 가이드 & 주의사항 보기'}
            {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <AnimatePresence>
            {showGuide && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pt-3 pb-1">
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
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
           <span className="text-4xl font-mono font-black text-slate-800 tracking-wider tabular-nums">
             {formatTime(timeMs)}
           </span>
           <div className="text-right">
             <span className="text-xs font-bold text-slate-400 block">제한시간: {duration}초</span>
             <span className="text-[11px] text-blue-600 font-bold">{getGoalText()}</span>
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

      <div className="grid grid-cols-2 gap-3">
        {/* Case 1: Initial state, ready to start */}
        {status === 'idle' && !isRunning && !isFinished && (
          <button onClick={start} className="col-span-2 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]">
            <Play size={20} fill="currentColor" /> 측정 시작
          </button>
        )}

        {/* Case 2: Timer is actively running */}
        {isRunning && !isFinished && (
          <button 
             onClick={() => handleManualFinish(false)} 
             className="col-span-2 py-3 bg-white border-2 border-red-100 text-red-500 rounded-xl font-bold flex flex-col items-center justify-center hover:bg-red-50"
          >
            <XCircle size={20} /> <span className="text-xs mt-1">측정 종료</span>
          </button>
        )}
        {/*
        { Case 3: Timer is paused }
        {!isRunning && !isFinished && status === 'idle' && (
          <>
             <div className="col-span-2 flex gap-2 mb-2">
                <button onClick={start} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200">
                   <Play size={20} /> 계속하기
                </button>
                <button 
                    onClick={() => handleManualFinish(false)} 
                    className="flex-1 py-3 bg-white border-2 border-red-100 text-red-500 rounded-xl font-bold flex flex-col items-center justify-center hover:bg-red-50"
                >
                    <XCircle size={20} /> <span className="text-xs mt-1">실패/포기</span>
                </button>
                {type === 'squat' && (
                    <button onClick={() => handleManualFinish(true)} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold flex flex-col items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-200">
                      <CheckCircle size={20} /> <span className="text-xs mt-1">완료 (입력)</span>
                    </button>
                 )}
            </div>
          </>
        )}*/}

        {/* Case 4: Timer finished, or manually failed/succeeded, or input required */}
        {(status === 'success' || status === 'fail' || status === 'input_required') && (
           <button onClick={handleReset} className="col-span-2 py-3 text-slate-400 text-sm font-medium hover:text-slate-600 flex items-center justify-center gap-2 border border-slate-200 rounded-xl hover:bg-slate-50">
             <RotateCcw size={16} /> 재측정
           </button>
        )}
      </div>
    </div>
  );
};

export const MeasurementStep = ({ userData, onSubmit }) => {
  const [results, setResults] = useState({
    plank: null,   
    wallSit: null, 
    squat: null,    
    hopping: null, 
    flexibility: 0, 
  });
  
  const [showSquatInput, setShowSquatInput] = useState(false);

  const isComplete = results.plank !== null && results.wallSit !== null && 
                     results.squat !== null && results.hopping !== null;

  // [수정] 성별(userData.gender) 정보 추가 전달
  const flexStandard = getStandard('flexibility', userData.age, userData.gender);
  const squatStandard = getStandard('squat', userData.age, userData.gender);
  const plankStandard = getStandard('plank', userData.age, userData.gender);
  const wallSitStandard = getStandard('wallSit', userData.age, userData.gender);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 pb-10">
      <div className="px-1 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">🏃 러닝 타입 테스트</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          측정 중 <span className="text-red-500 font-bold">측정 종료</span> 버튼을 누르면<br/>
          현재까지의 기록이 자동으로 저장됩니다.
        </p>
      </div>

      <section>
          <LinearTimer 
            title="1. 플랭크 (코어)" 
            subTitle={`목표 시간: ${plankStandard || 60}초 버티기`}
            duration={plankStandard || 60}
            type="plank"
            userAge={userData.age}
            userGender={userData.gender} // [수정] 성별 전달
            onResult={(val) => setResults(prev => ({ ...prev, plank: val }))} 
            guideUrl="https://youtu.be/i_TtjVYn9fQ"
            precautions={[
                "엉덩이가 어깨보다 내려가거나 솟지 않도록 일직선을 만드세요.",
                "팔꿈치는 어깨 바로 아래에 위치해야 합니다.",
                "허리 통증이 느껴지면 즉시 중단하세요."
            ]}
          />
      </section>

      <section>
          <LinearTimer 
            title="2. 월시트 (하체 지구력)" 
            subTitle={`목표 시간: ${wallSitStandard || 60}초 버티기`}
            duration={wallSitStandard || 60}
            type="wallSit"
            userAge={userData.age}
            userGender={userData.gender} // [수정] 성별 전달
            onResult={(val) => setResults(prev => ({ ...prev, wallSit: val }))} 
            guideUrl={wallSitPic} 
            precautions={[
                "등과 엉덩이를 벽에 완전히 밀착시키세요.",
                "무릎 각도가 90도가 되도록 앉으세요.",
                "손은 허벅지가 아닌 가슴 앞이나 옆으로 두세요."
            ]}
          />
      </section>

      <section>
          <div className="flex items-center justify-between mb-2 px-1">
             <h3 className="font-bold text-slate-800">3. 스쿼트 (하체 파워)</h3>
             {results.squat !== null && <span className="text-blue-600 font-bold">{results.squat}회</span>}
          </div>
          
          {showSquatInput ? (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md">
                <label className="block text-sm font-bold text-slate-700 mb-2">수행한 횟수는?</label>
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        placeholder="0" 
                        className="flex-1 p-3 border border-slate-300 rounded-xl text-lg font-bold outline-blue-500 min-w-0"
                        onChange={(e) => setResults(prev => ({ ...prev, squat: parseInt(e.target.value) || 0 }))}
                    />
                    <button onClick={() => setShowSquatInput(false)} className="bg-blue-600 text-white px-6 rounded-xl font-bold whitespace-nowrap">확인</button>
                </div>
                {squatStandard && <p className="text-xs text-slate-400 mt-2">※ {userData.age}세 평균: 약 {squatStandard}회</p>}
             </motion.div>
          ) : results.squat !== null ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg text-center">
                <div className="mb-4">
                    <p className="text-sm text-slate-400 font-bold mb-1">측정 기록</p>
                    <p className="text-5xl font-black text-blue-600 tracking-tight">{results.squat}<span className="text-2xl ml-1 text-slate-400 font-bold">회</span></p>
                </div>
                <button 
                   onClick={() => setResults(prev => ({ ...prev, squat: null }))} 
                   className="w-full py-3 text-slate-400 text-sm font-medium hover:text-slate-600 flex items-center justify-center gap-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                    <RotateCcw size={16} /> 재측정
                </button>
            </div>
          ) : (
             <LinearTimer 
                title="스쿼트 타이머" 
                subTitle="60초 동안 가능한 많은 횟수를 수행하세요."
                duration={60}
                type="squat"
                userAge={userData.age}
                userGender={userData.gender} // [수정] 성별 전달
                onResult={(val) => {
                    if(val === 'INPUT_REQUIRED' || val >= 60000) setShowSquatInput(true);
                }}
                guideUrl="https://youtu.be/9jcppMn8oqY" 
                precautions={[
                    "무릎이 발끝보다 너무 많이 나가지 않도록 주의하세요.",
                    "허리는 곧게 펴고 시선은 정면을 유지하세요.",
                    "일어날 때 엉덩이에 힘을 주며 완전히 펴주세요."
                ]}
             />
          )}
      </section>

      <section>
          <LinearTimer 
            title="4. 제자리 뛰기 (순발력)" 
            subTitle="160 BPM 박자에 맞춰 가볍게 뛰세요."
            duration={60}
            bpm={160}
            type="hopping"
            userAge={userData.age}
            userGender={userData.gender} // [수정] 성별 전달
            onResult={(val) => setResults(prev => ({ ...prev, hopping: val }))} 
            guideUrl="https://www.youtube.com/watch?v=uy1T5QNARJ4"
            precautions={[
                "BPM 소리에 맞춰 일정한 리듬으로 뛰세요.",
                "착지 시 무릎에 무리가 가지 않도록 사뿐히 뛰세요.",
                "팔은 자연스럽게 앞뒤로 흔들어주세요."
            ]}
          />
      </section>

      <section>
          <Card title="5. 유연성 (전굴)" icon={<Ruler className="text-pink-500" />}>
            <div className="mb-4">
                <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 border border-slate-100">
                     <p className="font-bold mb-1">💡 측정 팁</p>
                     <ul className="list-disc pl-4 space-y-1">
                        <li>반동을 주지 말고 천천히 상체를 숙이세요.</li>
                        <li>무릎이 굽혀지지 않도록 주의하세요.</li>
                     </ul>
                </div>
            </div>

            <FlexibilityAnimation />
            
            <div className="relative pt-8 pb-4 px-2">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-xs text-slate-500 font-medium">손끝이 발가락을 넘으면 (+)</span>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400">내 나이 평균</span>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                             {flexStandard ?? '-'} cm
                        </span>
                    </div>
                </div>

                <div className="relative h-6 flex items-center mt-2">
                    <input 
                        type="range" 
                        min="-30" 
                        max="30" 
                        step="1"
                        value={results.flexibility}
                        onChange={(e) => setResults({...results, flexibility: parseInt(e.target.value)})}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer z-20 focus:outline-none"
                        style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((results.flexibility - (-30)) / 60) * 100}%, #e2e8f0 ${((results.flexibility - (-30)) / 60) * 100}%, #e2e8f0 100%)`
                        }}
                    />
                    
                    <div 
                        className="absolute -top-9 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded font-bold pointer-events-none transition-all duration-75"
                        style={{ left: `${((results.flexibility - (-30)) / 60) * 100}%` }}
                    >
                        {results.flexibility > 0 ? `+${results.flexibility}` : results.flexibility} cm
                    </div>
                </div>
                
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium uppercase">
                    <span>-30cm</span>
                    <span>0</span>
                    <span>+30cm</span>
                </div>
            </div>
          </Card>
      </section>

      <Button
        variant="primary"
        disabled={!isComplete}
        onClick={() => {
            window.scrollTo(0, 0); 
            onSubmit(results);
        }}
        className="w-full py-4 text-lg shadow-xl shadow-blue-500/20"
      >
        진단 결과 보기 <CheckCircle2 size={24} />
      </Button>
    </motion.div>
  );
};