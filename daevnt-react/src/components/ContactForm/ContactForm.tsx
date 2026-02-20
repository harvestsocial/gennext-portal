import React, { useState } from "react";
import FormInput from "@components/UI/FormInput";
import FormSelect from "@components/UI/FormSelect";
import FormTextarea from "@components/UI/FormTextarea";
import SubmitButton from "./SubmitButton";

interface FormErrors {
  [key: string]: string;
}

interface FormState {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  website: string;
  description: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstname, lastname, email, phone, website, description } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    const newErrors: FormErrors = {};

    if (!firstname.trim()) newErrors.firstname = "First name is required.";
    if (!lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(phone)) newErrors.phone = "Invalid phone number.";
    if (!website) newErrors.website = "Please select a subject.";
    if (!description.trim()) newErrors.description = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage(null);
      return;
    }

    setErrors({});
    
    // Simulate API request
    await new Promise((res) => setTimeout(res, 1000));

    setMessage(
      `Thank you, ${firstname} ${lastname}! Your message has been successfully sent.`
    );
    
    // Reset form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      website: "",
      description: "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact Form"
        id="contactForm"
      >
        <div className="form-inputs">
          <div className="type_1">
            <FormInput
              name="firstname"
              id="firstname"
              placeholder="Enter Your First name..."
              value={formData.firstname}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.firstname}
            />
            {errors.firstname && (
              <p className="error-msg text-danger">{errors.firstname}</p>
            )}
          </div>

          <div className="type_1">
            <FormInput
              name="lastname"
              id="lastname"
              placeholder="Enter Your Last name..."
              value={formData.lastname}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.lastname}
            />
            {errors.lastname && (
              <p className="error-msg text-danger">{errors.lastname}</p>
            )}
          </div>
        </div>

        <div className="form-inputs">
          <div className="type_1">
            <FormInput
              type="email"
              name="email"
              id="emailInput"
              placeholder="Enter Your Email..."
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="error-msg text-danger">{errors.email}</p>}
          </div>

          <div className="type_1">
            <FormInput
              type="tel"
              name="phone"
              id="YourPhone"
              placeholder="Enter Your Phone Number..."
              value={formData.phone}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="error-msg text-danger">{errors.phone}</p>}
          </div>
        </div>

        <div className="form-inputs">
          <div className="type_1">
            <FormSelect
              name="website"
              id="websiteInput"
              placeholder="Select Subject"
              value={formData.website}
              onChange={handleInputChange}
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
              aria-required="true"
              aria-invalid={!!errors.website}
            />
            {errors.website && (
              <p className="error-msg text-danger">{errors.website}</p>
            )}
          </div>
        </div>

        <div className="form-textarea">
          <div className="type_1">
            <FormTextarea
              name="description"
              id="textareaInput"
              placeholder="Write Your Message Here..."
              value={formData.description}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="error-msg text-danger">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="tm-height-40 tm-height-lg-40" />

        <SubmitButton />
      </form>

      {message && <p className="success-msg text-success">{message}</p>}
    </>
  );
};

export default ContactForm;
