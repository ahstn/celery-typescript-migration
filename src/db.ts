import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import { Database } from './types/db'

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      port: 5000,
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
    })
  })
})

async function ReviewAverages() {
  const brand = await db
    .selectFrom('brand')
    .innerJoin('fragrance', 'fragrance.brand_id', 'brand.id')
    .innerJoin('review', 'fragrance.id', 'review.fragrance_id')
    .select(['title', 'brand.name as brand', 'review.longevity'])
    .execute()

  if (brand) {
    console.log(brand)
    console.log(
      brand.reduce((total, next) => total + next.longevity, 0) / brand.length
    )
  }
}

ReviewAverages()