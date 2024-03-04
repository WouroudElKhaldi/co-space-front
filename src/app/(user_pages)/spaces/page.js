import SpacesPage from "@/components/spacesPage/spacesPage";
import styles from "./page.module.css";

export default async function Spaces() {
  return (
    <main>
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>Coworking spaces designed for you</p>
          </div>
        </div>
      </section>
      <section className={styles.container}>
        <SpacesPage />
      </section>
    </main>
  );
}
