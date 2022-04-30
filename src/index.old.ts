#!npx ts-node

import yargs from 'yargs';

yargs(process.argv.slice(2))
  .usage('Usage: $0 (sqs|mq)')
  .commandDir('commands')
  .strict()
  .alias({ h: 'help' })
  .command(
    'sqs <queue>',
    'fetch messages from a given queue',
    builder,
    handler
  )
  .demandCommand(1, 1, 'choose a command: sqs or mq')
  .argv;
