import axios from "axios";
import client from "../../api/client";
import { LoginPayload, RegisterPayload } from "../../types/auth";
import { ENDPOINTS } from "../../utils/constants";

// Register user

const register = async (userData: RegisterPayload) => {
  const response = await client
    .publicClient()
    .post(ENDPOINTS.REGISTER, userData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

// Login user
const login = async (userData: LoginPayload) => {
  const response = await client.publicClient().post(ENDPOINTS.LOGIN, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
