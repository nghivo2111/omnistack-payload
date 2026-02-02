import * as migration_20260122_125015 from './20260122_125015';
import * as migration_20260130_025431 from './20260130_025431';
import * as migration_20260130_030938 from './20260130_030938';
import * as migration_20260130_031602 from './20260130_031602';
import * as migration_20260130_053218 from './20260130_053218';
import * as migration_20260130_074433 from './20260130_074433';
import * as migration_20260130_075537 from './20260130_075537';
import * as migration_20260130_102030 from './20260130_102030';
import * as migration_20260130_102955 from './20260130_102955';

export const migrations = [
  {
    up: migration_20260122_125015.up,
    down: migration_20260122_125015.down,
    name: '20260122_125015',
  },
  {
    up: migration_20260130_025431.up,
    down: migration_20260130_025431.down,
    name: '20260130_025431',
  },
  {
    up: migration_20260130_030938.up,
    down: migration_20260130_030938.down,
    name: '20260130_030938',
  },
  {
    up: migration_20260130_031602.up,
    down: migration_20260130_031602.down,
    name: '20260130_031602',
  },
  {
    up: migration_20260130_053218.up,
    down: migration_20260130_053218.down,
    name: '20260130_053218',
  },
  {
    up: migration_20260130_074433.up,
    down: migration_20260130_074433.down,
    name: '20260130_074433',
  },
  {
    up: migration_20260130_075537.up,
    down: migration_20260130_075537.down,
    name: '20260130_075537',
  },
  {
    up: migration_20260130_102030.up,
    down: migration_20260130_102030.down,
    name: '20260130_102030',
  },
  {
    up: migration_20260130_102955.up,
    down: migration_20260130_102955.down,
    name: '20260130_102955'
  },
];
