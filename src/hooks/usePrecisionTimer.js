import { useState, useEffect, useRef, useCallback } from 'react';

export const usePrecisionTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const progress = timestamp - startTimeRef.current;
    setTime(progress);
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, animate]);

  const toggle = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setTime(0);
      setIsRunning(true);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  return { time, isRunning, toggle, reset };
};