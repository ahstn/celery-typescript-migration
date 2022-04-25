#!/usr/bin/env node

import yargs, { Argv } from 'yargs';

yargs(process.argv.slice(2))
  .command(
    'sqs <queue>',
    'fetch messages from a given queue',
    () => { },
    (args: Argv) => {
      console.info(args);
    }
  )
  .demandCommand(1)
  .parse();
