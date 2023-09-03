import styles from "./styles.module.css";
import type { IHandleClick } from "../grid";

export default function Cell({
  column,
  row,
  handleCellClick,
  active,
}: {
  column: number;
  row: number;
  handleCellClick: IHandleClick;
  active: boolean;
}) {
  const onClick = () => {
    handleCellClick({ column, row });
  };

  return (
    <div
      onClick={onClick}
      className={`${styles.cell} ${active ? styles.active : ""}`}
    />
  );
}
