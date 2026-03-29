import { BaseTransformer } from '@adonisjs/core/transformers'

import type { SEO } from '#types/settings/seo'

export default class SeoSettingTransformer extends BaseTransformer<SEO> {
  toObject() {
    return this.pick(this.resource, [
      'name',
      'description',
      'keywords',
      'author',
      'favicon',
      'ogImage',
    ])
  }
}
