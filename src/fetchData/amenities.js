import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

export const getAmenities = async () => {
  const res = await axiosInstance.get("amenities");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};

export const deleteAmenity = async ({ id }) => {
  try {
    const response = await axiosInstance.delete("amenities", {
      data: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const addAmenity = async ({ name, category, image }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}/amenities`,
      {
        name,
        category,
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

export const editAmenity = async ({ id, data }) => {
  const { name, category, image } = data;
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_PATH}amenities`,
      {
        id: id,
        name,
        category,
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
