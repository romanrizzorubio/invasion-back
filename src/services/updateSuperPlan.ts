import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateSuperPlan(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.superThreat -= value;

    if (table.superThreat >= data.superPlanMax) {
      data.phase = PhaseDict.SUPER_WINER;
    } else if (table.superThreat < 0) {
      table.superThreat = 0;
    }
  });

  broadcastGame();
  return state;
}
