import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Setting from '#models/setting'

export default class extends BaseSeeder {
  async run() {
    await Setting.create({
      group: 'seo',
      key: 'name',
      value: 'StreamVerse',
    })
    await Setting.create({
      group: 'seo',
      key: 'description',
      value: 'StreamVerse is a free streaming website for live football matches',
    })
    await Setting.create({
      group: 'seo',
      key: 'keywords',
      value: 'football, live, stream, free',
    })
    await Setting.create({
      group: 'seo',
      key: 'author',
      value: 'XniceCraft',
    })
    await Setting.create({
      group: 'seo',
      key: 'favicon',
      value: null,
    })
    await Setting.create({
      group: 'seo',
      key: 'ogImage',
      value: null,
    })
  }
}
