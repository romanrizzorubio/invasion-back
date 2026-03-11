import { PhaseDict } from '../types/dicts';
import {resetGameState, updateGameState} from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function resetGame(): GameData {
  const state = resetGameState();

  broadcastGame();
  return state;
}
