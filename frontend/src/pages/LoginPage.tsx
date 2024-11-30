import { useForm } from "react-hook-form";
import { LoginCredentials } from "../api/authApi";
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
import { useState } from "react";
import { Lock, User } from 'react-feather';

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const { login } = useUser();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      setErrorMessage(null);
      await login(credentials);
      navigate("/");
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
                <h2 className="fw-bold mb-3">Welcome Back</h2>
                <p className="text-muted">Sign in to continue to your account</p>
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
                    placeholder="Enter your username"
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

                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Lock className="me-2 text-muted" size={18} />
                    Password
                  </Form.Label>
                  <TextInputField
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    register={register}
                    registerOptions={{ 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    }}
                    error={errors.password}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox" 
                    label="Remember me" 
                    className="text-muted"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account? {' '}
                  <a 
                    href="/signup" 
                    className="text-primary fw-bold text-decoration-none"
                  >
                    Sign Up
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

export default LoginPage;