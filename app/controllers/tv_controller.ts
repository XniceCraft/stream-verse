import { errors as lucidErrors } from '@adonisjs/lucid'
import { tvFiltersValidator } from '#validators/tv'
import app from '@adonisjs/core/services/app'

import type { HttpContext } from '@adonisjs/core/http'

export default class TvController {
  async index({ inertia, request }: HttpContext) {
    const qs = await request.validateUsing(tvFiltersValidator, request.qs())
    const tvService = await app.container.make('tv')

    const { data: channels, pagination } = await tvService.getChannels({
      ...qs,
      pagination: {
        page: qs.pagination?.page ?? 1,
        pageSize: qs.pagination?.pageSize ?? 25,
      },
    })
    const categories = await tvService.getCategories()

    return inertia.render('tv/index', {
      channels,
      categories,
      pagination,
    })
  }

  async show({ inertia, params }: HttpContext) {
    const { id } = params as { id: string }

    const tvService = await app.container.make('tv')
    const channel = await tvService.getChannelById(id)

    if (!channel) throw new lucidErrors.E_ROW_NOT_FOUND()

    return inertia.render('tv/show', { channel })
  }
}
