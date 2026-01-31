// RunBTI 16가지 전체 유형 데이터베이스 (기존 내용 유지)
export const RUN_BTI_TYPES = {
  'ESFA': { name: '육각형 마라토너', desc: '지구력, 코어, 유연성, 순발력 모든 것이 완벽한 러너입니다.', tags: ['완벽밸런스', '풀코스추천'], feature: '신체 밸런스가 매우 뛰어납니다. 장거리 주행에도 자세가 무너지지 않으며, 부상 위험도 가장 적은 이상적인 상태입니다.', runningGuide: '현재 상태를 유지하며 풀코스 마라톤이나 트레일 러닝 등 고강도 챌린지에 도전해보세요.' },
  'ESFB': { name: '묵직한 탱크', desc: '지치지 않는 체력과 코어를 가졌지만, 리듬감을 더 키워보세요.', tags: ['강한체력', '리듬감필요'], feature: '지구력과 코어 안정성이 뛰어납니다. 다만 순발력이 부족해 스피드를 내는 데 한계가 있을 수 있습니다.', runningGuide: '케이던스(분당 발구름 수)를 180까지 높이는 훈련을 하세요.' },
  'ESRA': { name: '녹슨 아이언맨', desc: '강철 같은 체력이지만 몸이 뻣뻣해요. 스트레칭이 시급합니다!', tags: ['강철체력', '유연성필요'], feature: '심폐지구력과 코어 힘은 훌륭하지만, 근육이 타이트해 충격 흡수가 잘 안 됩니다.', runningGuide: '러닝 전후로 동적/정적 스트레칭에 20분 이상 투자하세요.' },
  'ESRB': { name: '뚝심 있는 바위', desc: '잘 버티는 힘은 좋지만, 몸이 굳어있어 부상 위험이 높아요.', tags: ['부상주의', '스트레칭필수'], feature: '오래 버티는 힘은 좋으나, 유연성과 탄력이 부족해 쿵쿵 뛰는 경향이 있습니다.', runningGuide: '무리한 장거리보다는 3~5km의 가벼운 조깅으로 시작하세요.' },
  'EWFA': { name: '춤추는 갈대', desc: '몸이 가볍고 유연하지만 코어가 약해 장거리는 힘들 수 있어요.', tags: ['가벼움', '코어보강'], feature: '유연하고 탄력이 좋아 가볍게 잘 뛰지만, 코어가 약해 거리가 늘어날수록 자세가 무너집니다.', runningGuide: '러닝 시간을 짧게 가져가고, 보강 운동(플랭크, 데드버그) 비중을 높이세요.' },
  'EWFB': { name: '말랑한 젤리', desc: '유연하고 끈기는 있지만, 단단하게 잡아주는 힘이 부족해요.', tags: ['유연함', '근력운동필요'], feature: '관절 가동범위는 좋으나 근력이 부족해지면 관절에 무리가 갈 수 있습니다.', runningGuide: '스쿼트와 런지 같은 하체 근력 운동을 병행하세요.' },
  'EWRA': { name: '종이인형', desc: '가볍게 잘 뛰지만 근력과 유연성이 부족해 부상에 취약합니다.', tags: ['가벼움', '기초근력필요'], feature: '몸이 가벼워 초반엔 잘 나가지만, 근육이 뻣뻣하고 코어가 약해 피로가 급격히 쌓입니다.', runningGuide: '달리기보다는 빠른 걷기와 보강 운동부터 시작하세요.' },
  'EWRB': { name: '성장하는 새싹', desc: '끈기로 버티고 있지만, 달리기를 위한 기초 근육이 더 필요해요.', tags: ['입문자', '기초다지기'], feature: '지구력 외에는 전반적인 기초 체력 향상이 필요합니다.', runningGuide: '걷기와 달리기를 반복하는 인터벌 러닝부터 시작하세요.' },
  'PSFA': { name: '날쌘 치타', desc: '폭발적인 스피드와 유연성을 갖춘 최고의 스프린터 타입입니다.', tags: ['스피드', '파워러너'], feature: '강력한 하체 파워와 유연성, 코어까지 갖췄습니다. 단거리에 강합니다.', runningGuide: '단거리 기록 주파나 인터벌 트레이닝에 최적화되어 있습니다.' },
  'PSFB': { name: '성난 황소', desc: '엄청난 힘과 유연성을 가졌지만, 발놀림을 더 가볍게 만들어보세요.', tags: ['파워', '케이던스훈련'], feature: '파워가 넘치고 유연하지만, 리듬감이 부족해 힘으로만 뛰려는 경향이 있습니다.', runningGuide: '메트로놈을 활용해 일정한 박자로 뛰는 연습을 하세요.' },
  'PSRA': { name: '거침없는 불도저', desc: '힘으로 밀어붙이는 스타일! 유연성이 없어 관절이 고생 중이에요.', tags: ['파워', '스트레칭필수'], feature: '힘과 스피드는 좋지만 근육이 뻣뻣해 부상 위험이 큽니다.', runningGuide: '운동 전후 충분한 웜업과 쿨다운이 필수입니다.' },
  'PSRB': { name: '단단한 돌덩이', desc: '파워는 좋으나 몸이 너무 굳어있어 충격 흡수가 전혀 안 되고 있어요.', tags: ['부상경고', '폼롤러필수'], feature: '강한 힘을 가졌지만 유연성과 리듬감이 없어 달릴 때 충격이 큽니다.', runningGuide: '수영이나 자전거로 유산소 능력을 키우고, 요가로 유연성을 먼저 확보하세요.' },
  'PWFA': { name: '통통 튀는 스프링', desc: '힘 좋고 유연하지만 코어가 없어 달릴 때 에너지가 새어나가요.', tags: ['탄력', '플랭크필수'], feature: '탄력 주행이 가능하지만 코어가 약해 상체가 흔들립니다.', runningGuide: '코어 운동(플랭크, 사이드 플랭크)을 매일 실시하세요.' },
  'PWFB': { name: '숨겨진 원석', desc: '좋은 힘과 유연성을 가졌어요. 코어와 리듬감만 다듬으면 완벽해요!', tags: ['잠재력', '밸런스훈련'], feature: '하체 힘과 유연성이라는 좋은 재료를 가졌습니다.', runningGuide: '보강 운동과 러닝 드릴을 병행하여 자세를 교정해보세요.' },
  'PWRA': { name: '브레이크 고장난 차', desc: '빠르지만 제어가 안 되어 다치기 쉬워요. 코어와 유연성을 기르세요.', tags: ['위험', '안정성보강'], feature: '속도를 즐기지만 몸의 안정성이 떨어져 다칠 위험이 큽니다.', runningGuide: '천천히 길게 달리는 법을 배우세요.' },
  'PWRB': { name: '유리대포', desc: '한방(파워)은 있지만 내구성이 약해 쉽게 다칠 수 있는 타입입니다.', tags: ['파워', '전신보강'], feature: '순간적인 힘은 좋으나 이를 뒷받침할 코어, 유연성, 리듬감이 부족합니다.', runningGuide: '고강도 러닝은 자제하고 걷기부터 시작해 기초 근력을 키우세요.' }
};

