import axiosInstance from "@/utils/axiosInstance";

export const contactUs = async (data) => {
  const {
    message,
    fullName,
    email,
    phoneNumber,
    company,
    subject,
    recieverName,
    recieverEmail,
  } = data;
  const res = await axiosInstance.post("contact", {
    message: message,
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    company: company,
    subject: subject,
    recieverName: recieverName,
    recieverEmail: recieverEmail,
  });

  if (res.status !== 200) {
    throw new Error("Failed to send message");
  }

  return res.data;
};
