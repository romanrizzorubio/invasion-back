import {
  SHIP_MAX,
  SUPER_LIFE_MAX,
  SUPER_PLAN_INIT,
} from '../types/constants';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import {TableData} from "../types/TableData";
import {PlayerData} from "../types/PlayerData";

type InitTableResponse = {
  currentTable: number;
};

export function initTable(players: PlayerData[]): InitTableResponse {
  let currentTable = -1;

  const state = updateGameState((data) => {
    const table: TableData = {
      players,
      superLife: SUPER_LIFE_MAX * players.length,
      superPlan: SUPER_PLAN_INIT * players.length,
      spiderWoman: false,
      ship: SHIP_MAX * players.length,
      enemy: 0,
      exposed: 0,
    };

    data.tables.push(table);

    currentTable = data.tables.indexOf(table);
  });

  broadcastGame();
  return {
    currentTable,
  };
}