// [신규] ㅁㅁ.txt 데이터 기반 측정 기준표
// RunBTI 분류를 위해 'Average(평균)' 구간을 55점(Type 획득 기준)으로 설정
const METRIC_STANDARDS = {
  // [1] 플랭크 (ㅁㅁ.txt Source 12, 14) - 전체 연령 공통
  plank: {
    all: {
      excellent: 240, // 4분 (Very Good 이상)
      good: 120,      // 2분 (Above Average)
      average: 60,    // 1분 (Average) -> 55점 부여 (기준점)
      below: 30       // 30초
    }
  },

  // [2] 월싯 (ㅁㅁ.txt Source 13) - 전체 연령 공통
  wallSit: {
    all: {
      excellent: 100,
      good: 75,
      average: 50,    // 50초 -> 55점 부여
      below: 25
    }
  },

  // [3] 스쿼트 (ㅁㅁ.txt Source 15) - 성별/나이별 세분화
  squat: {
    male: {
      '20-29': { excellent: 34, good: 33, average: 27, below: 24 },
      '30-39': { excellent: 32, good: 30, average: 24, below: 21 },
      '40-49': { excellent: 29, good: 27, average: 21, below: 18 },
      '50-59': { excellent: 26, good: 24, average: 18, below: 15 },
      '60+':   { excellent: 23, good: 21, average: 15, below: 12 }
    },
    female: {
      '20-29': { excellent: 29, good: 27, average: 21, below: 18 },
      '30-39': { excellent: 26, good: 24, average: 18, below: 15 },
      '40-49': { excellent: 23, good: 21, average: 15, below: 12 },
      '50-59': { excellent: 20, good: 18, average: 12, below: 9 },
      '60+':   { excellent: 17, good: 15, average: 9,  below: 6 }
    }
  },

  // [4] 호핑 (ㅁㅁ.txt Source 16) - 평균값(Mean) 기준
  hopping: {
    male: {
      '18-30': { average: 57.7 },
      '31-45': { average: 51.8 },
      '46-60': { average: 44.2 },
      '60+':   { average: 40.0 }
    },
    female: {
      '18-30': { average: 49.8 },
      '31-45': { average: 44.0 },
      '46-60': { average: 37.5 },
      '60+':   { average: 35.0 }
    }
  },
  
  // [5] 유연성 (기존 데이터 유지)
  flexibility: {
    male: { '20-29': { average: 9 }, '30-39': { average: 9 }, '40-49': { average: 9 }, '50+': { average: 8 } },
    female: { '20-29': { average: 16 }, '30-39': { average: 15 }, '40-49': { average: 14 }, '50+': { average: 15 } }
  }
};

