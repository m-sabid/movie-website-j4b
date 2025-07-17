'use client';

import React, { useState, useEffect, useContext } from 'react';
import Swal from "sweetalert2";
import base_url from "@/providers/links/BASE_URL";
import TypographyWrapper from "@/components/shared/TypographyWrapper";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import DataTable from "@/components/dashboard/shared/DataTable";
import Cookies from "js-cookie"; // Ensure js-cookie is imported

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { colors } = useContext(ThemeContext);

  const columns = [
    { header: "Name", field: "displayName" },
    { header: "Email", field: "email" },
    { header: "Role", field: "role", render: (user) => (
      <select
        value={user.role}
        onChange={(e) => handleRoleChange(user._id, e.target.value)}
        className="select select-bordered select-sm"
        style={{ backgroundColor: colors.mo_primary, color: colors.mo_primaryText, borderColor: colors.mo_tertiary }}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    ) },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${base_url}/api/users`); // Fetch all users for client-side pagination
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users.map(user => ({ ...user, displayName: user.displayName || user.name })));
          console.log('Fetched users:', data.users);
        } else {
          console.error('Failed to fetch users', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // No pagination dependencies here, as DataTable handles it

  const handleRoleChange = async (userId, newRole) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the role of this user to ${newRole}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.mo_primary,
      cancelButtonColor: colors.mo_danger,
      confirmButtonText: "Yes, change it!",
      background: colors.mo_secondary,
      color: colors.mo_primaryText,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${base_url}/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      console.log('Role change response:', response);

      if (response.ok) {
        setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
        const loggedInUserId = Cookies.get("userId");
        console.log('Logged in user ID from cookie:', loggedInUserId, 'Type:', typeof loggedInUserId);
        console.log('User ID being changed:', userId, 'Type:', typeof userId);

        if (loggedInUserId === userId) {
          Cookies.set("userRole", newRole);
          console.log('User role cookie updated to:', newRole);
        }
        Swal.fire({
          title: "Role Updated!",
          text: `User role changed to ${newRole}.`,
          icon: "success",
          background: colors.mo_secondary,
          color: colors.mo_primaryText,
          confirmButtonColor: colors.mo_primary,
        }).then(() => {
          // Reload the page or redirect if the current user's role was changed to non-admin
          if (loggedInUserId === userId && newRole !== "admin") {
            window.location.href = "/"; // Redirect to home page
          }
        });
      } else {
        console.error('Failed to update user role', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error data:', errorData);
        Swal.fire({
          title: "Error!",
          text: errorData.message || "Failed to update user role.",
          icon: "error",
          background: colors.mo_secondary,
          color: colors.mo_danger,
          confirmButtonColor: colors.mo_danger,
        });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update user role.",
        icon: "error",
        background: colors.mo_secondary,
        color: colors.mo_danger,
        confirmButtonColor: colors.mo_danger,
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.mo_danger,
      cancelButtonColor: colors.mo_primary,
      confirmButtonText: "Yes, delete it!",
      background: colors.mo_secondary,
      color: colors.mo_primaryText,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${base_url}/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          background: colors.mo_secondary,
          color: colors.mo_primaryText,
          confirmButtonColor: colors.mo_primary,
        });
      } else {
        console.error('Failed to delete user', response.status, response.statusText);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error",
          background: colors.mo_secondary,
          color: colors.mo_danger,
          confirmButtonColor: colors.mo_danger,
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete user.",
        icon: "error",
        background: colors.mo_secondary,
        color: colors.mo_danger,
        confirmButtonColor: colors.mo_danger,
      });
    }
  };

  return (
    <TypographyWrapper>
      <div className="p-4" style={{ backgroundColor: colors.mo_primary }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: colors.mo_heading }}>User Management</h1>
        <DataTable
          data={users}
          columns={columns}
          onDelete={handleDeleteUser}
        />
      </div>
    </TypographyWrapper>
  );
};

export default UsersPage;
