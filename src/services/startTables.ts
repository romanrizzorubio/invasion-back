import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type {GameData} from "../types/GameData";
import {PhaseDict} from "../types/dicts";
import {
  ENEMY_COMP,
  ENEMY_INIT,
  SHIP_MAX,
  SUPER_LIFE_EXP_MAX,
  SUPER_LIFE_MAX,
  SUPER_PLAN_INI,
  SUPER_PLAN_MAX
} from "../types/constants";
import {getNumPlayers} from "../model/players";

export function startTables(): GameData {
  const state = updateGameState((data) => {
    const {normal, expert} = getNumPlayers(data);
    const numPlayers = normal + expert;

    data.phase = PhaseDict.SUPER;
    data.superLifeMax = (SUPER_LIFE_MAX * normal) + (SUPER_LIFE_EXP_MAX * expert);
    data.superPlanIni = SUPER_PLAN_INI * numPlayers;
    data.superPlanMax = SUPER_PLAN_MAX * numPlayers;
    data.shipMax = SHIP_MAX * numPlayers;
    data.enemyInit = (ENEMY_INIT * data.tables.length) + (ENEMY_COMP * numPlayers);
    data.enemyMax = data.enemyInit;
  });

  broadcastGame();
  return state;
}
