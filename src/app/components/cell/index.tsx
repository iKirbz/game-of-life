import { useState } from "react";
import styles from "./styles.module.css";

export default function Cell({ onClick }: { onClick: () => void }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`${styles.cell} ${isActive ? styles.active : ""}`}
    />
  );
}
