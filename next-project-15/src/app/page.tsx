"use client";
import Image from "next/image";
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
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
