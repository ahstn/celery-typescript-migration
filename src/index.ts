#!npx ts-node

import yargs from 'yargs'

const args = yargs(process.argv.slice(2))
  .usage('Usage: $0 --broker (sqs|mq)')
  .option('broker', {
    alias: 'b',
    description: 'broker implementation to consume from',
    default: 'sqs',
  })
  .demandOption('broker').argv

console.log(args)
