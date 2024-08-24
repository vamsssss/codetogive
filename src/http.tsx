import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (userData: {
  email: string;
  name: string;
  role: string;
  size?: number;
  password: string;
  tags: { id: number }[];
}) => {
  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  userData: {
    email?: string;
    name?: string;
    role?: string;
    size?: number;
    password?: string;
    tags?: { id: number }[];
  }
) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    return response.data; // This will return the user and the token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
