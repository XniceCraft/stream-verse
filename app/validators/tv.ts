import { pagination } from './fields/pagination.js'
import vine from '@vinejs/vine'

export const tvFiltersValidator = vine.create({
  search: vine.string().optional(),
  category: vine.string().optional(),
  country: vine.string().optional(),
  sort: vine.enum(['name-asc', 'name-desc']).optional(),
  pagination: pagination(),
})
