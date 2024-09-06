import { useForm } from "react-hook-form";
import { LoginCredentials } from "../api/authApi";
import { Button, Form } from "react-bootstrap";
import TextInputField from "../components/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const { login } = useUser();

  // Handle form submission
  async function onSubmit(credentials: LoginCredentials) {
    try {
      setErrorMessage(null); // Reset error message before submission
      await login(credentials);
      navigate("/"); // Redirect to the homepage after successful login
    } catch (error) {
      setErrorMessage((error as Error).message); // Set the error message
    }
  }

  return (
    <div className={`${styleUtils.container} mt-5`}>
      <h2>Log In</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInputField
          name="username"
          label="Username"
          type="text"
          placeholder="Username"
          register={register}
          registerOptions={{ required: "Required" }}
          error={errors.username}
        />
        <TextInputField
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          register={register}
          registerOptions={{ required: "Required" }}
          error={errors.password}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={styleUtils.width100}
        >
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
