import { Avatar } from "@mui/material";
import styles from "./eventComp.module.css";
import Image from "next/image";
export function EventComp({ data }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateObj = new Date(date);
    const localDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    ); // Adjust for timezone offset
    return localDate.toLocaleDateString("en-GB", options);
  };

  return (
    <div className={styles.holder}>
      <Image
        src="/workHero.jpg"
        width={100}
        height={100}
        alt="space"
        className={styles.img}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>{data && data.title}</h2>
        <p className={styles.space}>{data && data.spaceId.name}</p>

        <p className={styles.description}>{data && data.description}</p>

        <p className={styles.date}>
          Start Date : {data && formatDate(data.startDate)}
        </p>
        <p className={styles.date}>
          End Date: {data && formatDate(data.endDate)}
        </p>
      </div>
    </div>
  );
}
