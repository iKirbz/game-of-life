import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import GridComponent from "./components/grid";
import ActionsBar from "./action-bar";

// state machine interface
export enum State {
  Running,
  Stopped,
}

function App() {
  const [state, setState] = useState(State.Stopped);
  const [speed, setSpeed] = useState(30);

  const handleStateChange = () => {
    setState((state) =>
      state === State.Running ? State.Stopped : State.Running
    );
  };

  return (
    <>
      <TransformWrapper disablePadding={true}>
        <TransformComponent>
          <GridComponent width={60} height={30} state={state} speed={speed} />
        </TransformComponent>
      </TransformWrapper>
      <ActionsBar
        state={state}
        handleStateChange={handleStateChange}
        speed={speed}
        setSpeed={setSpeed}
      />
    </>
  );
}

export default App;
