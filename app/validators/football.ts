import vine from '@vinejs/vine'

export const footballFiltersValidator = vine.create({
  search: vine.string().optional(),
  status: vine.enum(['inprogress', 'notstarted', 'finished', 'all']).optional(),
  sort: vine.enum(['asc', 'desc']).optional(),
})
