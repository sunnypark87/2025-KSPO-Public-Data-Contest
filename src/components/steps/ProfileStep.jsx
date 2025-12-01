import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';

export const ProfileStep = ({ onNext }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleAgeChange = (e) => {
    const val = e.target.value;
    if (val === '' || parseInt(val, 10) >= 0) {
      setAge(val);
    }
  };

  const isFormValid = age && gender;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8 pt-4"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">기본 정보 입력</h2>
        <p className="text-slate-500">정확한 분석을 위해 프로필을 설정해주세요.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">나이</label>
          <input
            type="number"
            min="0"
            value={age}
            onChange={handleAgeChange}
            placeholder="예: 25"
            className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">성별</label>
          <div className="grid grid-cols-2 gap-4">
            {['남성', '여성'].map((type) => (
              <button
                key={type}
                onClick={() => setGender(type)}
                className={`p-4 rounded-xl font-medium transition-all duration-200 shadow-sm ${
                  gender === type
                    ? 'bg-blue-600 text-white shadow-blue-200 ring-2 ring-blue-600 ring-offset-2'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        disabled={!isFormValid}
        onClick={() => onNext({ age, gender })}
      >
        측정 시작하기 <ChevronRight size={20} />
      </Button>
    </motion.div>
  );
};