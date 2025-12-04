// src/constants/standards.js

// 나이대별 평균/권장 기준 데이터
export const AGE_STANDARDS = {
  // [시간] 단위: 초 (플랭크, 월시트 - 넓은 범위 적용)
  plank: { '10-29': 90, '30-39': 75, '40-49': 60, '50-59': 45, '60+': 30 },
  wallSit: { '10-29': 60, '30-39': 50, '40-49': 40, '50-59': 30, '60+': 20 },
  
  // [횟수] 단위: 회 (스쿼트 - 넓은 범위 적용)
  squat: { '10-29': 40, '30-39': 35, '40-49': 28, '50-59': 22, '60+': 15 },
  
  // [거리] 단위: cm (유연성 - 10세 단위로 더 정밀함)
  flexibility: { '10-19': 8, '20-29': 11, '30-39': 10, '40-49': 10, '50-59': 11, '60+': 8 }
};

// 나이에 맞는 기준값을 가져오는 헬퍼 함수
export const getStandard = (type, age) => {
  if (!age) return null;
  const ageNum = parseInt(age);
  
  let key = '60+';

  // 유연성(flexibility)은 10세 단위로 키가 설정되어 있음
  if (type === 'flexibility') {
      if (ageNum < 20) key = '10-19';
      else if (ageNum < 30) key = '20-29';
      else if (ageNum < 40) key = '30-39';
      else if (ageNum < 50) key = '40-49';
      else if (ageNum < 60) key = '50-59';
      else key = '60+';
  } 
  // 나머지는 20대/30대/40대 등 큰 범위로 설정됨
  else {
      if (ageNum < 30) key = '10-29';
      else if (ageNum < 40) key = '30-39';
      else if (ageNum < 50) key = '40-49';
      else if (ageNum < 60) key = '50-59';
      else key = '60+';
  }
  
  return AGE_STANDARDS[type]?.[key] || null;
};