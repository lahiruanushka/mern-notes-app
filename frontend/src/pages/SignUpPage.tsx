import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Alert } from "react-bootstrap";
import TextInputField from "../components/TextInputField";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import or define this context
import styleUtils from "../styles/utils.module.css";

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const { signUp } = useUser();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      setErrorMessage(null);
      await signUp(credentials);
      navigate("/"); // Redirect to homepage after successful signup
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  return (
    <Container className="py-4">
      <div className={styleUtils.container}>
        <h2 className="mb-4 text-center">Sign Up</h2>

        {errorMessage && (
          <Alert variant="danger" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            register={register}
            registerOptions={{ required: "Username is required" }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            registerOptions={{ required: "Email is required" }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            registerOptions={{ required: "Password is required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="w-100 mt-3"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpPage;
