'use client';

import React from 'react';

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
}

export default function CustomCheckbox({ checked = false, onChange, id }: CustomCheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className="checkbox-container inline-block relative pl-[35px] mb-3 cursor-pointer text-base select-none" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="custom-checkbox absolute opacity-0 cursor-pointer h-0 w-0"
      />
      <span 
        className={`checkmark absolute top-0 left-0 h-[25px] w-[25px] rounded transition-colors duration-300 shadow-[0_2px_5px_rgba(0,0,0,0.2)] ${
          checked 
            ? 'bg-[#2196F3] shadow-[0_3px_7px_rgba(33,150,243,0.3)]' 
            : 'bg-gray-200'
        }`}
      >
        {checked && (
          <span
            className="absolute left-[9px] top-[5px] block"
            style={{
              width: '5px',
              height: '10px',
              border: 'solid white',
              borderWidth: '0 3px 3px 0',
              transform: 'rotate(45deg)',
              animation: 'checkAnim 0.2s forwards'
            }}
          />
        )}
      </span>
    </label>
  );
}

