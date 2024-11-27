"use client";

import ContentHeader from "@/components/dashboard/shared/ContentHeader";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import DataTable from "@/components/dashboard/shared/DataTable";
import DynamicForm from "@/components/dashboard/shared/DynamicForm";
import UpdateForm from "@/components/dashboard/shared/UpdateForm";
import TypographyWrapper from "@/components/shared/TypographyWrapper";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddLanguage = () => {
  const { register, reset, handleSubmit, errors } = useForm();
  const [languages, setLanguages] = useState([]);
  const [editLanguageData, setEditLanguageData] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${base_url}/language`);
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  const createLanguage = () => {
    window.my_modal_1.showModal();
  };

  const onSubmit = async (data) => {
    try {
      const lowercaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.toLowerCase()])
      );

      const response = await axios.post(`${base_url}/language`, lowercaseData);

      if (response.data.success) {
        reset();
        window.my_modal_1.close();
        const updatedLanguages = await axios.get(`${base_url}/language`);
        setLanguages(updatedLanguages.data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding language:", error);
      window.my_modal_1.close();
      reset();
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
      });
    }
  };

  const editLanguage = (languageId) => {
    const languageToEdit = languages.find((lang) => lang._id === languageId);
    setEditLanguageData(languageToEdit);
    window.my_edit_modal.showModal();
  };

  const updateLanguage = async (updatedData) => {
    try {
      const updatedLanguage = {
        ...updatedData,
        languageName: updatedData.languageName.toLowerCase(),
      };

      const response = await axios.patch(
        `${base_url}/language/${updatedData._id}`,
        updatedLanguage
      );

      if (response.data.message) {
        setLanguages((prev) =>
          prev.map((lang) =>
            lang._id === updatedData._id ? updatedLanguage : lang
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        window.my_edit_modal.close();
        setEditLanguageData(null);
      }
    } catch (error) {
      console.error("Error updating language:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.error,
      });
    }
  };

  const deleteLanguage = async (languageId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(`${base_url}/language/${languageId}`);

        if (response.data.message) {
          setLanguages((prev) => prev.filter((lang) => lang._id !== languageId));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error deleting language:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.error,
        });
      }
    }
  };

  const languageColumns = [{ header: "Language Name", field: "languageName" }];
  const fields = [
    {
      name: "languageName",
      label: "Language Name",
      placeholder: "Enter Language Name",
      required: true,
    },
  ];

  return (
    <TypographyWrapper>
      <DashboardHeader title="All Languages" count={languages?.length} />

      <div className="flex my-5 justify-center">
        <button
          onClick={createLanguage}
          className="text-center border-4 border-dashed text-green-500 p-5 w-full"
        >
          Add a New Language +
        </button>
      </div>

      <ContentHeader title="Languages" />

      <DataTable
        data={languages}
        columns={languageColumns}
        onEdit={editLanguage}
        onDelete={deleteLanguage}
      />

      {/* Add Language Form */}
      <dialog id="my_modal_1" className="modal w-fit mx-auto">
        <DynamicForm
          fields={fields}
          onSubmit={onSubmit}
          buttonText="Create Language"
          onCancel={() => window.my_modal_1.close()}
        />
      </dialog>

      {/* Edit Language Form */}
      <dialog id="my_edit_modal" className="modal w-fit mx-auto">
        {editLanguageData && (
          <UpdateForm
            data={editLanguageData}
            fields={fields}
            onSubmit={updateLanguage}
            onCancel={() => {
              setEditLanguageData(null);
              window.my_edit_modal.close();
            }}
          />
        )}
      </dialog>
    </TypographyWrapper>
  );
};

export default AddLanguage;
