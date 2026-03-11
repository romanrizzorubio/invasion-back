import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateShip(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    table.ship += value;

    if (table.ship <= 0) {
      data.phase = PhaseDict.SHIP_OPEN;
    } else if (table.ship > data.shipMax) {
      table.ship = data.shipMax;
    }
  });

  broadcastGame();
  return state;
}
