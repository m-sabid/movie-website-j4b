import TypographyWrapper from "@/components/shared/TypographyWrapper";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const UpdateForm = ({ data, onSubmit, onCancel, fields }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data, // Pre-fill form with the data to be updated
  });

  const { colors } = useContext(ThemeContext);

  // This will only call onSubmit when the form is actually submitted, not on every input change
  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <TypographyWrapper>
      <form
        className="rounded-md w-full p-4"
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ backgroundColor: colors.mo_primary }}
      >
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="mb-4 col-span-2 md:col-span-2">
              <label
                htmlFor={field.name}
                className="block text-white font-bold"
              >
                {field.label}
              </label>
              <input
                {...register(field.name, { required: field.required })}
                type="text"
                id={field.name}
                name={field.name}
                className="input input-bordered input-accent w-full"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
        </div>

        <div className="modal-action">
          <button
            type="submit"
            className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
          <button type="button" onClick={onCancel} className="btn ml-3">
            Cancel
          </button>
        </div>
      </form>
    </TypographyWrapper>
  );
};

export default UpdateForm;
