import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';
import {getAvailableDamage, isDefeated} from "../model/spiderWoman";

export function updateSpiderWoman(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const availableDamage = getAvailableDamage(data);
    const table = data.tables[tableNumber];

    const actualDamage = value < availableDamage ? value : availableDamage;

    table.spiderWoman += actualDamage;

    if (isDefeated(data)) {
      data.phase = PhaseDict.SPIDER_WOMAN_LEAVES;
    }
  });

  broadcastGame();
  return state;
}
