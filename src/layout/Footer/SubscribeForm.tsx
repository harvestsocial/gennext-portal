
import React from "react";
import FormInput from "@/components/UI/FormInput";

interface SubscribeFormData {
  email: string;
}

const SubscribeButton: React.FC<{ pending: boolean }> = ({ pending }) => {
  return (
    <button
      type="submit"
      className="footer__input__btn"
      aria-label="Subscribe"
      disabled={pending}
    >
      <span>{pending ? "Subscribing..." : "Subscribe"}</span>
      <span className="footer__input__btn__icon" aria-hidden="true">
        {/* icon svg */}
      </span>
    </button>
  );
};

const SubscribeForm = () => {
  const [pending, setPending] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const emailValue = formData.get("email");

    const data: SubscribeFormData = {
      email: typeof emailValue === "string" ? emailValue.trim() : "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      alert("Invalid email address");
      setPending(false);
      return;
    }

    setTimeout(() => {
      alert(`'${data.email}' has been subscribed successfully!`);
      form.reset();
      setPending(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubscribe} className="footer__input">
      <FormInput
        type="email"
        name="email"
        id="email"
        className="footer__input__email"
        placeholder="Enter Your Email Address"
        required
      />
      <SubscribeButton pending={pending} />
    </form>
  );
};

export default SubscribeForm;
