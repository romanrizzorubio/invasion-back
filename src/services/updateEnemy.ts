import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateEnemy(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.enemy += value;

    if (table.enemy <= 0) {
      data.phase = PhaseDict.OSBORN;
    }
  });

  broadcastGame();
  return state;
}
