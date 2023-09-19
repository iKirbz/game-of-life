import { State } from "..";
import styles from "./styles.module.css";

export default function ActionsBar({
  state,
  handleStateChange,
}: {
  state: State;
  handleStateChange: () => void;
}) {
  return (
    <div className={styles.actionsBar}>
      <button onClick={() => handleStateChange()}>
        {state === State.Running ? "Stop" : "Start"}
      </button>
    </div>
  );
}
