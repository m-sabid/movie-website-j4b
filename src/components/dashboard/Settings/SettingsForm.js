import React from "react";
import ColorInput from "./ColorInput";
import TypographyDropdown from "./TypographyDropdown";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SettingsForm = ({
  updatedColors,
  handleColorChange,
  handleTypographyChange,
  availableFonts,
  showMore,
  handleShowMore,
  updatedTypography,
  handleSubmit,
  handleReset,
  siteName,
  handleSiteNameChange, // Added handler for siteName
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      {/* Site Name Input */}
      <div className="mb-6">
        <label htmlFor="siteName" className="block text-sm font-medium text-white">
          Site Name
        </label>
        <input
          type="text"
          id="siteName"
          value={siteName}
          onChange={handleSiteNameChange}
          className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your site name"
        />
      </div>

      {/* Color Inputs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.keys(updatedColors)
          .slice(0, showMore ? Object.keys(updatedColors).length : 3)
          .map((key) => (
            <ColorInput
              key={key}
              color={key}
              value={updatedColors[key]}
              onChange={handleColorChange}
            />
          ))}
      </div>

      {/* Show More/Show Less */}
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={handleShowMore}
          className="px-4 py-1 border border-gray-400 bg-transparent text-gray-600 rounded hover:bg-gray-200"
        >
          {showMore ? (
            <FaChevronUp className="inline-block mr-2" />
          ) : (
            <FaChevronDown className="inline-block mr-2" />
          )}
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Typography Dropdowns */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TypographyDropdown
          id="fontFamily"
          label="Font Family"
          value={updatedTypography.fontFamily}
          onChange={(e) => handleTypographyChange(e, "fontFamily")}
          availableFonts={availableFonts}
        />
        <TypographyDropdown
          id="headingFont"
          label="Heading Font"
          value={updatedTypography.headingFont}
          onChange={(e) => handleTypographyChange(e, "headingFont")}
          availableFonts={availableFonts}
        />
        <TypographyDropdown
          id="bodyFont"
          label="Body Font"
          value={updatedTypography.bodyFont}
          onChange={(e) => handleTypographyChange(e, "bodyFont")}
          availableFonts={availableFonts}
        />
      </div>

      {/* Font Size Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="primaryFontSize" className="block text-sm font-medium text-white">
            Primary Font Size
          </label>
          <input
            type="text"
            id="primaryFontSize"
            value={updatedTypography.primaryFontSize}
            onChange={(e) => handleTypographyChange(e, "primaryFontSize")}
            className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="headingFontSize" className="block text-sm font-medium text-white">
            Heading Font Size
          </label>
          <input
            type="text"
            id="headingFontSize"
            value={updatedTypography.headingFontSize}
            onChange={(e) => handleTypographyChange(e, "headingFontSize")}
            className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Font Weight Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fontWeightNormal" className="block text-sm font-medium text-white">
            Normal Font Weight
          </label>
          <input
            type="text"
            id="fontWeightNormal"
            value={updatedTypography.fontWeightNormal}
            onChange={(e) => handleTypographyChange(e, "fontWeightNormal")}
            className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="fontWeightBold" className="block text-sm font-medium text-white">
            Bold Font Weight
          </label>
          <input
            type="text"
            id="fontWeightBold"
            value={updatedTypography.fontWeightBold}
            onChange={(e) => handleTypographyChange(e, "fontWeightBold")}
            className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset to Default
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
