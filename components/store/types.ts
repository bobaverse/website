export enum GameState {
  Ready,
  Started,
  SureUp,
  Finalizing,
  Finished
}

interface PlinkoResults {
  [key: string]: number
}

export interface PlinkoState {
  state: GameState;
  setState: (state: GameState) => void;
  results: PlinkoResults;
  addResult: (key: string, value: number) => void;
  clearResults: () => void;
}