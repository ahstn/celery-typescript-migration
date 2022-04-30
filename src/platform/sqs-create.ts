import AWS from 'aws-sdk'
import { AWSError, SQS } from 'aws-sdk'

AWS.config.update({ region: 'us-east-1' })
const sqs: SQS = new SQS({ endpoint: 'http://127.0.0.1:4566' })

const createParams: SQS.Types.CreateQueueRequest = {
  QueueName: 'typescript',
  Attributes: {
    DelaySeconds: '60',
    MessageRetentionPeriod: '86400',
  },
}

sqs
  .createQueue(createParams)
  .promise()
  .then((result: SQS.Types.CreateQueueResult) => console.log(result))
  .catch((err: AWSError) => console.log('Error', err))
