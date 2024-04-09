import { createContext } from 'react';

type TBoard = {
  lists: unknown[];
  move: (z: number, x: number, y: number, w: number) => void;
};

export default createContext<TBoard | undefined>(undefined);
