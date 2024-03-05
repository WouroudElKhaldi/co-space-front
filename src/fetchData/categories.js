import axiosInstance from "@/utils/axiosInstance";

export const getCategories = async () => {
  const res = await axiosInstance.get("category");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res;
};
