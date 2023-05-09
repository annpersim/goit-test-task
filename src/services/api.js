import axios from "axios";

const BASE_URL = "https://6459ebb895624ceb21f27cb7.mockapi.io/";
axios.defaults.baseURL = BASE_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`/Users`);
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};
