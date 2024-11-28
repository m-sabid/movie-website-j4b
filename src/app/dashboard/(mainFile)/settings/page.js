"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import ContentHeader from "@/components/dashboard/shared/ContentHeader";
import axios from "axios";
import base_url from "@/providers/links/BASE_URL";
import Swal from "sweetalert2";
import TypographyWrapper from "@/components/shared/TypographyWrapper";
import SettingsForm from "@/components/dashboard/Settings/SettingsForm";

// Default colors and typography
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

const availableFonts = [
  "Arial, sans-serif",
  "Roboto, sans-serif",
  "Georgia, serif",
  "Times New Roman, serif",
  "Courier New, monospace",
  "Verdana, sans-serif",
  "Tahoma, sans-serif",
];

const SettingsPage = () => {
  const { colors, setColors, typography, setTypography, siteInfo, setSiteInfo } =
    useContext(ThemeContext);

  const [updatedColors, setUpdatedColors] = useState(colors || defaultColors);
  const [updatedTypography, setUpdatedTypography] = useState(typography || {});
  const [siteName, setSiteName] = useState(siteInfo?.siteName || "Site Name"); 
  const [showMore, setShowMore] = useState(false);

  // Handle color input change
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setUpdatedColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  // Handle typography dropdown change
  const handleTypographyChange = (e, type) => {
    const { value } = e.target;
    setUpdatedTypography((prevTypography) => ({
      ...prevTypography,
      [type]: value,
    }));
  };

  // Handle site name input change
  const handleSiteNameChange = (e) => {
    setSiteName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const finalColors = { ...defaultColors, ...updatedColors };
    const finalTypography = { ...typography, ...updatedTypography };
  
    const payload = {
      colors: finalColors,
      typography: finalTypography,
      siteName, // Include siteName in the payload
    };
  
    try {
      await axios.patch(`${base_url}/global-settings/update`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Update state with the final settings
      setColors(finalColors);
      setTypography(finalTypography);
  
      // Update siteInfo while preserving other properties
      setSiteInfo((prevInfo) => ({
        ...prevInfo,
        siteName,
      }));
  
      // Success notification
      Swal.fire({
        title: "Settings Updated",
        text: "Your settings have been successfully updated!",
        icon: "success",
        confirmButtonText: "OK",
        background: "#f0f4f8",
        color: "#2c3e50",
        confirmButtonColor: "#3498db",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
  
      // Error notification
      Swal.fire({
        title: "Error",
        text: "Failed to update settings. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#f0f4f8",
        color: "#e74c3c",
        confirmButtonColor: "#e74c3c",
      });
    }
  };
  

  // Handle reset to default
  const handleReset = async () => {
    try {
      const response = await axios.post(
        `${base_url}/global-settings/reset`
      );
      const { colors, typography } = response.data;
      setColors(colors);
      setTypography(typography);
      setUpdatedColors(colors);
      setUpdatedTypography(typography);
      setSiteName("My Website"); // Reset siteName to default

      Swal.fire({
        title: "Settings Reset",
        text: "Your settings have been reset to default.",
        icon: "success",
        confirmButtonText: "OK",
        background: "#f0f4f8",
        color: "#2c3e50",
        confirmButtonColor: "#3498db",
      });
    } catch (error) {
      console.error("Error resetting settings:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to reset settings. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#f0f4f8",
        color: "#e74c3c",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  // Handle Show More / Show Less functionality
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <DashboardHeader title={"- Settings Page"} />
      <div className="my-5">
        <ContentHeader
          title="Global Settings"
          description="Customize the theme of the website."
        />
      </div>
      <TypographyWrapper typography={updatedTypography} />
      <SettingsForm
        updatedColors={updatedColors}
        handleColorChange={handleColorChange}
        handleTypographyChange={handleTypographyChange}
        availableFonts={availableFonts}
        showMore={showMore}
        handleShowMore={handleShowMore}
        updatedTypography={updatedTypography}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        siteName={siteName}
        handleSiteNameChange={handleSiteNameChange}
      />
    </div>
  );
};

export default SettingsPage;
