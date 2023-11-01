import React, { useState, useEffect } from "react";

export default function Toast({ type, message }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => Math.min(prevProgress + 0.2, 100));
      }
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`toast-container ${type.toLowerCase()}`}>
      <div className="text-wrapper">{`${type}: ${message}`}</div>
      <div className="toast-progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