// Helper: 나이대 Key 반환
const getAgeKey = (age, type = 'general') => {
  const ageNum = parseInt(age);
  if (type === 'hopping') {
    if (ageNum <= 30) return '18-30';
    if (ageNum <= 45) return '31-45';
    if (ageNum <= 60) return '46-60';
    return '60+';
  }
  if (ageNum < 30) return '20-29';
  if (ageNum < 40) return '30-39';
  if (ageNum < 50) return '40-49';
  if (ageNum < 60) return '50-59';
  return '60+';
};

// [핵심 수정] 점수 변환 함수: 구간별 비례 점수제 (Interpolation) 적용
const getScoreFromGrade = (category, value, age, gender) => {
  if (value === undefined || value === null) return 0;
  
  const genderKey = (gender === '여성' || gender === 'F' || gender === 'female') ? 'female' : 'male';
  let standards = null;

  // 1. 기준 데이터 찾기 (수정됨)
  if (METRIC_STANDARDS[category]) {
      // (1) 먼저 'all' (남녀 공통) 키가 있는지 확인
      if (METRIC_STANDARDS[category]['all']) {
          standards = METRIC_STANDARDS[category]['all'];
      } 
      // (2) 없다면 성별 키(male/female) 확인
      else if (METRIC_STANDARDS[category][genderKey]) {
          let ageKey;
          if (category === 'squat') {
              const ageNum = parseInt(age);
              if (ageNum < 30) ageKey = '20-29';
              else if (ageNum < 40) ageKey = '30-39';
              else if (ageNum < 50) ageKey = '40-49';
              else if (ageNum < 60) ageKey = '50-59';
              else ageKey = '60+';
          } else {
              ageKey = getAgeKey(age, category === 'hopping' ? 'hopping' : 'general');
          }
          
          standards = METRIC_STANDARDS[category][genderKey][ageKey];
          
          // 해당 나이대가 없으면 60+ 또는 50+ 사용
          if (!standards) {
              standards = METRIC_STANDARDS[category][genderKey]['60+'] || METRIC_STANDARDS[category][genderKey]['50+'];
          }
      }
  }

  // 기준표를 못 찾았을 때 (여기로 빠져서 50점이 나왔던 것임)
  if (!standards) return 50;

  // 2. [NEW] 정밀 점수 계산 (보간법)
  // 등급표(Excellent/Good...)가 있는 경우 (스쿼트 등)
  if (standards.excellent) {
      // (1) Excellent 이상 (95 ~ 100점)
      if (value >= standards.excellent) {
          // Excellent 기준보다 얼마나 더 했나? (가산점)
          const bonus = value - standards.excellent;
          return Math.min(100, 95 + bonus); // 최대 100점
      }
      // (2) Good ~ Excellent 구간 (75 ~ 94점)
      if (value >= standards.good) {
          const range = standards.excellent - standards.good;
          const position = value - standards.good;
          return 75 + (position / range) * (94 - 75);
      }
      // (3) Average ~ Good 구간 (55 ~ 74점) -> 여기가 가장 중요!
      if (value >= standards.average) {
          const range = standards.good - standards.average;
          const position = value - standards.average;
          return 55 + (position / range) * (74 - 55);
      }
      // (4) Below ~ Average 구간 (40 ~ 54점)
      if (value >= standards.below) {
          const range = standards.average - standards.below;
          const position = value - standards.below;
          return 40 + (position / range) * (54 - 40);
      }
      // (5) Below 미만 (0 ~ 39점)
      return Math.max(0, (value / standards.below) * 39);
  }

  // 평균값만 있는 경우 (플랭크, 월싯, 호핑)
  if (standards.average) {
    const ratio = value / standards.average;
    // 평균(1.0) = 55점
    // 평균의 1.5배 = 85점, 2배 = 100점
    if (ratio >= 1.0) {
        return Math.min(100, 55 + (ratio - 1) * 60); // 계수 조정으로 고득점 가능성 확대
    }
    // 평균 미만
    return Math.max(0, 55 * ratio);
  }

  return 50;
};

