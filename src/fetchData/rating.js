import axiosInstance from "@/utils/axiosInstance";

export const getAllRatings = async () => {
  try {
    const response = await axiosInstance.get("rating");
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getRatingsBySapce = async ({ id }) => {
  try {
    const response = await axiosInstance.post("rating/bySpace", {
      spaceId: id,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

//byUser_Space
export const getRatingsByManagerId = async (userId) => {
  try {
    const response = await axiosInstance.post("rating", {
      userId: userId,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getOneRating = async ({ id }) => {
  try {
    const response = await axiosInstance.post("rating", {
      id: id,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const deleteRating = async ({ id }) => {
  try {
    const response = await axiosInstance.delete("rating", {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const addRating = async ({ data }) => {
  const { userId, spaceId, rate, message } = data;
  try {
    const res = await axiosInstance.post("rating", {
      userId,
      spaceId,
      rate,
      message,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const editRating = async ({ id, data }) => {
  const { rate, message } = data;

  try {
    const res = await axiosInstance.patch("rating", {
      id: id,
      rate,
      message,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
