import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getToken = () => {
  return localStorage.getItem("commit:token");
};

export const setToken = (token) => {
  localStorage.setItem("commit:token", token);
};

export const removeToken = () => {
  localStorage.removeItem("commit:token");
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const fetchUserProfile = async (userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const url = `${API_URL}/api/v1/user/singleUser/${userId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.userData;
    } else {
      throw new Error(response.data.message || "Failed to fetch user profile");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch user profile"
      );
    }
    throw error;
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${API_URL}/api/v1/user/updateUser/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.userData;
    } else {
      throw new Error(response.data.message || "Failed to update user profile");
    }
  } catch (error) {
    console.log("Error: ", error);
    if (error.response) {
      throw new Error(
        error.response.statusText || "Failed to update user profile"
      );
    }
    throw error;
  }
};
