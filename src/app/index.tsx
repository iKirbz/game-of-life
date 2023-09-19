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

  const handleStateChange = () => {
    setState((state) =>
      state === State.Running ? State.Stopped : State.Running
    );
  };

  return (
    <>
      <TransformWrapper>
        <TransformComponent>
          <GridComponent width={80} height={40} state={state} />
        </TransformComponent>
      </TransformWrapper>
      <ActionsBar state={state} handleStateChange={handleStateChange} />
    </>
  );
}

export default App;
