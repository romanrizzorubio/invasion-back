import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';
import {getAvailableDamage, getDamage, isDefeated} from "../model/super";

export function updateSuperLife(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const availableDamage = getAvailableDamage(data);
    const table = data.tables[tableNumber];

    const actualDamage = value < availableDamage ? value : availableDamage;

    table.superDamage += actualDamage;

    if (isDefeated(data)) {
      data.phase = PhaseDict.SUPER_DEFEATED;
    }
  });

  broadcastGame();
  return state;
}
