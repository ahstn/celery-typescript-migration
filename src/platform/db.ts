import { Client } from 'pg'

export function client(): Client {
  return new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
  })
}
