// src/data/exerciseDatabase.js

// [국민체력100 공식 운동처방 영상 DB]
// 출처: 서울올림픽기념국민체육진흥공단 공공데이터

export const EXERCISE_DB = [
  // ===============================================
  // 1. [W] 코어/허리 강화 (플랭크 미달 시)
  // ===============================================
  {
    id: 'core_1',
    name: '누워서 복근 만들기 (11자 복근)',
    category: ['core', 'abs'],
    tags: ['복근', '홈트', 'NO층간소음'],
    videoUrl: 'https://www.youtube.com/embed/OJk1dk-Px1c', 
    desc: '누워서 안전하게 할 수 있는 복근 운동 루틴입니다. 허리에 무리 없이 코어를 강화하세요.'
  },
  {
    id: 'core_2',
    name: '플랭크 정석 (엎드려 버티기)',
    category: ['core', 'whole'],
    tags: ['전신운동', '코어', '허리강화'],
    videoUrl: 'https://www.youtube.com/embed/i_TtjVYn9fQ',
    desc: '코어 운동의 기본! 엎드려 버티기로 전신의 밸런스와 근지구력을 키워줍니다.'
  },
  {
    id: 'core_3',
    name: '윗몸 말아 올리기 (크런치)',
    category: ['core', 'abs'],
    tags: ['상복부', '기초근력'],
    videoUrl: 'https://www.youtube.com/embed/Kyt-UTRiVnM',
    desc: '허리 통증 없이 복부에만 집중할 수 있는 윗몸 일으키기 동작입니다.'
  },

  // ===============================================
  // 2. [P/E] 하체 강화 (파워/지구력 부족 시)
  // ===============================================
  {
    id: 'lower_1',
    name: '다리 굽혀 펴기 (런지)',
    category: ['lower', 'power'],
    tags: ['하체근력', '밸런스', '엉덩이'],
    videoUrl: 'https://www.youtube.com/embed/yn_JjLJaR4U',
    desc: '앞뒤로 다리를 벌려 굽히는 동작으로, 달리기 시 필요한 한 발 지지 능력을 길러줍니다.'
  },
  {
    id: 'lower_2',
    name: '계단 오르기 운동',
    category: ['lower', 'endurance'],
    tags: ['심폐지구력', '생활운동', '계단'],
    videoUrl: 'https://www.youtube.com/embed/TEFpZBNPXBU',
    desc: '주변 계단을 활용하여 하체 근지구력과 심폐 기능을 동시에 향상시킵니다.'
  },
  {
    id: 'lower_3',
    name: '앉았다 일어서기 (스쿼트)',
    category: ['lower', 'power'],
    tags: ['하체필수', '전신운동'],
    videoUrl: 'https://www.youtube.com/embed/CZl5Th--uhQ',
    desc: '가장 기초적이면서도 효과적인 하체 운동입니다. 정확한 자세로 무릎을 보호하세요.'
  },
  {
    id: 'lower_4',
    name: '5분 하체 챌린지 (중상급자용)',
    category: ['lower', 'challenge'],
    tags: ['고강도', '하체비만탈출'],
    videoUrl: 'https://www.youtube.com/embed/Gw73tXd_Wow',
    desc: '짧고 굵게! 하체 근력을 극한으로 끌어올리고 싶은 분들을 위한 챌린지입니다.'
  },

  // ===============================================
  // 3. [R] 유연성/스트레칭 (전굴 부족 시)
  // ===============================================
  {
    id: 'flex_1',
    name: '전신 스트레칭 루틴 (10분)',
    category: ['stretch', 'flexibility'],
    tags: ['유연성', '피로회복', '부상방지'],
    videoUrl: 'https://www.youtube.com/embed/6ies7bJfYRs',
    desc: '뻣뻣한 몸을 10분 만에 말랑하게! 러닝 전후 필수 스트레칭 코스입니다.'
  },
  {
    id: 'flex_2',
    name: '앉아 윗몸 앞으로 굽히기',
    category: ['stretch', 'hamstring'],
    tags: ['햄스트링', '유연성측정'],
    videoUrl: 'https://www.youtube.com/embed/DSzbj4FpZ_w',
    desc: '허벅지 뒷근육(햄스트링)을 늘려주어 무릎 통증 예방과 기록 향상에 도움을 줍니다.'
  },
  {
    id: 'flex_3',
    name: '옆구리 늘리기',
    category: ['stretch', 'upper'],
    tags: ['상체유연성', '호흡'],
    videoUrl: 'https://www.youtube.com/embed/M95EiuTLuC4',
    desc: '굳어있는 옆구리와 갈비뼈 주변을 이완시켜 호흡을 더 편안하게 만들어줍니다.'
  },

  // ===============================================
  // 4. [B] 순발력/리듬감 (호핑 부족 시)
  // ===============================================
  {
    id: 'cardio_1',
    name: '제자리 뛰기 (피치)',
    category: ['cardio', 'rhythm'],
    tags: ['심폐지구력', '자세교정'],
    videoUrl: 'https://www.youtube.com/embed/uy1T5QNARJ4',
    desc: '가볍게 제자리에서 뛰며 달리기 리듬감을 익히고 심박수를 올리는 운동입니다.'
  },
  {
    id: 'cardio_2',
    name: '대(大)자 점프 (팔벌려뛰기)',
    category: ['cardio', 'warmup'],
    tags: ['전신유산소', '순발력'],
    videoUrl: 'https://www.youtube.com/embed/LX1hy8AJYCE',
    desc: '팔다리를 크게 벌리며 뛰는 동작으로 전신 협응력과 발목 탄력을 길러줍니다.'
  },
  {
    id: 'cardio_3',
    name: '층간소음 없는 유산소',
    category: ['cardio', 'home'],
    tags: ['집콕운동', '살빠지는'],
    videoUrl: 'https://www.youtube.com/embed/DuSIEmcodeU',
    desc: '집에서도 맘 편히 할 수 있는 사뿐사뿐 유산소 운동입니다.'
  }
];

// 약점(Weakness)에 따라 추천 운동을 뽑아주는 함수
export const getRecommendedExercises = (weaknessType) => {
    let targetCategory = '';
    
    // RunBTI 결과에 따른 카테고리 매핑
    switch(weaknessType) {
        case 'W': targetCategory = 'core'; break;    // 코어(Chassis) 약함
        case 'R': targetCategory = 'stretch'; break; // 유연성(Suspension) 부족
        case 'B': targetCategory = 'cardio'; break;  // 리듬감(Gear) 부족
        case 'P_WEAK_CORE': targetCategory = 'lower'; break; // 파워형이지만 밸런스 필요 시
        default: targetCategory = 'core'; // 기본값
    }

    // 해당 카테고리 운동 중 2개 랜덤 추출 (매번 다른 운동 추천 효과)
    const filtered = EXERCISE_DB.filter(ex => ex.category.includes(targetCategory));
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 2);
};