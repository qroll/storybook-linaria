"use client";

import styles from "./page.module.css";
import { Dog } from "@lifesg/react-design-system/dog";
import { Cat } from "@lifesg/react-design-system/cat";
import { Navbar } from "@lifesg/react-design-system/navbar";
import { Alert } from "@lifesg/react-design-system/alert";

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
