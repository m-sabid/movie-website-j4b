"use client";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AddIndustry = () => {
  const { register, reset, handleSubmit, errors } = useForm();
  const [totalIndustry, setTotalIndustry] = useState([]);
  const [editIndustryData, setEditIndustryData] = useState(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(`${base_url}/industry`);
        setTotalIndustry(response.data); // Assuming response.data is the array of industries
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
      // Convert the values to lowercase
      const lowercaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.toLowerCase()])
      );

      // Send the form data to the API endpoint using axios
      const response = await axios.post(
        `${base_url}/industry`,
        lowercaseData
      );

      console.log("API Response:", response.data);
      if (response.data.success) {
        reset();
        window.my_modal_1.close();
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
        text: error.response.data.message,
      });
    }
  };

  const editIndustry = (industryId) => {
    const industryToEdit = totalIndustry.find((industry) => industry._id === industryId);
    setEditIndustryData(industryToEdit);
    window.my_edit_modal.showModal();
  };

  const updateIndustry = async () => {
    window.my_modal_1.close();
    try {
      if (editIndustryData) {
        const updatedIndustry = {
          ...editIndustryData,
          industryName: editIndustryData.industryName.toLowerCase(), // Convert to lowercase
        };

        const response = await axios.patch(
          `${base_url}/industry/${editIndustryData._id}`,
          updatedIndustry
        );

        if (response.data.message) {
          // Update the industry in the list
          setTotalIndustry((prevIndustries) =>
            prevIndustries.map((industry) =>
              industry._id === editIndustryData._id ? updatedIndustry : industry
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
      }
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
        const response = await axios.delete(
          `${base_url}/industry/${industryId}`
        );

        if (response.data.message) {
          // Industry deleted successfully, update the industry list
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

  return (
    <>
      <h2 className="bg-gray-500 rounded-md text-white text-center text-3xl font-bold border-b-2 p-4">
        All Industry - {totalIndustry?.length}
      </h2>

      <div className="flex my-5 justify-center">
        <button
          onClick={() => createIndustry()}
          className="text-center border-4 border-dashed text-green-500 p-5 w-full"
        >
          Add a New Industry +
        </button>
      </div>

      <h2 className="bg-gray-500 rounded-md text-white text-center text-2xl font-bold border-b-2 p-2">
        See All Industry
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table bg-gray-500 rounded-md text-white">
          <thead>
            <tr className="text-white">
              <th>SN</th>
              <th>Industry Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {totalIndustry.length > 0 ? (
              totalIndustry.map((data, index) => (
                <tr key={data._id}>
                  <th className="text-xl">{index + 1}</th>
                  <td className="capitalize text-xl">{data?.industryName}</td>
                  <td className="text-xl cursor-pointer">
                    <button
                      className="bg-gray-400 py-2 px-4 rounded-md hover:bg-gray-600"
                      onClick={() => editIndustry(data._id)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="text-xl cursor-pointer">
                    <button
                      className="bg-gray-400 py-2 px-4 rounded-md hover:bg-gray-600"
                      onClick={() => deleteIndustry(data._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <span className="loading loading-bars loading-lg"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Table */}

      {/* Industry Form */}

      <dialog id="my_modal_1" className="modal w-fit mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-500 rounded-md w-full p-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2 md:col-span-2">
              <label htmlFor="industryName" className="block text-white font-bold">
                Industry Name
              </label>
              <input
                type="text"
                {...register("industryName", { required: true })}
                placeholder="Movie Name"
                className="input input-bordered input-accent w-full"
              />
              {errors?.industryName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Industry
            </button>
            <button
              onClick={() => {
                window.my_modal_1.close();
              }}
              className="btn ml-3"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      {/* Edit Industry Form */}
      <dialog id="my_edit_modal" className="modal w-fit mx-auto">
        {editIndustryData && (
          <form className="bg-gray-500 rounded-md w-full p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 col-span-2 md:col-span-2">
                <label
                  htmlFor="editedIndustryName"
                  className="block text-white font-bold"
                >
                  Edit Industry Name
                </label>
                <input
                  type="text"
                  id="editedIndustryName"
                  value={editIndustryData.industryName}
                  onChange={(e) =>
                    setEditIndustryData({
                      ...editIndustryData,
                      industryName: e.target.value,
                    })
                  }
                  className="input input-bordered input-accent w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={updateIndustry}
                className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditIndustryData(null);
                  window.my_edit_modal.close();
                }}
                className="btn ml-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </dialog>
      {/* Edit Industry Form */}
    </>
  );
};

export default AddIndustry;
