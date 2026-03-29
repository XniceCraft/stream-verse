import type { Match, MatchDetail } from '#types/contract/football'

import { BaseTransformer } from '@adonisjs/core/transformers'

export default class FootballTransformer extends BaseTransformer<Match> {
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'teams', 'time', 'league', 'status', 'score'])
  }

  detail(): MatchDetail {
    return this.pick(this.resource as MatchDetail, [
      'id',
      'title',
      'teams',
      'time',
      'league',
      'status',
      'score',
      'streams',
      'info',
    ])
  }
}
