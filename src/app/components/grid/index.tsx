import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { State } from "../..";
import Cell from "../cell";
import styles from "./styles.module.css";

interface GridProps {
  width: number;
  height: number;
  state: State;
  speed: number;
}

export interface IHandleClick {
  ({ column, row }: { column: number; row: number }): void;
}

export default function Grid({ width, height, state, speed }: GridProps) {
  const [grid, setGrid] = useState(getGrid({ width, height }));

  const handleCellClick: IHandleClick = ({ column, row }) => {
    // if (controllerState !== ControllerState.Idle) return;
    grid[column][row] = !grid[column][row];
    setGrid([...grid]);
  };

  useEffect(() => {
    if (state !== State.Running) return;

    const interval = setInterval(() => {
      console.log("running simulation");
      runSimulation({ grid, setGrid });
    }, Math.ceil(5000 / speed));

    return () => clearInterval(interval);
  }, [state, grid]);

  return (
    <>
      <div
        className={styles.grid}
        style={
          {
            "--width": width,
            "--height": height,
          } as CSSProperties
        }
      >
        {grid.map((columns, columnIndex) =>
          columns.map((state, rowIndex) => (
            <Cell
              key={`${columnIndex}-${rowIndex}`}
              column={columnIndex}
              row={rowIndex}
              active={state}
              handleCellClick={handleCellClick}
            />
          ))
        )}
      </div>
    </>
  );
}

function getGrid({ width, height }: { width: number; height: number }) {
  const grid = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).map(() => false)
  );

  return grid;
}

function runSimulation({
  grid,
  setGrid,
}: {
  grid: boolean[][];
  setGrid: Dispatch<SetStateAction<boolean[][]>>;
}) {
  const newGrid = JSON.parse(JSON.stringify(grid));
  for (let column = 0; column < grid.length; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      const neighborCount = getNeighborCount({ grid, column, row });

      // alive cells with 2 or 3 neighbors
      if (grid[column][row]) {
        if (neighborCount === 2 || neighborCount === 3) {
          newGrid[column][row] = true;
        } else {
          newGrid[column][row] = false;
        }
      }
      // dead cells with exactly 3 neighbors
      else {
        if (neighborCount === 3) {
          newGrid[column][row] = true;
        }
      }
    }
  }

  setGrid(newGrid);
}

function getNeighborCount({
  grid,
  column,
  row,
}: {
  grid: boolean[][];
  column: number;
  row: number;
}) {
  const neighbors = [
    [column - 1, row - 1],
    [column - 1, row],
    [column - 1, row + 1],
    [column, row - 1],
    [column, row + 1],
    [column + 1, row - 1],
    [column + 1, row],
    [column + 1, row + 1],
  ];

  const sum = neighbors.reduce((acc, [x, y]) => {
    const column = grid[x];
    if (!column) return acc;
    const cell = column[y];
    if (!cell) return acc;
    return acc + Number(cell);
  }, 0);

  return sum;
}
