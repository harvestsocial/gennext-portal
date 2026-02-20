import React, { forwardRef } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  id: string;
  options?: Option[];
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ name, id, options = [], placeholder, value, onChange, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        name={name}
        id={id}
        className="csame"
        value={value}
        onChange={onChange}
        {...rest}
      >
        <option value="" disabled className="select-placeholder">
          {placeholder}
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
