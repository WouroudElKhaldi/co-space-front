import axiosInstance from "@/utils/axiosInstance";

export const LoginFunction = async (data) => {
  try {
    const { email, password } = data;
    const res = await axiosInstance.post("/user/login", {
      email: email,
      password: password,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const SignupFunction = async (data) => {
  try {
    const { fullName, email, password, role, phoneNumber } = data;
    const res = await axiosInstance.post("/user/signup", {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      phoneNumber: phoneNumber,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const VerifyFunction = async (data) => {
  try {
    const { email, code } = data;
    const res = await axiosInstance.post("/user/verify", {
      email: email,
      code: code,
    });
    if (res.status !== 200) {
      throw new Error("Failed to Verify Account");
    }
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed");
  }
};

export const RecoverPassword = async ({ email, code }) => {
  try {
    const res = await axiosInstance.post("/user/recover", {
      email: email,
      code: code,
    });
    return res;
  } catch (error) {
    console.log(error);
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const ResetPassword = async (data) => {
  try {
    const { email, password, resetCode, userCode } = data;
    const res = await axiosInstance.post("/user/reset", {
      email: email,
      password: password,
      resetCode: resetCode,
      userCode: userCode,
    });
    return res;
  } catch (error) {
    console.log(error);
    return { errorMessage: error.response.data, status: error.response.status };
  }
};

export const Logout = async () => {
  await axiosInstance.post("user/logout");
};
