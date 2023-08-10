"use client";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AddLanguage = () => {
  const { register, reset, handleSubmit, errors } = useForm();
  const [totalLanguage, setTotalLanguage] = useState([]);
  const [editLanguageData, setEditLanguageData] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${base_url}/language`);
        setTotalLanguage(response.data); // Assuming response.data is the array of languages
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
      // Convert the values to lowercase
      const lowercaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.toLowerCase()])
      );

      // Send the form data to the API endpoint using axios
      const response = await axios.post(`${base_url}/language`, lowercaseData);

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
        // footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const editLanguage = (languageId) => {
    const languageToEdit = totalLanguage.find(
      (language) => language._id === languageId
    );
    setEditLanguageData(languageToEdit);
    window.my_edit_modal.showModal();
  };

  const updateLanguage = async () => {
    window.my_modal_1.close();
    try {
      if (editLanguageData) {
        const updatedLanguage = {
          ...editLanguageData,
          languageName: editLanguageData.languageName.toLowerCase(), // Convert to lowercase
        };

        const response = await axios.patch(
          `${base_url}/language/${editLanguageData._id}`,
          updatedLanguage
        );

        if (response.data.message) {
          // Update the language in the list
          setTotalLanguage((prevLanguages) =>
            prevLanguages.map((language) =>
              language._id === editLanguageData._id ? updatedLanguage : language
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

        setEditLanguageData(null);
        window.my_edit_modal.close();
      }
    } catch (error) {
      console.error("Error updating language:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  };

  const deleteLanguage = async (languageId) => {
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
          `${base_url}/language/${languageId}`
        );

        if (response.data.message) {
          // Language deleted successfully, update the language list
          setTotalLanguage((prevLanguages) =>
            prevLanguages.filter((language) => language._id !== languageId)
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
        console.error("Error deleting language:", error);
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
        All Language - {totalLanguage?.length}
      </h2>

      <div className="flex my-5 justify-center">
        <button
          onClick={() => createLanguage()}
          className="text-center border-4 border-dashed text-green-500 p-5 w-full"
        >
          Create a New Language +
        </button>
      </div>

      <h2 className="bg-gray-500 rounded-md text-white text-center text-2xl font-bold border-b-2 p-2">
        See All Language
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table bg-gray-500 rounded-md text-white">
          <thead>
            <tr className="text-white">
              <th>SN</th>
              <th>Language Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {totalLanguage.length > 0 ? (
              totalLanguage.map((data, index) => (
                <tr key={data._id}>
                  <th className="text-xl">{index + 1}</th>
                  <td className="capitalize text-xl">{data?.languageName}</td>
                  <td className="text-xl">
                    <FaEdit onClick={() => editLanguage(data._id)} />
                  </td>
                  <td className="text-xl">
                    <FaTrashAlt onClick={() => deleteLanguage(data._id)} />
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

      {/* Language Form */}

      <dialog id="my_modal_1" className="modal w-fit mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-500 rounded-md w-full p-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2 md:col-span-2">
              <label
                htmlFor="languageName"
                className="block text-white font-bold"
              >
                Language Name
              </label>
              <input
                type="text"
                {...register("languageName", { required: true })}
                placeholder="Add Language..."
                className="input input-bordered input-accent w-full"
              />
              {errors?.languageName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Language
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

      {/* Edit Language Form */}
      <dialog id="my_edit_modal" className="modal w-fit mx-auto">
        {editLanguageData && (
          <form className="bg-gray-500 rounded-md w-full p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 col-span-2 md:col-span-2">
                <label
                  htmlFor="editedLanguageName"
                  className="block text-white font-bold"
                >
                  Edit Language Name
                </label>
                <input
                  type="text"
                  id="editedLanguageName"
                  value={editLanguageData.languageName}
                  onChange={(e) =>
                    setEditLanguageData({
                      ...editLanguageData,
                      languageName: e.target.value,
                    })
                  }
                  className="input input-bordered input-accent w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={updateLanguage}
                className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditLanguageData(null);
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
      {/* Edit Language Form */}
    </>
  );
};

export default AddLanguage;
