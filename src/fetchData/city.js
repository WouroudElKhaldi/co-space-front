import axiosInstance from "@/utils/axiosInstance";

export const getAllCities = async () => {
  try {
    const response = await axiosInstance.get("city");
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getOneCity = async ({ id }) => {
  try {
    const response = await axiosInstance.post("city", {
      id: id,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const deleteCity = async ({ id }) => {
  try {
    const response = await axiosInstance.delete("city", {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const addCity = async ({ city }) => {
  try {
    const res = await axiosInstance.post("city", {
      city,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const editCity = async ({ id, city }) => {
  try {
    const res = await axiosInstance.patch("city", {
      id: id,
      city,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
