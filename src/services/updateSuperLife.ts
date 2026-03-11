import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateSuperLife(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.superLife += value;

    if (table.superLife <= 0) {
      data.phase = PhaseDict.SUPER_DEFEATED;
    } else if (table.superLife > data.superLifeMax) {
      table.superLife = data.superLifeMax;
    }
  });

  broadcastGame();
  return state;
}
