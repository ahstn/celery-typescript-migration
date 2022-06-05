import { Generated } from 'kysely'

interface BrandTable {
  readonly id: Generated<number>
  readonly name: string
}

interface FragranceTable {
  readonly id: Generated<number>
  readonly brand_id: Generated<number>
  readonly collection_id: Generated<number>
  readonly concentration: 'edc' | 'edt' | 'edp' | 'perfume'
  readonly title: string
}

interface UserTable {
  readonly id: Generated<number>
  readonly forename: string
  readonly surname: string
}

interface ReviewTable {
  readonly id: Generated<number>
  readonly fragrance_id: Generated<number>
  readonly user_id: Generated<number>
  readonly longevity: number
  readonly projection: number
  readonly scent: number
  readonly value: number
}

interface Database {
  readonly brand: BrandTable
  readonly fragrance: FragranceTable
  readonly user: UserTable
  readonly review: ReviewTable
}
