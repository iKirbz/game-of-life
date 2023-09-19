import styles from "./styles.module.css";
import type { IHandleClick } from "../grid";

export default function Cell({
  column,
  row,
  active,
  handleCellClick,
}: {
  column: number;
  row: number;
  active: boolean;
  handleCellClick: IHandleClick;
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
