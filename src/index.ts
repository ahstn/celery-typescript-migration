#!npx ts-node
/* eslint-disable functional/no-return-void,no-case-declarations */

import yargs from 'yargs'

import { FetchMessages } from './platform/sqs'
import { tracer } from './tracer'
import { Message } from './types/celery'

tracer('adam-212')

/**
 * Application entrypoint, parses arguments and uses appropriate broker.
 */
async function main() {
  yargs(process.argv.slice(2))
    .usage('Usage: $0 --broker (sqs|mq)')
    .example('$0 -b sqs', 'listen on all registered SQS queues')
    .option('broker', {
      alias: 'b',
      description: 'broker implementation to consume from',
      default: 'sqs',
    })
    .option('create-queues', {
      description: 'optionally ensure queues are created',
      default: true,
    })
    .demandOption('broker').argv

  const result = await FetchMessages()
  result
    .map((data) => {
      data.forEach((msg: Message) => {
        switch (msg.headers.task) {
          case 'add':
            const result = msg.headers.argsrepr.map(Number).reduce((a, b) => a + b)

            console.log(`Result: ${result} task=[add]`)
            break
          default:
            console.log(`unknown task: ${msg.headers.task}`)
        }
      })
    })
    .mapErr((err) => {
      console.log(`unsuccessful fetch: ${err.message}`)
    })
}

main()
