import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProfileStep } from './components/steps/ProfileStep';
import { MeasurementStep } from './components/steps/MeasurementStep';
import { ResultStep } from './components/steps/ResultStep';
import LandingStep from './components/steps/LandingStep';

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userData, setUserData] = useState(null);
  const [measurements, setMeasurements] = useState(null);

  const handleProfileSubmit = (data) => {
    setUserData(data);
    setCurrentStep('measure');
  };

  const handleMeasurementSubmit = (data) => {
    setMeasurements(data);
    setCurrentStep('result');
  };
  
  const handleReset = () => {
    setUserData(null);
    setMeasurements(null);
    setCurrentStep('profile');
  };

  // 결과 페이지일 때만 화면을 넓게 씁니다.
  const isResultPage = currentStep === 'result';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 transition-colors duration-500">
      <main 
        className={`mx-auto min-h-screen flex flex-col p-6 relative transition-all duration-500 ease-in-out ${
          isResultPage ? 'max-w-4xl' : 'max-w-md'
        }`}
      >
        
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-blue-500/30 shadow-lg">
                R
            </div>
            <div className="font-extrabold text-xl tracking-tight text-slate-900">
                Runner<span className="text-blue-600">-Type</span>
            </div>
          </div>
          <div className="text-[10px] font-bold bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm text-slate-400 uppercase tracking-wider">
            BETA
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode='wait'>
            {currentStep === 'landing' && (
              <LandingStep key="landing" onNext={() => setCurrentStep('profile')}  />
            )}
            {currentStep === 'profile' && (
              <ProfileStep key="profile" onNext={handleProfileSubmit} />
            )}
            {currentStep === 'measure' && (
              <MeasurementStep key="measure" userData={userData} onSubmit={handleMeasurementSubmit} />
            )}
            {currentStep === 'result' && (
              <ResultStep 
                key="result" 
                userData={userData} 
                measurements={measurements} 
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest opacity-60">
          © 2025 PNU-Hub Running Type Project
        </footer>
      </main>
    </div>
  );
}

export default App;