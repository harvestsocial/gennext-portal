import React, { forwardRef } from "react";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  id: string;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ name, id, rows = 3, placeholder, value, onChange, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        className="csame"
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
