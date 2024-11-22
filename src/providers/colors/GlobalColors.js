"use client";

import { useEffect, useState, createContext } from "react";
import base_url from "../links/BASE_URL";
import axios from "axios";

// Create the context for both color and typography
export const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState({
    mo_primary: "#6b7280",
    mo_secondary: "#1f2937",
    mo_tertiary: "#3B82F6",
    mo_quaternary: "#2563eb",
    mo_primaryText: "#ffffff",
    mo_heading: "#ffffff",
    mo_db_primary: "#4b5563",
    mo_badges_primary: "#3b82f6",
    mo_badges_secondary: "#d1d5db",
    mo_danger: "#ea1b40",
  });

  const [typography, setTypography] = useState({
    headingFont: "Arial, sans-serif",
    bodyFont: "Roboto, sans-serif",
    primaryFontSize: "16px",
    headingFontSize: "24px",
    fontWeightNormal: "400",
    fontWeightBold: "700",
  });

  // Fetch Colors and Typography
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(`${base_url}/theme`);

        const themeData = response.data;

        // Assuming API returns colors and typography in a structured format
        const colorData = themeData.colors.reduce((acc, color) => {
          acc[color.element] = color.colorValue;
          return acc;
        }, {});

        const typographyData = themeData.typography.reduce((acc, typ) => {
          acc[typ.element] = typ.value;
          return acc;
        }, {});

        // Update the state with fetched color and typography data
        setColors((prevColors) => ({ ...prevColors, ...colorData }));
        setTypography((prevTypography) => ({
          ...prevTypography,
          ...typographyData,
        }));
      } catch (error) {
        console.error("Error fetching theme data:", error);
      }
    };

    fetchTheme();
  }, []);

  // Exported color and typography data
  const themeDataInfo = {
    colors,
    setColors,
    typography,
    setTypography,
  };

  return (
    <ThemeContext.Provider value={themeDataInfo}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
