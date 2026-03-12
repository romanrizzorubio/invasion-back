import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type {GameData} from "../types/GameData";
import {PhaseDict} from "../types/dicts";

export function startTables(): GameData {
  const state = updateGameState((data) => {
    data.phase = PhaseDict.SUPER;
  });

  broadcastGame();
  return state;
}
