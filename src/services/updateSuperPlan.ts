import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateSuperPlan(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.superPlan += value;

    if (table.superPlan >= data.superPlanMax) {
      data.phase = PhaseDict.SUPER_WINER;
    } else if (table.superPlan < 0) {
      table.superPlan = 0;
    }
  });

  broadcastGame();
  return state;
}
