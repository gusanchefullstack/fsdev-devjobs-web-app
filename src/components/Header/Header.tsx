import { Link } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";
import type { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <Link to="/" className={styles.logoLink} aria-label="Devjobs home">
            <img
              src="/assets/desktop/logo.svg"
              alt="Devjobs"
              className={styles.logo}
            />
          </Link>
          <ThemeToggle />
        </div>
        {children}
      </div>
    </header>
  );
}
