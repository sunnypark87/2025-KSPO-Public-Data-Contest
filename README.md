# Runner-Type: Public Data-Based Running Persona Analysis System

**2025 국민체력100 공공데이터 활용 경진대회 출품작**

## 1. Project Overview
**Runner-Type**은 스포츠 의학 데이터와 공공데이터(KSPO)를 기반으로 개인의 신체 능력을 정량적으로 측정하고, 16가지 유형(RunBTI)으로 분류하여 맞춤형 러닝 가이드를 제공하는 웹 애플리케이션입니다.

최근 러닝 인구의 급증과 함께 잘못된 자세나 자신의 신체 능력에 맞지 않는 훈련으로 인한 부상 사례가 증가하고 있습니다. 본 프로젝트는 별도의 전문 장비 없이 수행 가능한 맨몸 운동 테스트를 통해 사용자에게 객관적인 신체 능력 지표(Physical Age)와 유형 분석 결과를 제공함으로써, 데이터에 기반한 안전하고 효율적인 러닝 문화를 조성하는 것을 목적으로 합니다.

---

## 2. Key Features
### 2.1. Quantitative Physical Assessment
러닝 퍼포먼스에 영향을 미치는 5가지 핵심 지표를 측정합니다.
* **Core Stability (Plank):** 주행 안정성 및 자세 유지 능력 측정
* **Lower Body Power (Squat):** 지면 반발력 및 추진력(Kick) 측정
* **Muscular Endurance (Wall Sit):** 장거리 주행 시 피로 저항력 측정
* **Flexibility (Sit and Reach):** 관절 가동 범위 및 부상 위험도 측정
* **Agility & Rhythm (Hopping):** 케이던스 효율 및 지면 접촉 시간 단축 능력 측정

### 2.2. RunBTI Analysis Algorithm
측정된 데이터를 4가지 축(Dimension)으로 분석하여 16가지 페르소나를 도출합니다.
* **Power (P) vs Endurance (E):** 근파워 중심형 대 근지구력 중심형
* **Stability (S) vs Weakness (W):** 코어 안정성 보유 여부
* **Flexible (F) vs Rigid (R):** 근육 및 관절의 유연성 여부
* **Agile (A) vs Blunt (B):** 민첩성 및 리듬감 보유 여부

### 2.3. Physical Age Estimation
단순 점수제가 아닌, 연령별/성별 대조군 데이터와 비교하여 사용자의 해당 신체 능력이 실제 어느 연령대의 평균에 해당하는지를 산출하는 '신체 나이(Physical Age)' 추정 모델을 탑재했습니다.

---

## 3. System Architecture & Logic

### 3.1. Hybrid Data Model Strategy
본 시스템은 분석의 정밀도와 범용성을 동시에 확보하기 위해 두 가지 데이터 소스를 결합한 하이브리드 모델을 채택했습니다.

1.  **KSPO 국민체력100 데이터셋 (General Public Standards)**
    * **적용 대상:** Plank, Wall Sit, Flexibility
    * **목적:** 엘리트 선수가 아닌 일반 대중의 연령별 평균 데이터를 기준으로 설정하여, 사용자의 현실적인 위치를 파악하고 과도한 목표 설정을 방지합니다.
2.  **Clinical Sports Science Data (TopEndSports, CDC)**
    * **적용 대상:** Squat, Hopping
    * **목적:** 연령별(10세 단위) 및 성별에 따른 고해상도 구간 데이터를 적용하여, 정밀한 등급(Excellent ~ Poor) 산출 및 변별력을 확보합니다.

### 3.2. Scoring Interpolation System
단순 구간(Step-based) 평가의 한계를 극복하기 위해 선형 보간법(Linear Interpolation)을 적용했습니다. 각 등급 구간 내에서의 사용자 위치를 계산하여 0~100점 척도로 정규화(Normalization)함으로써, 미세한 기록 향상도 점수에 반영되도록 설계되었습니다.

---

## 4. Technology Stack

본 프로젝트는 최신 웹 기술 표준을 준수하며, 고성능과 유지보수성을 고려하여 선정되었습니다.

### 4.1. Core Framework & Environment
| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Runtime** | Node.js | - | JavaScript 런타임 환경 |
| **Framework** | **React** | **v19.2.0** | 컴포넌트 기반 UI 라이브러리 (최신 React 19 적용) |
| **Build Tool** | **Vite** | **v7.2.4** | ESModules 기반의 초고속 빌드 도구 |

### 4.2. Dependencies & Libraries
| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Styling** | **Tailwind CSS** | **v4.1.17** | Utility-First CSS 프레임워크 (v4 엔진 적용) |
| **Animation** | **Framer Motion** | **v12.23.25** | React용 프로덕션 레벨 모션 라이브러리 |
| **Backend/DB** | **Firebase** | **v12.7.0** | NoSQL(Firestore) 기반 데이터 저장 및 호스팅 |
| **Visualization** | Custom SVG | - | 레이더 차트 및 타이머 시각화 자체 구현 |
| **Utility** | html-to-image | v1.11.13 | 결과 리포트 이미지 렌더링 및 저장 |
| **Icons** | Lucide React | v0.555.0 | 일관된 UI 아이콘 시스템 |

### 4.3. Development Tools
| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Linter** | ESLint | v9.39.1 | 코드 품질 관리 및 정적 분석 |
| **Package Manager** | NPM | - | 패키지 의존성 관리 |

---

## 5. Getting Started

### 5.1. Prerequisites
* Node.js (LTS 버전 권장)
* NPM

### 5.2. Installation
프로젝트 저장소를 클론하고 의존성 패키지를 설치합니다.

```bash
git clone [https://github.com/sunnypark87/2025-KSPO-Public-Data-Contest.git](https://github.com/sunnypark87/2025-KSPO-Public-Data-Contest.git)
cd 2025-KSPO-Public-Data-Contest
npm install
```

### 5.3. Environment Setup
루트 디렉토리에 .env 파일을 생성하고 Firebase 및 Kakao SDK 키를 설정해야 합니다.
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_KAKAO_API_KEY=your_kakao_javascript_key
```

### 5.4. Development Server
로컬 개발 서버를 실행합니다.
```bash
npm run dev
```

# 6. Directory Structure
```
src/
├── api/                # 외부 API 연동 모듈
├── assets/             # 정적 리소스 (이미지, 아이콘)
├── components/         # React 컴포넌트
│   ├── common/         # 공통 UI 컴포넌트 (Button, Card 등)
│   ├── steps/          # 프로세스 단계별 페이지 컴포넌트
│   └── visual/         # 데이터 시각화 컴포넌트 (Charts, Animations)
├── constants/          # 상수 데이터 (KSPO 기준표, 메시지 등)
├── data/               # 정적 데이터 (운동 처방 DB)
├── hooks/              # 커스텀 React Hooks
├── lib/                # 라이브러리 초기화 (Firebase 등)
├── utils/              # 핵심 로직 및 유틸리티 함수 (RunBTI 알고리즘)
└── App.jsx             # 메인 애플리케이션 진입점
```
