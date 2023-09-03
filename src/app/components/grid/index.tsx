import Cell from "../cell";
import styles from "./styles.module.css";

interface GridProps {
  width: number;
  height: number;
}

function getGrid({ width, height }: { width: number; height: number }) {
  const grid = Array.from({ length: height }).map((_, row) =>
    Array.from({ length: width }).map((_, column) => (
      <Cell key={`${row}-${column}`} />
    ))
  );

  return grid;
}

export default function Grid({ width, height }: GridProps) {
  const grid = getGrid({ width, height });

  return (
    <div
      style={{
        "--width": width,
        "--height": height,
      }}
      className={styles.grid}
    >
      {grid}
    </div>
  );
}
