// src/constants/standards.js

// 나이대별 평균/권장 기준 데이터
// 출처: Mean_Analysis.csv (국민체력100 데이터 기반) 및 일반적 권장 기준
// - 유연성(flexibility): '앉아윗몸앞으로굽히기' 평균값 (cm)
// - 플랭크(plank): 코어 근지구력 권장 시간 (초) - 남녀 차이 반영 (여성은 남성의 약 80% 수준)
// - 월시트(wallSit): 하체 근지구력 권장 시간 (초) - 남녀 차이 반영
// - 스쿼트(squat): 하체 근력 권장 횟수 (회/분) - 남녀 차이 반영

export const AGE_STANDARDS = {
  // [시간] 단위: 초 (플랭크 - 권장 기준)
  plank: {
    '10-29': { male: 90, female: 72 },
    '30-39': { male: 75, female: 60 },
    '40-49': { male: 60, female: 48 },
    '50-59': { male: 45, female: 36 },
    '60+':   { male: 30, female: 24 }
  },
  
  // [시간] 단위: 초 (월시트 - 권장 기준)
  wallSit: {
    '10-29': { male: 60, female: 48 },
    '30-39': { male: 50, female: 40 },
    '40-49': { male: 40, female: 32 },
    '50-59': { male: 30, female: 24 },
    '60+':   { male: 20, female: 16 }
  },
  
  // [횟수] 단위: 회 (스쿼트 - 권장 기준)
  squat: {
    '10-29': { male: 40, female: 32 },
    '30-39': { male: 35, female: 28 },
    '40-49': { male: 28, female: 22 },
    '50-59': { male: 22, female: 18 },
    '60+':   { male: 15, female: 12 }
  },
  
  // [거리] 단위: cm (유연성 - 국민체력100 데이터 기반 평균)
  // Mean_Analysis.csv 분석 결과 반영 (소수점 반올림)
  flexibility: {
    '10-19': { male: 7, female: 12 }, 
    '20-29': { male: 9, female: 16 },
    '30-39': { male: 9, female: 15 },
    '40-49': { male: 9, female: 14 },
    '50-59': { male: 8, female: 15 },
    '60+':   { male: 7, female: 14 }
  }
};

// 나이에 맞는 기준값을 가져오는 헬퍼 함수
export const getStandard = (type, age, gender) => {
  if (!age) return null;
  const ageNum = parseInt(age);
  
  // 성별 정규화 (기본값: 남성)
  // MeasurementStep.jsx에서 userData.gender가 '남성', 'M', 'male' 등으로 올 수 있음
  const genderKey = (gender === '여성' || gender === 'F' || gender === 'female') ? 'female' : 'male';

  let key = '60+';

  // 유연성(flexibility)은 10세 단위로 키가 설정되어 있음 (데이터 기반)
  if (type === 'flexibility') {
      if (ageNum < 20) key = '10-19';
      else if (ageNum < 30) key = '20-29';
      else if (ageNum < 40) key = '30-39';
      else if (ageNum < 50) key = '40-49';
      else if (ageNum < 60) key = '50-59';
      else key = '60+';
  } 
  // 나머지는 20대/30대/40대 등 큰 범위로 설정됨 (권장 기준)
  else {
      if (ageNum < 30) key = '10-29';
      else if (ageNum < 40) key = '30-39';
      else if (ageNum < 50) key = '40-49';
      else if (ageNum < 60) key = '50-59';
      else key = '60+';
  }
  
  // 해당 나이대/성별의 기준값 반환
  // 데이터가 없을 경우 안전하게 null 반환
  return AGE_STANDARDS[type]?.[key]?.[genderKey] || null;
};