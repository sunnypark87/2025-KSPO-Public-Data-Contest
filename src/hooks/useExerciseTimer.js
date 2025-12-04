import { useState, useRef, useCallback, useEffect } from 'react';

export const useExerciseTimer = (duration = 60, bpm = 0) => {
  // [UI 렌더링용 상태]
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false); 
  const [isFinished, setIsFinished] = useState(false);
  
  // [로직 제어용 Ref] (애니메이션 루프 안에서 최신 상태를 즉시 확인하기 위함)
  const isRunningRef = useRef(false); 
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const totalMs = duration * 1000;

  // 비트 소리 예약 함수
  const scheduleBeep = useCallback((time) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.1);
  }, []);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    
    // [BPM 소리 스케줄링]
    // 중요: state인 isRunning 대신 ref인 isRunningRef.current를 확인해야 함
    if (bpm > 0 && isRunningRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        const secondsPerBeat = 60.0 / bpm;
        const lookahead = 0.1; 

        while (nextNoteTimeRef.current < ctx.currentTime + lookahead) {
             // 싱크 보정
             if (nextNoteTimeRef.current < ctx.currentTime - 0.1) {
                 nextNoteTimeRef.current = ctx.currentTime;
             }
             scheduleBeep(nextNoteTimeRef.current);
             nextNoteTimeRef.current += secondsPerBeat;
        }
    }

    if (elapsed >= totalMs) {
      setTimeMs(totalMs);
      setIsFinished(true);
      
      // 종료 처리
      isRunningRef.current = false;
      setIsRunning(false);
      
      if (audioContextRef.current) audioContextRef.current.suspend();
    } else {
      setTimeMs(elapsed);
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [totalMs, bpm, scheduleBeep]); // isRunning 의존성 제거

  const start = useCallback(() => {
    // 이미 실행 중이면 무시 (Ref로 확인하여 더 확실하게 차단)
    if (isRunningRef.current || isFinished) return;

    // 1. AudioContext 생성
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;

    // 2. 오디오 장치 활성화 (Promise 처리)
    const resumePromise = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();

    resumePromise.then(() => {
        // 오디오가 준비되면 상태 업데이트 및 타이머 시작
        isRunningRef.current = true; // 로직용 true 설정
        setIsRunning(true);          // UI용 true 설정
        
        nextNoteTimeRef.current = ctx.currentTime;
        startTimeRef.current = performance.now() - timeMs;
        rafRef.current = requestAnimationFrame(animate);
    }).catch(err => console.error("Audio resume failed:", err));

  }, [isFinished, timeMs, animate]);

  const pause = useCallback(() => {
    // 멈춤 처리
    isRunningRef.current = false;
    setIsRunning(false);
    
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.suspend();
    }
    startTimeRef.current = null;
  }, []);

  const reset = useCallback(() => {
    isRunningRef.current = false;
    setIsRunning(false);
    setIsFinished(false);
    setTimeMs(0);
    
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const progress = Math.min(100, (timeMs / totalMs) * 100);

  return { timeMs, progress, isRunning, isFinished, start, pause, reset };
};