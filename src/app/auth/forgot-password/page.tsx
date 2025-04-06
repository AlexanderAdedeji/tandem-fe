import React from "react";
import ForgotPasswordForm from "../components/forms/forget-password-form";

const ForgotPassword = () => {
  const handleSubmit = (email: string) => {
    // Handle the forgot password submission
    console.log("Password reset requested for:", email);
    // Add your password reset logic here
  };

  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
