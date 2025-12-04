import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RefreshCw, Trophy, AlertTriangle, CheckCircle, Info, Activity, Zap, Shield, Move, X, ChevronRight, PlayCircle, Grid, User } from 'lucide-react';
import { Button } from '../common/Button';
import { analyzeRunBTI, RUN_BTI_TYPES } from '../../utils/runBtiLogic'; 
import { getRecommendedExercises } from '../../data/exerciseDatabase';

// 능력치 막대 그래프 컴포넌트
const AbilityBar = ({ label, score, icon, colorClass, bgClass, barColor }) => {
    const safeScore = (score && !isNaN(score)) ? Math.round(score) : 0;
    
    let status = '노력 필요';
    if (safeScore >= 80) status = '매우 우수';
    else if (safeScore >= 60) status = '우수';
    else if (safeScore >= 40) status = '평균';
    else if (safeScore >= 20) status = '보통';

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                    <div className={`p-1.5 rounded-lg ${bgClass} ${colorClass}`}>
                        {icon}
                    </div>
                    {label}
                </div>
                <div className="text-xs font-medium text-slate-500">
                    <span className={`font-bold text-sm ${colorClass}`}>{safeScore}</span>
                    <span className="text-[10px] text-slate-400 ml-1">/ {status}</span>
                </div>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${safeScore}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className={`h-full rounded-full ${barColor}`} />
            </div>
        </div>
    );
};

