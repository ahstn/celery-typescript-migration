import AWS from 'aws-sdk';
import { AWSError, SQS } from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const sqs: SQS = new SQS({ endpoint: 'http://localhost:4566' });

const listParams: SQS.Types.ListQueuesRequest = {};
const createParams: SQS.Types.CreateQueueRequest = {
  QueueName: 'typescript',
  Attributes: {
    DelaySeconds: '60',
    MessageRetentionPeriod: '86400',
  },
};
const sendParams: SQS.Types.SendMessageRequest = {
  DelaySeconds: 10,
  MessageAttributes: {
    Method: {
      DataType: 'String',
      StringValue: 'add',
    },
  },
  MessageBody: "Call method 'add'",
  QueueUrl: 'http://localhost:4566/000000000000/typescript',
};

sqs.createQueue(
  createParams,
  (err: AWSError, data: SQS.Types.CreateQueueResult) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.QueueUrl);
    }
  }
);

sqs.listQueues(
  listParams,
  (err: AWSError, data: SQS.Types.ListQueuesResult) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.QueueUrls);
    }
  }
);

sqs.sendMessage(
  sendParams,
  (err: AWSError, data: SQS.Types.SendMessageResult) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  }
);
