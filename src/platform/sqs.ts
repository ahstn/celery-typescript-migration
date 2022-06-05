import AWS, { SQS } from 'aws-sdk'
import { err, ok, Result } from 'neverthrow'

import { Message } from '../types/celery'

AWS.config.update({ region: 'us-east-1' })
const sqs: SQS = new SQS({ endpoint: 'http://127.0.0.1:4566' })

const readParams: SQS.Types.ReceiveMessageRequest = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: 'http://127.0.0.1:4566/000000000000/celery',
  VisibilityTimeout: 20,
  WaitTimeSeconds: 20,
}

/**
 * Fetches messages from SQS according to the ReceiveMessageRequest.
 * @returns result of messages and/or error
 */
export async function FetchMessages(): Promise<
  Result<readonly Message[], Error>
> {
  const results = await sqs.receiveMessage(readParams).promise()
  if (!results.Messages) {
    return err(new Error(`no messages returned: ${results.Messages}`))
  }

  return ok(
    results.Messages
      .map((msg) => Buffer.from(msg.Body, 'base64'))
      .map((msg) => msg.toString())
      .map((msg) =>
        JSON.parse(msg, (k, v) => k === 'argsrepr' ? celeryArgsAsArray(v) : v)
      )
  )
}

/**
 * Transforms task args from a Celery string to an array of strings
 * e.g. '(2, 2)' => string['2', '2']
 * @param s task args string
 * @returns transformed array
 */
function celeryArgsAsArray(s: string): readonly string[] {
  return s
    .replace('(', '')
    .replace(')', '')
    .replace(', ', ',')
    .split(',')
}
