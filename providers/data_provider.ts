import { FootballService } from '#services/football_service'
import { TvService } from '#services/tv_service'

import type { ApplicationService } from '@adonisjs/core/types'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    football: FootballService
    tv: TvService
  }
}

export default class DataProvider {
  constructor(protected app: ApplicationService) {}

  public register() {
    this.app.container.singleton('football', () => {
      return new FootballService()
    })

    this.app.container.singleton('tv', () => {
      return new TvService()
    })
  }
}
