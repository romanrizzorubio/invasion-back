import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function spiderWomanLeaves(tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.spiderWoman = true;

    data.phase = PhaseDict.SPIDER_WOMAN_LEAVES;
  });

  broadcastGame();
  return state;
}
