'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DateRangePicker({ value, onChange, placeholder = 'Select Time' }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Sync selectedDate with value prop
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const clickedDateString = formatDate(clickedDate);
    setSelectedDate(clickedDateString);
  };

  const handleApply = () => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedDate(null);
    onChange('');
    setIsOpen(false);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isSelectedDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return formatDate(date) === selectedDate;
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          readOnly
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-black rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[200px] cursor-pointer"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer z-10"
        >
          <Calendar size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-2 rounded-xl border border-gray-200 bg-white shadow-lg pt-3 z-50 w-[calc(100%+50px)] -ml-[25px]">
          <div className="flex items-center justify-between px-5">
            <button
              onClick={prevMonth}
              className="rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-base font-medium text-gray-900">{monthName}</div>
            <button
              onClick={nextMonth}
              className="rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mb-2 mt-3 grid grid-cols-7 px-5">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-0.5 grid grid-cols-7 gap-y-0.5 px-5">
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`}></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dateString = formatDate(date);
              
              let className = 'flex items-center justify-center cursor-pointer w-[46px] h-[46px] rounded-full text-gray-700 hover:bg-teal-500 hover:text-white';
              
              if (isSelectedDate(day)) {
                className = 'flex items-center justify-center cursor-pointer w-[46px] h-[46px] bg-teal-500 text-white rounded-full';
              }

              return (
                <div
                  key={day}
                  className={className}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-end space-x-2.5 border-t border-gray-200 p-3">
            <button
              onClick={handleCancel}
              className="rounded-lg border border-teal-500 px-4 py-1.5 text-sm font-medium text-teal-500 hover:bg-teal-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="rounded-lg bg-teal-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

