import { State } from "..";
import styles from "./styles.module.css";

export default function ActionsBar({
  state,
  handleStateChange,
  speed,
  setSpeed,
}: {
  state: State;
  handleStateChange: () => void;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const numberString = event.target.value;

    if (!isNaN(parseInt(numberString))) setSpeed(parseInt(numberString));
    else setSpeed(0);
  };

  return (
    <div className={styles.actionsBar}>
      <button onClick={() => handleStateChange()}>
        {state === State.Running ? "Stop" : "Start"}
      </button>
      <div className={styles.slider}>
        <input
          className={styles.sliderBar}
          type="range"
          min="10"
          max="100"
          value={speed}
          onChange={handleSliderChange}
        />
        <input
          className={styles.sliderNumber}
          type="number"
          min="0"
          max="999"
          value={speed}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
