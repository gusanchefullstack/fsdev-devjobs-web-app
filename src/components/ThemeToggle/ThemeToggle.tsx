import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.icon}
        src="/assets/desktop/icon-sun.svg"
        alt=""
        aria-hidden="true"
      />
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        className={styles.switch}
        onClick={toggleTheme}
      >
        <span className={styles.thumb} data-checked={isDark} />
      </button>
      <img
        className={styles.icon}
        src="/assets/desktop/icon-moon.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
