import { SettingSchema } from '#database/schema'
import env from '#start/env'

import type { SEO } from '#types/settings/seo'

export default class Setting extends SettingSchema {
  static async getSEO() {
    const settings = await Setting.query()
      .where('group', 'seo')
      .andWhereIn('key', ['name', 'description', 'keywords', 'author', 'favicon', 'ogImage'])

    return settings.reduce(
      (acc, setting) => {
        acc[setting.key as keyof SEO] = setting.value as any
        return acc
      },
      {
        name: env.get('APP_NAME'),
        description: null,
        keywords: null,
        author: null,
        favicon: null,
        ogImage: null,
      } as SEO
    )
  }
}
