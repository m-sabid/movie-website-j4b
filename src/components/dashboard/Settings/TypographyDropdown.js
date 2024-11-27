import React from 'react';

const TypographyDropdown = ({ id, label, value, onChange, availableFonts }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 border rounded"
      >
        {availableFonts.map((font, index) => (
          <option key={index} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypographyDropdown;
