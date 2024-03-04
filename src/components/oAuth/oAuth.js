"use client";

import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import app from "@/app/firebase";
import { useRouter } from "next/navigation";

const OAuth = ({ isLogin }) => {
  const [loading, setLoading] = useState(false);
  const { fetchUserData } = useContext(AuthContext);
  const router = useRouter();
  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}user/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );
      setLoading(false);
      await fetchUserData();
      router.push("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingButton />
      ) : (
        <Button
          variant="contained"
          fullWidth
          onClick={handleGoogleClick}
          startIcon={
            <Image src={"/G.png"} width={20} height={20} alt="googleImage" />
          }
          sx={{
            color: "#b4602d",
            fontWeight: "600",
            fontSize: "16px",
            textTransform: "none",
            bgcolor: "white !important",
            height: "48px",
            ":hover": {
              bgcolor: "#ededf5 !important",
            },
          }}
        >
          {isLogin ? "Login with Google" : "Sign up with Google"}
        </Button>
      )}
    </>
  );
};

export default OAuth;
