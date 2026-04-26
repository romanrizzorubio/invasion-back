import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function changeAron(next: boolean): GameData {
  const state = updateGameState((data) => {
    if (data.aron !== undefined) {
      if (next) {
        data.aron++;
        if (data.aron > data.tables.length) {
          data.aron = 1;
        }
      } else {
        data.aron--;
        if (data.aron < 1) {
          data.aron = data.tables.length;
        }
      }
    }
  });

  broadcastGame();
  return state;
}
