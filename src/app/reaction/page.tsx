"use client"
import React, { useState, useRef, useEffect } from 'react';

const ConfusedSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" className="w-40 h-40">
    <rect x="20" y="20" width="260" height="300" rx="30" ry="30" fill="#FFD700"/>
    <ellipse cx="100" cy="120" rx="45" ry="40" fill="white" filter="url(#shadow)"/>
    <ellipse cx="200" cy="120" rx="45" ry="40" fill="white" filter="url(#shadow)"/>
    <circle cx="100" cy="105" r="20" fill="black"/>
    <circle cx="200" cy="105" r="20" fill="black"/>
    <ellipse cx="150" cy="230" rx="25" ry="20" fill="white" stroke="#FF6347" strokeWidth="6" filter="url(#shadow)"/>
    <rect x="135" y="225" width="30" height="10" fill="black"/>
    <defs>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00000033"/>
      </filter>
    </defs>
  </svg>
);

const SadSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" className="w-40 h-40">
    <rect x="20" y="20" width="260" height="300" rx="30" ry="30" fill="#FF6347"/>
    <ellipse cx="100" cy="120" rx="45" ry="40" fill="white" filter="url(#shadow)"/>
    <ellipse cx="200" cy="120" rx="45" ry="40" fill="white" filter="url(#shadow)"/>
    <circle cx="100" cy="130" r="20" fill="black"/>
    <circle cx="200" cy="130" r="20" fill="black"/>
    <path d="M110,230 Q150,210 190,230" stroke="white" strokeWidth="12" fill="none" filter="url(#shadow)"/>
    <defs>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00000033"/>
      </filter>
    </defs>
  </svg>
);

const HappySVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" className="w-40 h-40">
    <rect x="20" y="20" width="260" height="300" rx="30" ry="30" fill="#32CD32"/>
    <ellipse cx="100" cy="120" rx="45" ry="40" fill="white" filter="url(#shadow)"/>
    <ellipse cx="200" cy="120" rx="45" ry="40" fill="white" filter="url(#shadow)"/>
    <circle cx="100" cy="120" r="20" fill="black"/>
    <circle cx="200" cy="120" r="20" fill="black"/>
    <path d="M110,230 Q150,270 190,230" stroke="white" strokeWidth="12" fill="none" filter="url(#shadow)"/>
    <defs>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00000033"/>
      </filter>
    </defs>
  </svg>
);

const MoodSliderCard = () => {
  const [position, setPosition] = useState(1); // 0, 1, or 2
  const sliderRef = useRef<any>(null);
  const handleRef = useRef<any>(null);

  const handleMouseDown = (e:any) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e:any) => {
    if (sliderRef.current && handleRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      let x = e.clientX - sliderRect.left;
      x = Math.max(0, Math.min(x, sliderRect.width));
      const percentage = x / sliderRect.width;
      const newPosition = Math.round(percentage * 2);
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getColor = () => {
    switch (position) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMoodText = () => {
    switch (position) {
      case 0: return 'Sad';
      case 1: return 'Okay';
      case 2: return 'Happy';
      default: return 'Neutral';
    }
  };

  const getMoodSVG = () => {
    switch (position) {
      case 0: return <SadSVG />;
      case 1: return <ConfusedSVG />;
      case 2: return <HappySVG />;
      default: return null;
    }
  };

  return (
    <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-lg">
      {/* Top section (85%) */}
      <div className={`h-[85%] ${getColor()} p-6 flex flex-col items-center justify-center transition-colors duration-300`}>
        <h2 className="text-3xl font-bold text-white mb-4">How are you feeling?</h2>
        {getMoodSVG()}
        <div className="text-4xl font-bold text-white mt-4">{getMoodText()}</div>
      </div>
      
      {/* Bottom section (15%) */}
      <div className="h-[15%] bg-white p-2 relative">
        {/* Slider */}
        <div className="w-full h-full relative" ref={sliderRef}>
          {/* Slider track */}
          <div className="w-full h-1 bg-gray-300 rounded-full absolute top-1/2 transform -translate-y-1/2">
            {[0, 1, 2].map((tick) => (
              <div
                key={tick}
                className="absolute w-3 h-3 bg-white border-2 border-gray-300 rounded-full"
                style={{ left: `${tick * 50}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
              ></div>
            ))}
          </div>
          
          {/* Circle handle with pause icon */}
          <div
            ref={handleRef}
            className={`w-10 h-10 ${getColor()} rounded-full absolute top-1/2 -mt-5 cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg`}
            style={{ 
              left: `calc(${(position / 2) * 100}% - 20px)`,
            }}
            onMouseDown={handleMouseDown}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSliderCard;