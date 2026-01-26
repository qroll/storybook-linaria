"use client";

import styles from "./page.module.css";
import { Alert, Cat, Dog, Navbar } from "@lifesg/react-design-system";
import "@lifesg/react-design-system/styles.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Alert type="error">Hello</Alert>
        <Navbar items={{desktop: []}} />
        <Cat type="tabby" />
        <Cat type="siamese" size="small" />
        <Dog type="husky" />
        <Dog type="poodle" style={{height: 100, width: 180}} />
      </main>
    </div>
  );
}
