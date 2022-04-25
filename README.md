# Celery Consumer Migration

## Introduction
This repository aims to provide an example of how TypeScript (& hopefully Rust) can be used to consume workloads produced using Python (& Celery) to MQ and SQS.

## Setup
> Working notes - will frequently change and eventually be tidied up.

**Python Producer Simulator**
Adapted from [rusty-celery] to simulate producing tasks to MQ & SQS.
```bash
python3 python-simulator/app.py consume add
```

**RabbitMQ**
```bash
docker run --hostname "my-rabbit" -e RABBITMQ_DEFAULT_VHOST="my-rabbit" -p 127.0.0.1:5672:5672 --rm rabbitmq
```

**Localstack**
```bash
docker run --rm -it -e SERVICES=sqs -p 4566:4566 -p 4571:4571 localstack/localstack
export AWS_ACCESS_KEY_ID="test" AWS_SECRET_ACCESS_KEY="test" AWS_DEFAULT_REGION="us-east-1"
```

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
https://github.com/localstack/localstack

[rusty-celery]: https://github.com/rusty-celery/rusty-celery
