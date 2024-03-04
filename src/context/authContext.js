"use client";

// import { useState, useEffect, createContext } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { Logout } from "@/fetchData/auth";
// import useAlertStore from "@/zustand/alertStore";

// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const { alertData, setAlertData } = useAlertStore();
//   const [user, setUser] = useState(null);
//   const [checkUser, setCheckUser] = useState(true);
//   const [userUpdated, setUserUpdated] = useState(false);

//   useEffect(() => {
//     if (!user && user === null) {
//       fetchUserData();
//     }
//   }, [user, userUpdated]);

//   const fetchUserData = async () => {
//     try {
//       setCheckUser(true);
//       const response = await axiosInstance.get("user/logged-in-user");
//       setUser(response.data.user);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setCheckUser(false);
//     }
//   };

//   const LogOut = () => {
//     Logout();
//     // Clear the "token" cookie
//     document.cookie = "token=; max-age=0; path=/;";
//     // Clear user state
//     setUser(null);

//     // Set alert data
//     setAlertData({
//       type: "success",
//       message: "Logged out successfully 😁 !",
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         checkUser,
//         setUser,
//         LogOut,
//         fetchUserData,
//         setUserUpdated,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Logout } from "@/fetchData/auth";
import axiosInstance from "../utils/axiosInstance";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [checkUser, setCheckUser] = useState(true);
  // const [userUpdated, setUserUpdated] = useState(false);

  // useEffect(() => {
  //   if (!user || userUpdated) {
  //     fetchUserData();
  //   }
  // }, [user, userUpdated]);

  useEffect(() => {
    if (checkUser) {
      fetchUserData();
    }
  }, [checkUser, user]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);

      const response = await axiosInstance.get("user/logged-in-user");
      setUser(response.data.user);
      console.log("userrrrr", response.data.user);
      // setUserUpdated(false);
    } catch (err) {
      setUser(null);
    } finally {
      setCheckUser(false);
    }
  };

  const LogOut = async () => {
    await Logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        LogOut,
        fetchUserData,
        checkUser,
        // setUserUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
