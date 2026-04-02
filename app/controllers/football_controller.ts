import { errors as lucidErrors } from '@adonisjs/lucid'
import { footballFiltersValidator } from '#validators/football'
import app from '@adonisjs/core/services/app'

import type { HttpContext } from '@adonisjs/core/http'

export default class FootballController {
  async index({ inertia, request }: HttpContext) {
    const qs = await request.validateUsing(footballFiltersValidator, request.qs())
    const footballService = await app.container.make('football')

    const { data: matches, pagination } = await footballService.getMatches({
      ...qs,
      pagination: {
        page: qs.page ?? 1,
        pageSize: qs.pageSize ?? 25,
      },
    })

    return inertia.render('football/index', {
      matches,
      pagination,
    })
  }

  async show({ inertia, params }: HttpContext) {
    const { id } = params as { id: string }

    const footballService = await app.container.make('football')
    const match = await footballService.getMatchById(id)

    if (!match) throw new lucidErrors.E_ROW_NOT_FOUND()

    return inertia.render('football/show', { match })
  }
}
