import {
  SHIP_MAX,
} from '../types/constants';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import {TableData} from "../types/TableData";
import {PlayerData} from "../types/PlayerData";

type InitTableResponse = {
  currentTable: number;
};

export function initTable(players: PlayerData[], expert: boolean): InitTableResponse {
  let currentTable = -1;

  updateGameState((data) => {
    const table: TableData = {
      players,
      expert,
      superDamage: 0,
      superThreat: 0,
      spiderWoman: false,
      ship: 0,
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
