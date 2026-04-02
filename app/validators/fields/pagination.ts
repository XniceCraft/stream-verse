import vine from '@vinejs/vine'

export const pagination = () => ({
  page: vine.number().min(1).optional(),
  pageSize: vine.number().min(1).optional(),
})
