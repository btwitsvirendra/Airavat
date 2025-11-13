'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AnimatedTooltipButtonProps {
  tooltipText?: string;
  onIconClick?: (iconName: string) => void;
  onInputSubmit?: (value: string) => void;
  placeholder?: string;
}

export default function AnimatedTooltipButton({ 
  tooltipText = 'Hello World',
  onIconClick,
  onInputSubmit,
  placeholder = 'Type message...'
}: AnimatedTooltipButtonProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleIconClick = (iconName: string) => {
    if (onIconClick) {
      onIconClick(iconName);
    }
    setIsChecked(false);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onInputSubmit) {
      onInputSubmit(inputValue);
      setInputValue('');
      setIsChecked(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsChecked(false);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (isChecked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChecked]);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isChecked && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsChecked(false);
        setInputValue('');
      }
    };

    if (isChecked) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChecked]);

  return (
    <>
      <style jsx global>{`
        @keyframes pang-animation {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        @keyframes stretch-animation {
          0% {
            transform: scale(1, 1);
          }
          10% {
            transform: scale(1.1, 0.9);
          }
          30% {
            transform: scale(0.9, 1.1);
          }
          50% {
            transform: scale(1.05, 0.95);
          }
          100% {
            transform: scale(1, 1);
          }
        }

        @keyframes plus-animation {
          0% {
            transform: rotate(0) scale(1);
          }
          20% {
            transform: rotate(60deg) scale(0.93);
          }
          55% {
            transform: rotate(35deg) scale(0.97);
          }
          80% {
            transform: rotate(48deg) scale(0.94);
          }
          100% {
            transform: rotate(45deg) scale(0.95);
          }
        }

        @keyframes plus-animation-reverse {
          0% {
            transform: rotate(45deg) scale(0.95);
          }
          20% {
            transform: rotate(-15deg);
          }
          55% {
            transform: rotate(10deg);
          }
          80% {
            transform: rotate(-3deg);
          }
          100% {
            transform: rotate(0) scale(1);
          }
        }

        .animated-tooltip-wrapper {
          --background: #62abff;
          --icon-color: #414856;
          --shape-color-01: #b8cbee;
          --shape-color-02: #7691e8;
          --shape-color-03: #fdd053;
          --width: 40px;
          --height: 40px;
          --border-radius: var(--height);
          width: var(--width);
          height: var(--height);
          position: relative;
          border-radius: var(--border-radius);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .animated-tooltip-btn {
          background: var(--background);
          width: var(--width);
          height: var(--height);
          position: relative;
          z-index: 3;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: plus-animation-reverse 0.5s ease-out forwards;
        }

        .animated-tooltip-btn::before,
        .animated-tooltip-btn::after {
          content: "";
          display: block;
          position: absolute;
          border-radius: 2px;
          background: #fff;
        }

        .animated-tooltip-btn::before {
          width: 2px;
          height: 12px;
        }

        .animated-tooltip-btn::after {
          width: 12px;
          height: 2px;
        }

        .animated-tooltip-tooltip {
          width: 40px;
          height: 33px;
          border-radius: 31px;
          position: absolute;
          background: #fff;
          border: 3px solid #000;
          z-index: 2;
          padding: 0 7px;
          box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
          opacity: 0;
          top: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          transition: opacity 0.15s ease-in, top 0.15s ease-in, width 0.15s ease-in;
        }

        .animated-tooltip-tooltip::after {
          content: "";
          width: 12px;
          height: 12px;
          background: #fff;
          border: 3px solid #000;
          border-top: none;
          border-left: none;
          border-radius: 0 0 2px 0;
          position: absolute;
          left: 50%;
          margin-left: -6px;
          bottom: -6px;
          transform: rotate(45deg);
          z-index: 0;
        }

        .animated-tooltip-svg {
          width: 133px;
          height: 133px;
          position: absolute;
          z-index: 1;
          transform: scale(0);
        }

        .animated-tooltip-svg .shape {
          fill: none;
          stroke: none;
          stroke-width: 3px;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform-origin: 50% 20%;
        }

        .animated-tooltip-checkbox {
          height: 100%;
          width: 100%;
          border-radius: var(--border-radius);
          cursor: pointer;
          position: absolute;
          z-index: 5;
          opacity: 0;
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg {
          animation: pang-animation 1.2s ease-out forwards;
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(1) {
          transform: translate(11px, 30%) rotate(40deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(2) {
          transform: translate(-2px, 30%) rotate(80deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(3) {
          transform: translate(5px, 30%) rotate(120deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(4) {
          transform: translate(4px, 30%) rotate(160deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(5) {
          transform: translate(9px, 30%) rotate(200deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(6) {
          transform: translate(0px, 30%) rotate(240deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(7) {
          transform: translate(8px, 30%) rotate(280deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(8) {
          transform: translate(-1px, 30%) rotate(320deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-svg .shape:nth-of-type(9) {
          transform: translate(11px, 30%) rotate(360deg);
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-btn {
          animation: plus-animation 0.5s ease-out forwards;
        }

        .animated-tooltip-checkbox:checked ~ .animated-tooltip-tooltip {
          width: 85px;
          height: 31px;
          animation: stretch-animation 1s ease-out forwards 0.15s;
          top: -40px;
          opacity: 1;
        }
      `}</style>
      
      <div className="animated-tooltip-wrapper" ref={wrapperRef}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="animated-tooltip-checkbox"
        />
        
        {/* Animated Button */}
        <div className="animated-tooltip-btn" />

        {/* Tooltip with Input Box */}
        <div className="animated-tooltip-tooltip">
          <form onSubmit={handleInputSubmit} className="w-full flex items-center justify-center gap-1 px-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              className="flex-1 leading-tight text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent text-center"
              style={{ fontSize: '8px' }}
            />
          </form>
        </div>

        {/* Animated Shapes SVG */}
        <svg className="animated-tooltip-svg" viewBox="0 0 300 300" style={{ transform: 'scale(0.444)' }}>
          <g className="shape">
            <polygon 
              points="155.77 140.06 141.08 152.42 159.12 158.96 155.77 140.06" 
              stroke="var(--shape-color-03)"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="shape" stroke="var(--shape-color-02)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line y2="152.29" x2="141.54" y1="146.73" x1="158.66" />
            <line y2="158.07" x2="152.88" y1="140.95" x1="147.32" />
          </g>
          <g className="shape">
            <circle 
              r="13" 
              cy="149.51" 
              cx="150.1" 
              stroke="var(--shape-color-01)"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="shape">
            <circle 
              r="4" 
              cy="149.51" 
              cx="150.1" 
              fill="var(--shape-color-01)"
            />
          </g>
          <g className="shape">
            <rect 
              transform="translate(40.44 -31.76) rotate(13.94)" 
              height="18" 
              width="18" 
              y="140.51" 
              x="141.1" 
              stroke="var(--shape-color-03)"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="shape" stroke="var(--shape-color-02)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line y2="146.24" x2="141.72" y1="152.78" x1="158.48" />
            <line y2="157.89" x2="146.83" y1="141.13" x1="153.37" />
          </g>
          <g className="shape">
            <rect 
              transform="translate(-42.94 62.23) rotate(-20.56)" 
              height="24" 
              width="24" 
              y="137.51" 
              x="138.1" 
              stroke="var(--shape-color-03)"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="shape">
            <circle 
              r="4" 
              cy="149.51" 
              cx="150.1" 
              fill="var(--shape-color-01)"
            />
          </g>
          <g className="shape">
            <circle 
              r="8" 
              cy="149.51" 
              cx="150.1" 
              stroke="var(--shape-color-01)"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
