"use client";

import { useEffect, useState, createContext } from "react";
import base_url from "../links/BASE_URL";
import axios from "axios";

export const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const defaultColors = {
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
  };

  const defaultTypography = {
    headingFont: "Arial, sans-serif",
    bodyFont: "Roboto, sans-serif",
    primaryFontSize: "16px",
    headingFontSize: "24px",
    fontWeightNormal: "400",
    fontWeightBold: "700",
  };

  const [siteInfo, setSiteInfo] = useState(null); // Initialize as `null` to indicate loading
  const [colors, setColors] = useState(defaultColors);
  const [typography, setTypography] = useState(defaultTypography);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(`${base_url}/global-settings`);
        const themeData = response.data;

        console.log("Fetched Theme Data:", themeData); // Debugging log

        setSiteInfo({
          siteName: themeData.siteName,
          logo: themeData.logo,
        });

        const colorData = themeData.colors || defaultColors;
        const typographyData = themeData.typography || defaultTypography;

        setColors(colorData);
        setTypography(typographyData);
      } catch (error) {
        console.error("Error fetching theme data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);

  const themeDataInfo = {
    siteInfo,
    setSiteInfo,
    isLoading, // Expose loading state
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
