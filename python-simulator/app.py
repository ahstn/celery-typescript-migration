#!/usr/bin/env python3

import argparse
import os
import sys

from celery import Celery
from celery.bin.celery import main as _main


my_app = Celery("celery", broker=os.environ.get("AMQP_ADDR", "amqp://127.0.0.1:5672/my-rabbit"))
my_app.conf.update(
    result_backend=None,
    task_ignore_result=True,
    task_routes=(
        [("buggy_task", {"queue": "buggy-queue"})],
        [("*", {"queue": "celery"})],
    ),
)

# NOTE: we have to set the name for tasks manually in order to match the names
# of the Rust tasks. Otherwise the task names here would be prefixed with 'celery.'.
@my_app.task(name="add")
def add(x, y):
    return x + y

def parse_args():
    parser = argparse.ArgumentParser(
        "celery_app", description="Run a Python Celery producer for MQ or SQS"
    )
    parser.add_argument("mode", choices=["mq", "sqs"])
    parser.add_argument(
        "task", nargs="*", choices=["add", "fib", "long_running_task", "bound_task"]
    )
    return parser.parse_args()


def main():
    opts = parse_args()
    if opts.mode == "sqs":
        print("sqs")
        key = os.environ.get("AWS_ACCESS_KEY", "test")
        secret = os.environ.get("AWS_SECRET_KEY", "test")
        my_app.conf.broker_url=os.environ.get("SQS_ADDR", f"sqs://{key}:{secret}@127.0.0.1:4566")
        my_app.conf.update(
            broker=os.environ.get("SQS_ADDR", f"sqs://{key}:{secret}@127.0.0.1:4566"),
            broker_transport_options={
                'region': 'us-east-1',
            }
        )

    for task in opts.task:
        if task == "add":
            add.apply_async(args=(2, 2))
        else:
            add.apply_async(args=(2, 2))
            my_app.send_task('fib', args=[21])



if __name__ == "__main__":
    main()
