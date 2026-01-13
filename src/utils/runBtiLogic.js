import { getStandard } from '../constants/standards';

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

export const analyzeRunBTI = (results, age, gender) => {
  const { plank, wallSit, squat, hopping, flexibility } = results;
  
  const stdPlank = getStandard('plank', age, gender) || 60;
  const stdWallSit = getStandard('wallSit', age, gender) || 60;
  const stdSquat = getStandard('squat', age, gender) || 30;
  const stdFlex = getStandard('flexibility', age, gender) || 0;
  
  const engineScore = (wallSit / 1000) / stdWallSit; 
  const powerScore = squat / stdSquat; 
  const type1 = engineScore >= powerScore ? 'E' : 'P';
  
  const coreScore = Math.min((plank / 1000) / stdPlank, 1.5);
  const type2 = (plank / 1000) >= stdPlank ? 'S' : 'W';
  
  const flexScore = stdFlex === 0 ? 1 : Math.max(0, (flexibility + 10) / (stdFlex + 10)); 
  const type3 = flexibility >= stdFlex ? 'F' : 'R';
  
  const agilityScore = hopping >= 60000 ? 1.2 : (hopping / 60000);
  const type4 = hopping >= 60000 ? 'A' : 'B';
  
  const bti = `${type1}${type2}${type3}${type4}`; 
  
  const typeInfo = RUN_BTI_TYPES[bti] || {
      ...RUN_BTI_TYPES['EWRB'],
      name: `미지의 러너 ${bti}`,
      desc: '독특한 신체 밸런스를 가졌습니다. 균형 잡힌 훈련이 필요합니다.'
  };

  return {
    bti,
    result: typeInfo,
    chartScores: {
        engine: Math.min(engineScore * 50, 100),   
        power: Math.min(powerScore * 50, 100),      
        core: Math.min(coreScore * 50, 100),
        flexibility: Math.min(flexScore * 50, 100),
        agility: Math.min(agilityScore * 50, 100)
    },
    scores: {
        engine: type1 === 'E' ? '지구력형' : '파워형',
        chassis: type2 === 'S' ? '안정적' : '보강필요',
        suspension: type3 === 'F' ? '유연함' : '뻣뻣함',
        gear: type4 === 'A' ? '경쾌함' : '노력필요'
    },
    prescription: generatePrescription(type1, type2, type3, type4)
  };
};

// [수정] 맞춤형 처방전에 'weaknessCode' 추가 (영상 매칭용)
const generatePrescription = (t1, t2, t3, t4) => {
    const list = [];
    
    if (t2 === 'W') {
        list.push({
            type: 'warning',
            weaknessCode: 'W', // 코어 약함 -> 코어 운동 영상
            title: '🚨 코어 보강 추천',
            msg: '허리를 지탱하는 힘이 부족해요. 달릴 때 자세가 무너질 수 있습니다.',
            solution: '플랭크, 데드버그 3세트'
        });
    }
    
    if (t3 === 'R') {
        list.push({
            type: 'warning',
            weaknessCode: 'R', // 유연성 부족 -> 스트레칭 영상
            title: '🚨 유연성 관리 필수',
            msg: '관절이 뻣뻣해 충격 흡수가 안 됩니다. 햄스트링/종아리 부상 위험이 높아요.',
            solution: '러닝 후 폼롤러로 종아리와 햄스트링을 10분 이상 풀어주세요.'
        });
    }
    
    if (t4 === 'B') {
        list.push({
            type: 'advice',
            weaknessCode: 'B', // 리듬감 부족 -> 피치/줄넘기 영상
            title: '👟 리듬감 훈련',
            msg: '지면을 차고 나가는 탄력이 부족해 러닝 효율이 떨어집니다.',
            solution: '줄넘기나 계단 오르기로 발목 탄력을 키워보세요.'
        });
    }

    if (t1 === 'P' && t2 === 'W') {
        list.push({
            type: 'danger',
            weaknessCode: 'P_WEAK_CORE', // 파워형+코어부족 -> 런지 등 밸런스 운동
            title: '🔥 과속 주의!',
            msg: '힘은 좋지만 차체(코어)가 흔들려 무릎 연골이 다칠 수 있습니다.',
            solution: '속도를 조금 줄이고 케이던스(발구름)를 180으로 높여 가볍게 뛰세요.'
        });
    }

    if (list.length === 0) {
        list.push({
            type: 'success',
            weaknessCode: 'ALL_GOOD', // 상태 좋음 -> 고강도/전신 운동
            title: '🎉 훌륭한 상태!',
            msg: '부상 위험 요소가 적습니다. 지금처럼 꾸준히 관리하며 기록 단축에 도전해보세요!',
            solution: '인터벌 트레이닝으로 심폐지구력을 더 키워보세요.'
        });
    }
    
    return list;
};