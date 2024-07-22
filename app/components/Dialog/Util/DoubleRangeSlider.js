import React, { useRef, useEffect, useState } from 'react';

const DoubleRangeSlider = ({ min, max, value, setValue }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width));
      updateValue(newPosition);
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, min, max, value]);

  const updateValue = (position) => {
    const newValue = Math.round(position * (max - min) + min);
    if (dragging === 'min') {
      const clampedValue = Math.max(min, Math.min(newValue, value[1] - 1));
      setValue([clampedValue, value[1]]);
    } else if (dragging === 'max') {
      const clampedValue = Math.max(value[0] + 1, Math.min(newValue, max));
      setValue([value[0], clampedValue]);
    }
  };

  const getThumbStyle = (val) => ({
    left: `${((val - min) / (max - min)) * 100}%`
  });

  const handleMouseDown = (thumb) => (e) => {
    e.preventDefault();
    setDragging(thumb);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="relative w-full h-2 bg-blue-200 rounded-full" ref={sliderRef}>
        <div
          className="absolute h-full bg-blue-500"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`
          }}
        />
        <div
          ref={minThumbRef}
          className="absolute w-5 h-5 bg-blue-600 rounded-full shadow cursor-pointer -mt-1.5"
          style={getThumbStyle(value[0])}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleMouseDown('min')}
        >
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            {value[0]}
          </div>
        </div>
        <div
          ref={maxThumbRef}
          className="absolute w-5 h-5 bg-blue-600 rounded-full shadow cursor-pointer -mt-1.5"
          style={getThumbStyle(value[1])}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleMouseDown('max')}
        >
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            {value[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;