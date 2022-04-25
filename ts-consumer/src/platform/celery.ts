import { createWorker } from 'celery-node';
import { client as GenerateClient } from './db'

const worker = createWorker(
  'amqp://127.0.0.1:5672/my-rabbit',
  'amqp://127.0.0.1:5672/my-rabbit',
  'celery'
);

worker.register('add', (a: number, b: number) => a + b);

worker.register('fetch_supplier', (id: number) => {
  const client = GenerateClient()
  client
    .connect()
    .then(() => console.log('connected'))
    .catch((err: Error) => console.error('connection error', err.stack));

  client
    .query(
      'SELECT company_name, contact_name FROM suppliers WHERE supplier_id=$1::smallint',
      [id]
    )
    .then((result: any) => console.log(result))
    .catch((e: Error) => console.error(e.stack));
});

worker.start();
