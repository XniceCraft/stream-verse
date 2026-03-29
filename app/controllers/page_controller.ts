import app from '@adonisjs/core/services/app'

import type { HttpContext } from '@adonisjs/core/http'

export default class PageController {
  async home({ inertia }: HttpContext) {
    const footballService = await app.container.make('football')

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

    return inertia.render('home', {
      liveFootball,
      upcomingFootball,
    })
  }
}
