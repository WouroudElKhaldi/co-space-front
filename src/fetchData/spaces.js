import axiosInstance from "@/utils/axiosInstance";

// getting the top 5 rated spaces
export const getTopRatedSpaces = async () => {
  const res = await axiosInstance.get("space/byRate");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};

// getting all the spaces (approved)
export const getAllSpaces = async () => {
  const res = await axiosInstance.post("space", {
    status: "Accepted",
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res;
};

// getting all the spaces (approved)
export const getOneSpace = async ({ id }) => {
  const res = await axiosInstance.post("space/byId", {
    id: id,
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res;
};

// getting all the spaces (approved)
export const getSpacesByUser = async ({ userId }) => {
  try {
    const res = axiosInstance.post("space/byUser", {
      userId: userId,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

// getting space images
export const getSpaceImage = async (spaceId) => {
  try {
    const res = await axiosInstance.post("space/image/bySpace", {
      spaceId: spaceId,
    });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

// filtering spaces
export const filterSpaces = async ({
  minPrice,
  maxPrice,
  selectedAmenities,
  selectedCategories,
}) => {
  try {
    const res = await axiosInstance.post("space/filter", {
      minPrice,
      maxPrice,
      amenities: selectedAmenities,
      categories: selectedCategories,
    });

    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

// search a space by name or city
export const searchSpace = async ({ data }) => {
  try {
    const res = await axiosInstance.post("space/search", {
      data: data,
    });

    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const getByCity = async ({ city }) => {
  try {
    const res = await axiosInstance.post("space/byCity", {
      cityName: city,
    });

    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

// getting space images
export const deleteSpace = async ({ spaceId }) => {
  try {
    const res = await axiosInstance.delete("space", { data: { id: spaceId } });
    return res;
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};
