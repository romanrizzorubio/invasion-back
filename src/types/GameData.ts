import {Phase} from "./dicts";
import {TableData} from "./TableData";

export type GameData = {
  tables: TableData[];
  phase: Phase;
  superLifeMax: number;
  superPlanMax: number;
  shipMax: number;
  enemyInit: number;
  exposedMax: number;
  end: number;
};
