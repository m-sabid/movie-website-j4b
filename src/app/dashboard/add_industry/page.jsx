"use client";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddIndustry = () => {
  const { register, handleSubmit, errors } = useForm();

  const createCoupon = () => {
    window.my_modal_1.showModal();
  };

  const onSubmit = async (data) => {
    try {
      // Send the form data to the API endpoint using axios
      const response = await axios.post("http://localhost:5000/genre", data);

      console.log("API Response:", response.data);

      // Perform any additional actions after the form submission, if required
    } catch (error) {
      // Handle errors if the API call fails or image upload fails
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <h2 className="bg-gray-500 rounded-md text-white text-center text-3xl font-bold border-b-2 p-4">
        All Genre - 0
      </h2>

      <div className="flex my-5 justify-center">
        <button
          onClick={() => createCoupon()}
          className="text-center border-4 border-dashed text-green-500 p-5 w-full"
        >
          Create a New Genre +
        </button>
      </div>

      {/* Genre Form */}

      <dialog id="my_modal_1" className="modal w-fit mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-500 rounded-md w-full p-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2 md:col-span-2">
              <label htmlFor="genreName" className="block text-white font-bold">
                Genre Name
              </label>
              <input
                type="text"
                {...register("genreName", { required: true })}
                placeholder="Movie Name"
                className="input input-bordered input-accent w-full"
              />
              {errors?.genreName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Genre
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
    </>
  );
};

export default AddIndustry;
