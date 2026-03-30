import type { TvChannel } from '#types/contract/tv'

import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TvTransformer extends BaseTransformer<TvChannel> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'country', 'categories', 'logo', 'isNsfw'])
  }
}
