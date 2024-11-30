import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Button, 
  Form, 
  Container, 
  Row, 
  Col, 
  Card, 
  Alert 
} from "react-bootstrap";
import TextInputField from "../components/TextInputField";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { User, Mail, Lock } from 'react-feather';

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
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-3">Create Account</h2>
                <p className="text-muted">Sign up to get started</p>
              </div>

              {errorMessage && (
                <Alert variant="danger" className="text-center">
                  {errorMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex align-items-center">
                    <User className="me-2 text-muted" size={18} />
                    Username
                  </Form.Label>
                  <TextInputField
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    register={register}
                    registerOptions={{ 
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters"
                      }
                    }}
                    error={errors.username}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="d-flex align-items-center">
                    <Mail className="me-2 text-muted" size={18} />
                    Email
                  </Form.Label>
                  <TextInputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    register={register}
                    registerOptions={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    error={errors.email}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Lock className="me-2 text-muted" size={18} />
                    Password
                  </Form.Label>
                  <TextInputField
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    register={register}
                    registerOptions={{ 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must include uppercase, lowercase, number, and special character"
                      }
                    }}
                    error={errors.password}
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Already have an account? {' '}
                  <a 
                    href="/login" 
                    className="text-primary fw-bold text-decoration-none"
                  >
                    Log In
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;