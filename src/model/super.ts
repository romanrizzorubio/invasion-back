import {GameData} from "../types/GameData";

export const getDamage = (data: GameData) => data.tables.reduce((acc, table) =>
  acc + table.superDamage, 0);

export const getAvailableDamage = (data: GameData) => {
  const damage = getDamage(data);
  const superLifeMax = data.superLifeMax;

  return superLifeMax - damage;
};

export const isDefeated = (data: GameData) => {
  const damage = getDamage(data);

  return damage >= data.superLifeMax;
};

