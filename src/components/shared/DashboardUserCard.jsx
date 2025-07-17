import { ThemeContext } from "@/providers/colors/GlobalColors";
import React, { useContext } from "react";
import TypographyWrapper from "./TypographyWrapper";

const DashboardUserCard = ({ user, onRoleChange, onDelete }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <TypographyWrapper>
      <div
        className="rounded-md p-3 text-white border-3 border-gray-700 hover:scale-[102%] transform transition-all duration-300"
        style={{ backgroundColor: colors.mo_secondary }}
      >
        <h4 className="text-xl">
          {user.displayName || user.name} -{" "}
          <span className="bg-blue-500 rounded-full px-2 text-sm">
            {user.role}
          </span>
        </h4>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="col-span-4">
            <ul className="flex flex-wrap gap-2 my-2">
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                <b>Email:</b> {user.email}
              </li>
              <li className="bg-gray-700 mb-1 py-2 px-1 rounded-md">
                <b>Role:</b>
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user._id, e.target.value)}
                  className="select select-bordered select-sm ml-2"
                  style={{ backgroundColor: colors.mo_primary, color: colors.mo_primaryText, borderColor: colors.mo_tertiary }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </li>
            </ul>

            <div className="flex gap-2 mt-5">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={onDelete}
                style={{ backgroundColor: colors.mo_danger, color: colors.mo_primaryText }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </TypographyWrapper>
  );
};

export default DashboardUserCard;
