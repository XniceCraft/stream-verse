import app from '@adonisjs/core/services/app'

import type { HttpContext } from '@adonisjs/core/http'

export default class PageController {
  async home({ inertia }: HttpContext) {
    const footballService = await app.container.make('football')
    const tvService = await app.container.make('tv')

    const { data: liveFootball } = await footballService.getMatches({
      status: 'inprogress',
      sort: 'desc',
      pagination: { page: 1, pageSize: 10 },
    })
    const { data: upcomingFootball } = await footballService.getMatches({
      status: 'notstarted',
      sort: 'desc',
      pagination: { page: 1, pageSize: 10 },
    })
    const { data: tvChannels } = await tvService.getChannels({
      pagination: { page: 1, pageSize: 8 },
    })

    return inertia.render('home', {
      liveFootball,
      upcomingFootball,
      tvChannels,
    })
  }
}
