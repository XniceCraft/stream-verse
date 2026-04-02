import vine from '@vinejs/vine'

export const pagination = () =>
  vine
    .object({
      page: vine.number().min(1),
      pageSize: vine.number().min(1).optional(),
    })
    .optional()
