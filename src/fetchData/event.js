import axiosInstance from "@/utils/axiosInstance";

export const getAllEvents = async () => {
  try {
    const response = await axiosInstance.get("event");
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getEventsByUser = async () => {
  try {
    const response = await axiosInstance.get("event");
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getOneEvent = async ({ id }) => {
  try {
    const response = await axiosInstance.post("event", {
      id: id,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const deleteEvent = async ({ id }) => {
  try {
    const response = await axiosInstance.delete("event", {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const addEvent = async ({ data, startDate, endDate }) => {
  const { spaceId, title, description } = data;
  try {
    const res = await axiosInstance.post("event", {
      spaceId,
      title,
      startDate,
      endDate,
      description,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const editEvent = async ({ id, data }) => {
  const { title, startDate, endDate, description } = data;
  try {
    const res = await axiosInstance.patch("event", {
      id: id,
      title,
      startDate,
      endDate,
      description,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
