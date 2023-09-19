import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import GridComponent from "./components/grid";

import styles from "./styles.module.css";

// state machine interface
export enum State {
  Running,
  Stopped,
}

function App() {
  const [state, setState] = useState(State.Stopped);

  return (
    <>
      <TransformWrapper>
        <TransformComponent>
          <GridComponent width={80} height={40} state={state} />
        </TransformComponent>
      </TransformWrapper>

      <div className={styles.actionsBar}>
        <button
          onClick={() => {
            setState((state) =>
              state === State.Running ? State.Stopped : State.Running
            );
          }}
        >
          {state === State.Running ? "Stop" : "Start"}
        </button>
      </div>
    </>
  );
}

export default App;
