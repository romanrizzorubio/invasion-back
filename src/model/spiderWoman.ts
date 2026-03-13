import {GameData} from "../types/GameData";

export const getDamage = (data: GameData) => data.tables.reduce((acc, table) =>
  acc + table.spiderWoman, 0);

export const getAvailableDamage = (data: GameData) => {
  const damage = getDamage(data);
  const spiderWomanMax = data.spiderWomanMax;

  return spiderWomanMax - damage;
};

export const isDefeated = (data: GameData) => {
  const damage = getDamage(data);

  return damage >= data.spiderWomanMax;
};