// [신규] 신체 나이 계산 함수 (UI 표기용)
export const calculatePhysicalAge = (category, value, gender) => {
  const genderKey = (gender === '여성' || gender === 'F' || gender === 'female') ? 'female' : 'male';
  
  // 비교할 나이대 목록 (젊은 순)
  // 스쿼트용과 일반용(플랭크/월싯) 키가 다를 수 있으므로 구분
  const ageRanges = category === 'squat' 
      ? ['20-29', '30-39', '40-49', '50-59', '60+']
      : ['10-29', '30-39', '40-49', '50-59', '60+']; 

  const table = METRIC_STANDARDS[category]?.[genderKey];
  
  // 1. 나이대별 평균 데이터가 있는 경우 (스쿼트, 플랭크, 월싯)
  if (table) {
      for (const ageRange of ageRanges) {
          const std = table[ageRange]?.average;
          if (std && value >= std) {
              // "10-29" -> "20대", "30-39" -> "30대"로 변환
              // 불필요한 텍스트((평균) 등)를 절대 붙이지 않음
              let ageLabel = ageRange.split('-')[0];
              if (ageLabel === '10') ageLabel = '20'; // 10-29는 20대로 표기
              return ageLabel + '대';
          }
      }
      return '60대+';
  }

// 2. 데이터가 없는 경우 (유연성 등) - 점수 기반 추정
  // 텍스트를 붙이지 않고 나이만 리턴
  const score = getScoreFromGrade(category, value, 30, gender);
  if (score >= 90) return '20대';
  if (score >= 70) return '20대';
  if (score >= 55) return '30대';
  if (score >= 40) return '40대';
  return '50대+';
};

