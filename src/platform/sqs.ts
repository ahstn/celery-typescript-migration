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

export async function FetchMessages(): Promise<
  Result<readonly Message[], Error>
> {
  const results = await sqs.receiveMessage(readParams).promise()
  if (!results.Messages) {
    return err(new Error(`no messages returned: ${results.Messages}`))
  }

  return ok(
    results.Messages.map((msg) => Buffer.from(msg.Body, 'base64'))
      .map((msg) => msg.toString())
      .map((msg) => JSON.parse(msg) as Message)
  )
}