export const ResultStep = ({ userData, measurements, onReset }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState('MY_RESULT'); 
  const [selectedType, setSelectedType] = useState(null); 
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 데이터 분석
  const analysisResult = analyzeRunBTI(measurements || {}, userData?.age) || {};
  
  const { 
    bti = '----', 
    result: btiInfo = { name: '분석 중...', desc: '데이터를 분석하고 있습니다.', tags: [] }, 
    chartScores = { power: 0, core: 0, flexibility: 0, agility: 0 }, 
    prescription = [] 
  } = analysisResult;

  let weaknessType = 'ALL_GOOD';
  if (bti && bti.includes('W')) weaknessType = 'W'; 
  else if (bti && bti.includes('R')) weaknessType = 'R'; 
  else if (bti && bti.includes('B')) weaknessType = 'B'; 
  else if (bti && bti.includes('P')) weaknessType = 'P_WEAK_CORE'; 
  
  const recommendedVideos = getRecommendedExercises(weaknessType) || [];

  const getThumbnail = (url) => {
      if (!url) return ''; 
      try {
          const id = url.split('/').pop();
          return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
      } catch (e) {
          return '';
      }
  };

  const genderRaw = userData?.gender ? String(userData.gender).toUpperCase() : 'M';
  const genderDisplay = (genderRaw === 'M' || genderRaw === 'MALE' || genderRaw === '남성') ? '남성' : '여성';

  const closeDetailModal = () => {
      setShowDetail(false);
      setActiveTab('MY_RESULT');
      setSelectedType(null);
  };

  // [NEW] 클립보드 복사 기능 구현
  const handleShare = async () => {
    const shareText = `🏃‍♂️ RunBTI 러닝 성향 분석 결과\n\n나의 유형: [${bti}] ${btiInfo.name}\n특징: "${btiInfo.desc}"\n\n나에게 딱 맞는 러닝 가이드와 운동 처방이 궁금하다면?\n👉 ${window.location.href} #RunBTI #러닝분석`;

    try {
        await navigator.clipboard.writeText(shareText);
        alert("결과가 클립보드에 복사되었습니다! \n인스타그램, 카카오톡 등에 붙여넣기(Ctrl+V) 하여 공유해보세요.");
    } catch (err) {
        console.error("복사 실패:", err);
        alert("브라우저가 클립보드 복사를 지원하지 않습니다.");
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 pb-10">
        <div className="text-center space-y-2 mb-2">
          <h2 className="text-2xl font-bold text-slate-800">RunBTI 분석 리포트</h2>
          <p className="text-slate-500 text-sm">
            <span className="font-semibold text-slate-700">{userData?.age || 20}세 {genderDisplay}</span> 데이터 기반 분석 결과
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* [왼쪽] RunBTI 결과 카드 */}
          <div className="space-y-4 flex flex-col h-full">
              <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDetail(true)}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-xl text-center relative overflow-hidden text-white cursor-pointer group flex-1 flex flex-col justify-center items-center min-h-[340px]"
              >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/30 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col items-center w-full">
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10 shadow-sm">
                          My RunBTI <ChevronRight size={12} />
                      </div>
                      
                      <h1 className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2 drop-shadow-sm">
                          {bti}
                      </h1>
                      
                      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                          {btiInfo.name}
                      </h2>
                      
                      <p className="text-slate-300 text-sm leading-relaxed max-w-[90%] mb-6 line-clamp-3">
                          {btiInfo.desc}
                      </p>

                      <div className="w-full pt-4 border-t border-white/10 mt-auto">
                          <div className="flex justify-center gap-2">
                              {btiInfo.tags && btiInfo.tags.slice(0, 2).map((tag, i) => (
                                  <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded text-blue-200">
                                      #{tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
              </motion.div>
          </div>

          {/* [오른쪽] 상세 분석 (막대 그래프) */}
          <div className="flex flex-col h-full">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center h-full min-h-[340px]">
                   <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                       <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                           <Activity size={20} />
                       </div>
                       <div>
                           <h3 className="text-lg font-bold text-slate-800">신체 능력 상세 분석</h3>
                           <span className="text-[11px] text-slate-400">평균(50점) 기준 상대 평가</span>
                       </div>
                   </div>
                   
                   <div className="space-y-2">
                        <AbilityBar label="POWER (힘)" score={chartScores?.power || 0} icon={<Zap size={14}/>} colorClass="text-red-500" bgClass="bg-red-50" barColor="bg-red-500" />
                        <AbilityBar label="CORE (코어)" score={chartScores?.core || 0} icon={<Shield size={14}/>} colorClass="text-blue-500" bgClass="bg-blue-50" barColor="bg-blue-500" />
                        <AbilityBar label="FLEXIBLE (유연성)" score={chartScores?.flexibility || 0} icon={<Move size={14}/>} colorClass="text-purple-500" bgClass="bg-purple-50" barColor="bg-purple-500" />
                        <AbilityBar label="RHYTHM (리듬/순발력)" score={chartScores?.agility || 0} icon={<Activity size={14}/>} colorClass="text-yellow-600" bgClass="bg-yellow-50" barColor="bg-yellow-500" />
                   </div>
              </div>
          </div>
        </div>

        {/* [하단] 약점 별 상세 가이드 + 영상 통합 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
           <div className="flex items-center gap-2 mb-6 justify-between">
              <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                      <PlayCircle size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">닥터의 약점 처방 & 운동</h3>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded">국민체력100 추천</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prescription && prescription.length > 0 ? (
                  prescription.map((item, idx) => {
                      const videos = getRecommendedExercises(item.weaknessCode || 'ALL_GOOD');
                      const recommendedVideo = videos && videos.length > 0 ? videos[0] : null;

                      return (
                          <div key={idx} className={`p-5 rounded-2xl border flex flex-col gap-4 ${item.type === 'success' ? 'bg-green-50 border-green-100' : item.type === 'danger' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                              <div>
                                  <div className="flex items-start gap-3 mb-2">
                                      {item.type === 'success' ? <CheckCircle className="text-green-500 shrink-0" size={20}/> : <AlertTriangle className={`${item.type === 'danger' ? 'text-red-500' : 'text-orange-500'} shrink-0`} size={20}/>}
                                      <h4 className={`font-bold ${item.type === 'danger' ? 'text-red-700' : 'text-slate-700'}`}>{item.title}</h4>
                                  </div>
                                  <p className="text-sm text-slate-600 mb-2 leading-relaxed pl-8">
                                      {item.msg}
                                  </p>
                                  <div className="ml-8 text-xs font-bold text-blue-600">
                                      💪 솔루션: {item.solution}
                                  </div>
                              </div>

                              {recommendedVideo && (
                                  <div onClick={() => setSelectedVideo(recommendedVideo)} className="ml-8 mt-2 bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group flex items-center gap-3 pr-3 hover:border-blue-300 transition-colors">
                                      <div className="w-20 h-14 bg-slate-200 relative shrink-0">
                                          <img src={getThumbnail(recommendedVideo.videoUrl)} alt={recommendedVideo.name} className="w-full h-full object-cover" />
                                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10"><PlayCircle className="text-white drop-shadow-md" size={20} /></div>
                                      </div>
                                      <div className="flex-1 min-w-0 py-2">
                                          <div className="text-[10px] text-blue-500 font-bold mb-0.5">추천 운동</div>
                                          <div className="text-xs font-bold text-slate-700 truncate">{recommendedVideo.name}</div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      );
                  })
              ) : (
                  <div className="col-span-2 text-center py-10 text-slate-400">
                      분석 결과가 없습니다.
                  </div>
              )}
           </div>
        </div>

        <div className="flex gap-4 pt-2 max-w-md mx-auto">
          <Button variant="secondary" onClick={onReset} className="flex-1 bg-slate-100 text-slate-600 border-none hover:bg-slate-200 transition-colors">
             <RefreshCw size={18} /> 다시 측정
          </Button>
          
          {/* 공유 버튼 연결 */}
          <Button variant="primary" onClick={handleShare} className="flex-1 bg-slate-900 shadow-xl shadow-slate-200">
             <Share2 size={18} /> 결과 공유
          </Button>
        </div>
      </motion.div>

      {/* [통합 모달] 내 결과 & 유형 도감 */}
      <AnimatePresence>
        {showDetail && btiInfo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeDetailModal}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative mt-10 mb-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeDetailModal} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10">
                <X size={20} className="text-slate-600" />
              </button>

              <div className="flex gap-2 mb-6 border-b border-slate-100 pb-1">
                  <button 
                    onClick={() => { setActiveTab('MY_RESULT'); setSelectedType(null); }}
                    className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'MY_RESULT' ? 'text-slate-800 border-b-2 border-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                      <User size={16}/> 내 분석 결과
                  </button>
                  <button 
                    onClick={() => setActiveTab('ALL_TYPES')}
                    className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'ALL_TYPES' ? 'text-slate-800 border-b-2 border-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                      <Grid size={16}/> 전체 유형 도감
                  </button>
              </div>

              {activeTab === 'MY_RESULT' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="text-center mb-6">
                         <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">My RunBTI Code</span>
                         <h2 className="text-4xl font-black text-slate-800 mb-1">{bti}</h2>
                         <span className="text-xl font-bold text-slate-500">{btiInfo.name}</span>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Info size={18} className="text-blue-500"/> 유형 특징</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{btiInfo.feature}</p>
                      </div>
                      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Activity size={18} className="text-blue-600"/> 추천 러닝 가이드</h3>
                        <p className="text-blue-700 text-sm leading-relaxed font-medium">{btiInfo.runningGuide}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                          <p className="text-xs text-slate-400 mb-2">이 유형의 키워드</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                              {btiInfo.tags && btiInfo.tags.map((tag, i) => (
                                  <span key={i} className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600">#{tag}</span>
                              ))}
                          </div>
                      </div>
                  </motion.div>
              )}

              {activeTab === 'ALL_TYPES' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {!selectedType ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                              {Object.entries(RUN_BTI_TYPES).map(([code, info]) => (
                                  <div key={code} onClick={() => setSelectedType({ code, ...info })} className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-105 hover:shadow-md text-center flex flex-col justify-center min-h-[100px] ${code === bti ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100' : 'bg-white border-slate-200 hover:border-blue-200'}`}>
                                      <div className={`font-black text-lg mb-1 ${code === bti ? 'text-blue-600' : 'text-slate-700'}`}>{code}</div>
                                      <div className="text-[10px] text-slate-500 line-clamp-2 leading-tight">{info.name}</div>
                                      {code === bti && <div className="mt-2 text-[9px] bg-blue-100 text-blue-600 rounded px-1 py-0.5 inline-block w-fit mx-auto">나의 유형</div>}
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="space-y-6">
                              <button onClick={() => setSelectedType(null)} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 mb-2">
                                  <ChevronRight size={14} className="rotate-180"/> 목록으로 돌아가기
                              </button>
                              <div className="text-center">
                                 <h2 className="text-3xl font-black text-slate-800 mb-1">{selectedType.code}</h2>
                                 <span className="text-xl font-bold text-slate-500">{selectedType.name}</span>
                              </div>
                              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-2">유형 특징</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{selectedType.feature}</p>
                              </div>
                              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-2">러닝 가이드</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{selectedType.runningGuide}</p>
                              </div>
                          </div>
                      )}
                  </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 비디오 재생 모달 */}
      <AnimatePresence>
        {selectedVideo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"><X size={24}/></button>
                    <div className="aspect-video w-full">
                        <iframe src={selectedVideo.videoUrl} title={selectedVideo.name} className="w-full h-full" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="p-6 bg-slate-900 text-white">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><PlayCircle size={20} className="text-blue-500" />{selectedVideo.name}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{selectedVideo.desc}</p>
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {selectedVideo.tags && selectedVideo.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};