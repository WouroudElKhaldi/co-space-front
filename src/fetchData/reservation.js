import axiosInstance from "@/utils/axiosInstance";

export const addReservation = async ({ data }) => {
  const { type, serviceId, date, userId } = data;
  try {
    const response = await axiosInstance.post("reservation", {
      type: type,
      serviceId: serviceId,
      date: date,
      userId: userId,
    });
    return response;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
