"use client";
import { useContext } from "react";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import ContentHeader from "@/components/dashboard/shared/ContentHeader";

const SettingsPage = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <>
      <DashboardHeader title={"- Settings Page"} />
      <div className="my-5">
        <ContentHeader title="Update Information" />
      </div>
    </>
  );
};
export default SettingsPage;
