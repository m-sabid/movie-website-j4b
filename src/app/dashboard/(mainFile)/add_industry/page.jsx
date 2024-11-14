"use client";

import ContentHeader from "@/components/dashboard/shared/ContentHeader";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import DataTable from "@/components/dashboard/shared/DataTable";
import DynamicForm from "@/components/dashboard/shared/DynamicForm";
import UpdateForm from "@/components/dashboard/shared/UpdateForm";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddIndustry = () => {
  const { register, reset, handleSubmit, errors } = useForm();
  const [totalIndustry, setTotalIndustry] = useState([]);
  const [editIndustryData, setEditIndustryData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(`${base_url}/industry`);
        setTotalIndustry(response.data);
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    };
    fetchIndustries();
  }, []);

  const createIndustry = () => {
    window.my_modal_1.showModal();
  };

  const onSubmit = async (data) => {
    try {
      const lowercaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.toLowerCase()])
      );

      const response = await axios.post(`${base_url}/industry`, lowercaseData);

      if (response.data.success) {
        reset();
        window.my_modal_1.close();
        const response = await axios.get(`${base_url}/industry`);
        setTotalIndustry(response.data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error sending data:", error);
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

  const editIndustry = (industryId) => {
    const industryToEdit = totalIndustry.find((industry) => industry._id === industryId);
    setEditIndustryData(industryToEdit);
    window.my_edit_modal.showModal();
  };

  const updateIndustry = async (updatedData) => {
    window.my_edit_modal.close();
    try {
      const updatedIndustry = {
        ...updatedData,
        industryName: updatedData.industryName.toLowerCase(),
      };

      const response = await axios.patch(
        `${base_url}/industry/${updatedData._id}`,
        updatedIndustry
      );

      if (response.data.message) {
        setTotalIndustry((prevIndustries) =>
          prevIndustries.map((industry) =>
            industry._id === updatedData._id ? updatedIndustry : industry
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setEditIndustryData(null);
      window.my_edit_modal.close();
    } catch (error) {
      console.error("Error updating industry:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  };

  const deleteIndustry = async (industryId) => {
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`${base_url}/industry/${industryId}`);

        if (response.data.message) {
          setTotalIndustry((prevIndustries) =>
            prevIndustries.filter((industry) => industry._id !== industryId)
          );
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error deleting industry:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    }
  };

  const industryColumns = [{ header: "Industry Name", field: "industryName" }];

  const fields = [
    {
      name: "industryName",
      label: "Industry Name",
      placeholder: "Enter Industry Name",
      required: true,
    },
  ];

  return (
    <>
      <DashboardHeader title={"All Industries"} count={totalIndustry?.length} />

      <div className="flex my-5 justify-center">
        <button
          onClick={() => createIndustry()}
          className="text-center border-4 border-dashed text-green-500 p-5 w-full"
        >
          Add a New Industry +
        </button>
      </div>

      <ContentHeader title={"See All Industries"} />

      <DataTable
        data={totalIndustry}
        columns={industryColumns}
        onEdit={editIndustry}
        onDelete={deleteIndustry}
      />

      {/* Add Industry Form */}
      <dialog id="my_modal_1" className="modal w-fit mx-auto">
        <DynamicForm
          fields={fields}
          onSubmit={onSubmit}
          buttonText="Create Industry"
          onCancel={() => {
            window.my_modal_1.close();
          }}
        />
      </dialog>

      {/* Edit Industry Form */}
      <dialog id="my_edit_modal" className="modal w-fit mx-auto">
        {editIndustryData && (
          <UpdateForm
            data={editIndustryData}
            fields={fields}
            onSubmit={updateIndustry}
            onCancel={() => {
              setEditIndustryData(null);
              window.my_edit_modal.close();
            }}
          />
        )}
      </dialog>
    </>
  );
};

export default AddIndustry;
