"use server";

import styles from "./page.module.css";
import LoginComp from "@/components/login/login";

const Login = () => {
  return (
    <div style={styles.container}>
      <LoginComp />
    </div>
  );
};
export default Login;
