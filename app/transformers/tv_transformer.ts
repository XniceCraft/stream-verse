import type { TvChannel, TvChannelDetail } from '#types/contract/tv'

import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TvTransformer extends BaseTransformer<TvChannel> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'network',
      'country',
      'categories',
      'logo',
      'website',
      'isNsfw',
    ])
  }

  detail(): TvChannelDetail {
    return this.pick(this.resource as TvChannelDetail, [
      'id',
      'name',
      'network',
      'country',
      'categories',
      'logo',
      'website',
      'isNsfw',
      'streams',
    ])
  }
}
