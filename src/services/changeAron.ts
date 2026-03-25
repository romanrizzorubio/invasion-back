import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function changeAron(tableNumber: number): GameData {
  const state = updateGameState((data) => {
    data.tables.forEach((table) => {
      table.aron = table.tableNumber === tableNumber;
    })
  });

  broadcastGame();
  return state;
}
