import { useContext } from "react";
import { ThemeContext } from "@/providers/colors/GlobalColors";

function DashboardHeader({ title, count }) {
  const { colors, typography } = useContext(ThemeContext);

  return (
    <h2
      className="rounded-md text-white text-center text-3xl font-bold border-b-2 p-4"
      style={{ backgroundColor: colors.mo_primary }}
    >
      {title} - {count}
    </h2>
  );
}

export default DashboardHeader;
