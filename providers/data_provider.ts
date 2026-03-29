import { FootballService } from '#services/football_service'

import type { ApplicationService } from '@adonisjs/core/types'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    football: FootballService
  }
}

export default class DataProvider {
  constructor(protected app: ApplicationService) {}

  public register() {
    this.app.container.singleton('football', () => {
      return new FootballService()
    })
  }
}
