import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

export const getAllRules = async () => {
  try {
    const response = await axiosInstance.get("rules");
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

//byUser_Space
export const getRulesByManagerId = async (userId) => {
  try {
    const response = await axiosInstance.post("rules/byManagerId", {
      userId: userId,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getOneRule = async ({ id }) => {
  try {
    const response = await axiosInstance.post("rules", {
      id: id,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const deleteRule = async ({ id }) => {
  try {
    const response = await axiosInstance.delete("rules", {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const addRule = async ({ spaceId, name, image }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}rules`,
      {
        spaceId,
        name,
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res) {
      return res;
    }
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const editRule = async ({ id, name, image }) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}rules`,
      {
        id,
        name,
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
