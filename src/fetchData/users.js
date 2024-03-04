import axiosInstance from "@/utils/axiosInstance";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("user");
  if (response.status !== 200) {
    throw new Error("Failed to fetch Users");
  }
  return response.data;
};

export const getOneUser = async ({ id }) => {
  const response = await axiosInstance.post("user", {
    id: id,
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch User");
  }
  return response.data;
};

export const deleteUser = async ({ id }) => {
  try {
    const response = await axiosInstance.delete("user", {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const addUser = async ({
  role,
  fullName,
  email,
  password,
  phoneNumber,
  image,
  status,
}) => {
  try {
    const res = await axiosInstance.post("user", {
      role,
      fullName,
      email,
      password,
      phoneNumber,
      image,
      status,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const editUser = async ({ id, data }) => {
  const {
    role,
    fullName,
    email,
    password,
    phoneNumber,
    image,
    checkPassword,
    status,
  } = data;
  try {
    const res = await axiosInstance.patch("user", {
      id: id,
      role,
      fullName,
      email,
      password,
      phoneNumber,
      image,
      checkPassword,
      admin: true,
      status,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
