"use client";

import ContentHeader from "@/components/dashboard/shared/ContentHeader";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import DataTable from "@/components/dashboard/shared/DataTable";
import DynamicForm from "@/components/dashboard/shared/DynamicForm";
import UpdateForm from "@/components/dashboard/shared/UpdateForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import Swal from "sweetalert2";

const AddGenre = () => {
  const { register, reset, handleSubmit, errors } = useForm();
  const [totalGenre, setTotalGenre] = useState([]);
  const [editGenreData, setEditGenreData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${base_url}/genre`);

        setTotalGenre(response.data); // Assuming response.data is the array of genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const createGenre = () => {
    window.my_modal_1.showModal();
  };

  const onSubmit = async (data) => {
    try {
      // Convert the values to lowercase
      const lowercaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.toLowerCase()])
      );

      // Send the form data to the API endpoint using axios
      const response = await axios.post(`${base_url}/genre`, lowercaseData);

      console.log("API Response:", response.data);
      if (response.data.success) {
        reset();
        window.my_modal_1.close();

        const response = await axios.get(`${base_url}/genre`);

        setTotalGenre(response.data); // Assuming response.data is the array of genres

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle errors if the API call fails or image upload fails
      console.error("Error sending data:", error);
      window.my_modal_1.close();
      reset();
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
        // footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const editGenre = (genreId) => {
    const genreToEdit = totalGenre.find((genre) => genre._id === genreId);
    setEditGenreData(genreToEdit);
    window.my_edit_modal.showModal();
  };

  const updateGenre = async (updatedData) => {
    window.my_edit_modal.close();
    try {
      const updatedGenre = {
        ...updatedData,
        genreName: updatedData.genreName.toLowerCase(),
      };

      const response = await axios.patch(
        `${base_url}/genre/${updatedData._id}`,
        updatedGenre
      );

      if (response.data.message) {
        setTotalGenre((prevGenres) =>
          prevGenres.map((genre) =>
            genre._id === updatedData._id ? updatedGenre : genre
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

      setEditGenreData(null);
      window.my_edit_modal.close();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  };

  const deleteGenre = async (genreId) => {
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
        const response = await axios.delete(`${base_url}/genre/${genreId}`);

        if (response.data.message) {
          setTotalGenre((prevGenres) =>
            prevGenres.filter((genre) => genre._id !== genreId)
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
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    }
  };

  const genreColumns = [{ header: "Genre Name", field: "genreName" }];

  const fields = [
    {
      name: "genreName",
      label: "Genre Name",
      placeholder: "Enter Genre Name",
      required: true,
    },
  ];

  return (
    <>
      <DashboardHeader title={"All Genre"} count={totalGenre?.length} />

      <div className="flex my-5 justify-center">
        <button
          onClick={() => createGenre()}
          className="text-center border-4 border-dashed text-green-500 p-5 w-full"
        >
          Add a New Genre +
        </button>
      </div>

      <ContentHeader title={"See All Genre"} />

      <DataTable
        data={totalGenre}
        columns={genreColumns}
        onEdit={editGenre}
        onDelete={deleteGenre}
      />

      {/* Add Genre Form */}
      <dialog id="my_modal_1" className="modal w-fit mx-auto">
        <DynamicForm
          fields={fields}
          onSubmit={onSubmit}
          buttonText="Create Genre"
          onCancel={() => {
            window.my_modal_1.close();
          }}
        />
      </dialog>

      {/* Edit Genre Form */}
      <dialog id="my_edit_modal" className="modal w-fit mx-auto">
        {editGenreData && (
          <UpdateForm
            data={editGenreData}
            fields={fields}
            onSubmit={updateGenre}
            onCancel={() => {
              setEditGenreData(null);
              window.my_edit_modal.close();
            }}
          />
        )}
      </dialog>
    </>
  );
};

export default AddGenre;
