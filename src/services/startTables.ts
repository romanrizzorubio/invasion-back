import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { PhaseDict } from "../types/dicts";
import {
  ENEMY_COMP,
  ENEMY_INIT,
  EXPOSED_MAX,
  SHIP_MAX,
  SPIDER_WOMAN_MAX,
  SUPER_LIFE_EXP_MAX,
  SUPER_LIFE_MAX,
  SUPER_PLAN_INI,
  SUPER_PLAN_MAX, WATCHER_TABLE
} from "../types/constants";
import { getNumPlayers } from "../model/players";

export function startTables(): GameData {
  const state = updateGameState((data) => {

    const { normal, expert } = getNumPlayers(data);
    const numPlayers = normal + expert;

    data.phase = PhaseDict.SUPER;
    data.spiderWomanMax = SPIDER_WOMAN_MAX;
    data.superLifeMax = SUPER_LIFE_MAX * normal + SUPER_LIFE_EXP_MAX * expert;
    data.superPlanIni = SUPER_PLAN_INI * numPlayers;
    data.superPlanMax = SUPER_PLAN_MAX * numPlayers;
    data.shipMax = SHIP_MAX * numPlayers;
    data.exposedMax = EXPOSED_MAX * numPlayers;
    data.enemyInit = ENEMY_INIT * data.tables.length + ENEMY_COMP * numPlayers;
    data.watchers = Math.floor(data.tables.length / WATCHER_TABLE);

    const uatuDiff = Math.floor(data.tables.length / (data.watchers * 2));
    const aronDiff = WATCHER_TABLE - uatuDiff;
    let tableIndex = Math.floor(Math.random() * uatuDiff);

    for (let i = 0; i < data.watchers; i++) {
      data.tables[tableIndex].uatu = true;
      tableIndex+=aronDiff;
      data.tables[tableIndex].aron = true;
      tableIndex+=uatuDiff;
    }
  });

  broadcastGame();
  return state;
}
