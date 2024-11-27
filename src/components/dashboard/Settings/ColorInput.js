import React from 'react';

const ColorInput = ({ color, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={color} className="text-lg font-semibold capitalize">
        {color.replace("mo_", "").replace(/_/g, " ")}
      </label>
      <input
        type="color"
        name={color}
        value={value}
        onChange={onChange}
        className="w-12 h-12 rounded border border-gray-300"
      />
    </div>
  );
};

export default ColorInput;
