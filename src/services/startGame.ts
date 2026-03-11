import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';
import {ENEMY_COMP, ENEMY_INIT, EXPOSED_MAX, SHIP_MAX, SUPER_LIFE_MAX, SUPER_PLAN_MAX} from "../types/constants";

export function startGame(): GameData {
  const state = updateGameState((data) => {
    const numPlayers = data.tables.reduce((acc, table) =>
        acc + table.players.length,
      0);

    data.superLifeMax = SUPER_LIFE_MAX * numPlayers;
    data.superPlanMax = SUPER_PLAN_MAX * numPlayers;
    data.shipMax = SHIP_MAX * numPlayers;
    data.enemyInit = ENEMY_INIT + (ENEMY_COMP * numPlayers);
    data.exposedMax = EXPOSED_MAX * numPlayers;

    data.phase = PhaseDict.SUPER;
  });

  broadcastGame();
  return state;
}
