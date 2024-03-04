"use server";

import styles from "./page.module.css";
import SignUpComp from "@/components/signup/signup";

const Login = () => {
  return (
    <div style={styles.container}>
      <SignUpComp />
    </div>
  );
};
export default Login;
