import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type = "text",
      name,
      id,
      placeholder,
      className = "csame",
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
