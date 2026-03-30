import app from '@adonisjs/core/services/app'

import type { HttpContext } from '@adonisjs/core/http'

export default class PageController {
  async home({ inertia }: HttpContext) {
    const footballService = await app.container.make('football')
    const tvService = await app.container.make('tv')

    const liveFootball = await footballService.getMatches({
      max: 10,
      status: 'inprogress',
      sort: 'desc',
    })
    const upcomingFootball = await footballService.getMatches({
      max: 10,
      status: 'notstarted',
      sort: 'desc',
    })
    const tvChannels = await tvService.getChannels({
      max: 8,
    })

    return inertia.render('home', {
      liveFootball,
      upcomingFootball,
      tvChannels,
    })
  }
}
