# Celery Consumer Migration

## Introduction
This repository aims to provide an example of how TypeScript (& hopefully Rust) can be used to consume workloads produced using Python (& Celery) to MQ and SQS.

## Development

Project Setup Overview:

- TypeScript 4.6 with `ts-node` for executing `*.ts` files.
  - e.g. `npx ts-node src/platform/sqs-create.ts`
- ESLint with [plugin/promise], [plugin/functional], [plugin/comments] & [plugin/import] plugins
- Concise `npm` scripts with [npm-run-all] for executing related processes.
  - e.g. `test` will run `test:lint`, `test:prettier` and `test:spelling` after `build`.
- GHA workflow that sets up NodeJS according to `.nvmrc` with caching for `npm`.
- [Dockerfile 1.4] syntax with [`--link`] & [`--mount=cache`] for more efficient copying and package caching.


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

SQS body -> base64 decode -> celery JSON format -> deserialize to TS

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
https://github.com/localstack/localstack

[rusty-celery]: https://github.com/rusty-celery/rusty-celery

[plugin/promise]: https://github.com/xjamundx/eslint-plugin-promise
[plugin/functional]: https://github.com/jonaskello/eslint-plugin-functional
[plugin/comments]: https://github.com/mysticatea/eslint-plugin-eslint-comments
[plugin/import]: https://github.com/import-js/eslint-plugin-import
[npm-run-all]: https://github.com/mysticatea/npm-run-all

[Dockerfile 1.4]: https://hub.docker.com/r/docker/dockerfile
[`--link`]: https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/syntax.md#linked-copies-copy---link-add---link
[`--mount=cache`]: https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/syntax.md#run---mounttypecache
