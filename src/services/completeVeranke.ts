import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';
import {isOpen} from "../model/ship";

export function completeVeranke(tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.completeVeranke = true;
  });

  broadcastGame();
  return state;
}
