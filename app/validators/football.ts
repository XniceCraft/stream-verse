import { pagination } from './fields/pagination.js'
import vine from '@vinejs/vine'

export const footballFiltersValidator = vine.create({
  search: vine.string().optional(),
  status: vine.enum(['inprogress', 'notstarted', 'finished']).optional(),
  sort: vine.enum(['asc', 'desc']).optional(),
  pagination: pagination(),
})