// 메인 분석 함수
export const analyzeRunBTI = (results, age, gender) => {
  const { plank, wallSit, squat, hopping, flexibility } = results;

  const plankSec = (plank || 0) / 1000;
  const wallSitSec = (wallSit || 0) / 1000;
  // [수정 포인트 1] 호핑: 1000으로 나누지 말고 개수 그대로 사용 + 숫자 변환
  const hoppingCount = Number(hopping) || 0; 
  
  // [수정 포인트 2] 스쿼트: 반드시 Number()로 감싸서 숫자로 변환!
  const squatCount = Number(squat) || 0;
  
  const flexCm = Number(flexibility) || 0; // 유연성도 숫자로 변환 추천

  const scores = {
    plank: getScoreFromGrade('plank', plankSec, age, gender),
    wallSit: getScoreFromGrade('wallSit', wallSitSec, age, gender),
    squat: getScoreFromGrade('squat', squatCount, age, gender),
    hopping: getScoreFromGrade('hopping', hoppingCount, age, gender),
    flexibility: getScoreFromGrade('flexibility', flexCm, age, gender)
  };

  const skillScores = {
    power: (scores.squat + scores.hopping) / 2, 
    core: (scores.plank + scores.wallSit) / 2,  
    flexibility: scores.flexibility,            
    agility: scores.hopping                     
  };

  const type1 = skillScores.power >= 50 ? 'P' : 'E'; 
  const type2 = skillScores.core >= 50 ? 'S' : 'W';  
  const type3 = skillScores.flexibility >= 50 ? 'F' : 'R'; 
  const type4 = skillScores.agility >= 50 ? 'A' : 'B'; 

  const bti = `${type1}${type2}${type3}${type4}`;

  return {
    bti,
    result: RUN_BTI_TYPES[bti] || RUN_BTI_TYPES['EWRB'],
    chartScores: skillScores, 
    // [신규] 프론트엔드 표기용 신체 나이
    physicalAge: {
        power: calculatePhysicalAge('squat', squatCount, gender), 
        core: calculatePhysicalAge('plank', plankSec, gender),
        flexibility: calculatePhysicalAge('flexibility', flexCm, gender)
    },
    prescription: generatePrescription(type1, type2, type3, type4)
  };
};

const generatePrescription = (t1, t2, t3, t4) => {
    const list = [];
    if (t2 === 'W') list.push({ type: 'warning', weaknessCode: 'W', title: '🚨 코어 보강 추천', msg: '허리를 지탱하는 힘이 부족해요. 달릴 때 자세가 무너질 수 있습니다.', solution: '플랭크, 데드버그 3세트' });
    if (t3 === 'R') list.push({ type: 'warning', weaknessCode: 'R', title: '🚨 유연성 관리 필수', msg: '관절이 뻣뻣해 충격 흡수가 안 됩니다. 햄스트링/종아리 부상 위험이 높아요.', solution: '러닝 후 폼롤러로 종아리와 햄스트링을 10분 이상 풀어주세요.' });
    if (t4 === 'B') list.push({ type: 'advice', weaknessCode: 'B', title: '👟 리듬감 훈련', msg: '지면을 차고 나가는 탄력이 부족해 러닝 효율이 떨어집니다.', solution: '줄넘기나 계단 오르기로 발목 탄력을 키워보세요.' });
    if (t1 === 'P' && t2 === 'W') list.push({ type: 'danger', weaknessCode: 'P_WEAK_CORE', title: '🔥 과속 주의!', msg: '힘은 좋지만 차체(코어)가 흔들려 무릎 연골이 다칠 수 있습니다.', solution: '속도를 조금 줄이고 케이던스(발구름)를 180으로 높여 가볍게 뛰세요.' });
    
    if (list.length === 0) list.push({ type: 'success', weaknessCode: 'ALL_GOOD', title: '🎉 훌륭한 상태!', msg: '부상 위험 요소가 적습니다. 지금처럼 꾸준히 관리하며 기록 단축에 도전해보세요!', solution: '인터벌 트레이닝으로 심폐지구력을 더 키워보세요.' });
    return list;
};