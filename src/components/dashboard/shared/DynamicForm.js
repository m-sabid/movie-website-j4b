import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ThemeContext } from "@/providers/colors/GlobalColors";
import TypographyWrapper from "@/components/shared/TypographyWrapper";

const DynamicForm = ({ onCancel, fields, onSubmit, buttonText, data }) => {
  const { colors } = useContext(ThemeContext);

  // Initialize the form with react-hook-form, using defaultValues to pre-fill the form if provided
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data, // Pre-fill form with the data to be updated (if any)
  });

  // Handle form submission
  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <TypographyWrapper>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="rounded-md w-full p-4"
        style={{ backgroundColor: colors.mo_primary }}
      >
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`mb-4 ${
                field.colSpan ? `col-span-${field.colSpan}` : "col-span-2"
              }`}
            >
              <label
                htmlFor={field.name}
                className="block text-white font-bold"
              >
                {field.label}
              </label>
              <input
                {...register(field.name, { required: field.required })}
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                className="input input-bordered input-accent w-full"
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
            {buttonText}
          </button>
          <button type="button" onClick={onCancel} className="btn ml-3">
            Close
          </button>
        </div>
      </form>
    </TypographyWrapper>
  );
};

export default DynamicForm;
