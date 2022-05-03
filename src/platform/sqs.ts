/* eslint-disable promise/always-return, functional/no-return-void */
import AWS from 'aws-sdk'
import { AWSError, SQS } from 'aws-sdk'

import { Message } from '../types/celery'

AWS.config.update({ region: 'us-east-1' })
const sqs: SQS = new SQS({ endpoint: 'http://127.0.0.1:4566' })

const readParams: SQS.Types.ReceiveMessageRequest = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: 'http://127.0.0.1:4566/000000000000/celery',
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
}

sqs
  .receiveMessage(readParams)
  .promise()
  .then((result: SQS.Types.ReceiveMessageResult) => {
      result.Messages
        ?.filter(msg => 'Body' in msg)
        .map(msg => Buffer.from(msg.Body || '', 'base64').toString())
        .map(msg => JSON.parse(msg) as Message)
        .forEach(msg => console.log(`Message: ${msg.headers.task}, ${msg.headers.argsrepr}`))
  })
  .catch((err: AWSError) => console.log('Error', err))
