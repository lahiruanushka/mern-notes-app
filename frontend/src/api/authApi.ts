import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

function getErrorMessage(error: any): string {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.error || 'An unexpected error occurred';
  }
  return 'Network error, please try again later';
}

export async function getLoggedInUser(): Promise<User> {
  try {
    const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
      withCredentials: true, // Include cookies with the request
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch logged-in user:', error);
    throw new Error(getErrorMessage(error));
  }
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  try {
    const response = await axios.post<User>(`${API_BASE_URL}/users/signup`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies with the request
    });
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw new Error(getErrorMessage(error));
  }
}

export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await axios.post<User>(`${API_BASE_URL}/users/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies with the request
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(getErrorMessage(error));
  }
}

export async function logout(): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/users/logout`, {}, {
      withCredentials: true, // Include cookies with the request
    });
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error(getErrorMessage(error));
  }
}
