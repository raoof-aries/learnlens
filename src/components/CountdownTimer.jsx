import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 10,
    minutes: 55,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="countdown-text-only">
      <div className="text-timer-item">
        <div className="timer-num-box">
          <span className="timer-num">{formatNumber(timeLeft.days)}</span>
        </div>
        <span className="timer-unit-lbl">DAYS</span>
      </div>

      <span className="timer-colon">:</span>

      <div className="text-timer-item">
        <div className="timer-num-box">
          <span className="timer-num">{formatNumber(timeLeft.hours)}</span>
        </div>
        <span className="timer-unit-lbl">HOURS</span>
      </div>

      <span className="timer-colon">:</span>

      <div className="text-timer-item">
        <div className="timer-num-box">
          <span className="timer-num">{formatNumber(timeLeft.minutes)}</span>
        </div>
        <span className="timer-unit-lbl">MINUTES</span>
      </div>

      <span className="timer-colon">:</span>

      <div className="text-timer-item">
        <div className="timer-num-box">
          <span className="timer-num">{formatNumber(timeLeft.seconds)}</span>
        </div>
        <span className="timer-unit-lbl">SECONDS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;

