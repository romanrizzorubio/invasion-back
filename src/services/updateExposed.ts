import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateExposed(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.exposed += value;

    if (table.exposed >= data.exposedMax) {
      data.phase = PhaseDict.OSBORN_SHIELD;
    } else if (table.exposed < 0) {
      table.exposed = 0;
    }
  });

  broadcastGame();
  return state;
}