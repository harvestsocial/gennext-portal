import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="primary__btn style2" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
};

export default SubmitButton;
