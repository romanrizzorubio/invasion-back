import { Router, Request, Response } from 'express';
import {getData} from '../services/getData';
import {initGame} from "../services/initGame";
import {advanceGame} from "../services/advanceGame";
import {updateSuperLife} from "../services/updateSuperLife";
import {updateSuperPlan} from "../services/updateSuperPlan";
import {updateSpiderWoman} from "../services/updateSpiderWoman";
import {updateShip} from "../services/updateShip";
import {updateEnemy} from "../services/updateEnemy";
import {updateExposed} from "../services/updateExposed";
import {initTable} from "../services/initTable";
import {resetGame} from "../services/resetGame";
import {startTables} from "../services/startTables";
import {getHeroes} from "../services/getHeroes";
import {PlayerData} from "../types/PlayerData";
import {completeVeranke} from "../services/completeVeranke";
import {endGame} from "../services/endGame";

interface InitBody {
  players: number;
  end: number;
}

interface ValueBody {
  value: number;
}

interface TableNumberBody {
  table: number;
}

interface TableBody {
  players: PlayerData[];
  expert: boolean;
}

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json('Hello World!');
});

router.get('/data', (_req: Request, res: Response) => {
  res.send(getData());
});

router.post('/init', (req: Request<InitBody>, res: Response) => {
  const { end } = req.body;
  res.send(initGame(end));
});

router.post('/reset', (_req: Request, res: Response) => {
  res.send(resetGame());
});

router.post('/init-table', (req: Request<TableBody>, res: Response) => {
  const { players, expert } = req.body;
  res.send(initTable(players, expert));
});

router.get('/heroes', (_req: Request, res: Response) => {
  res.send(getHeroes());
});

router.post('/start-tables', (_req: Request, res: Response) => {
  res.send(startTables());
});

router.post('/advance', (_req: Request, res: Response) => {
  res.send(advanceGame());
});

router.post('/end', (_req: Request, res: Response) => {
  res.send(endGame());
});

router.post('/super-life', (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;
  res.send(updateSuperLife(value, table));
});

router.post('/super-plan', (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;
  res.send(updateSuperPlan(value, table));
});

router.post('/spider-woman', (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { table, value } = req.body;
  res.send(updateSpiderWoman(value, table));
});

router.post('/ship', (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;
  res.send(updateShip(table));
});

router.post('/complete', (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;
  res.send(completeVeranke(table));
});

router.post('/enemy', (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;
  res.send(updateEnemy(value, table));
});

router.post('/exposed', (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;
  res.send(updateExposed(value, table));
});

export default router;