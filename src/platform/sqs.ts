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
    if (result.Messages) {
      result.Messages.forEach((msg: SQS.Message) => {
        if (msg.Body) {
          const body: Message = JSON.parse(
            Buffer.from(msg.Body, 'base64').toString()
          )
          console.log(`Message: ${body.headers.task}, ${body.headers.argsrepr}`)
        }
      })
    }
  })
  .catch((err: AWSError) => console.log('Error', err))
