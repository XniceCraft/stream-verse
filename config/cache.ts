import env from '#start/env'
import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: env.get('CACHE_STORE'),

  stores: {
    memory: store().useL1Layer(drivers.memory({ maxSize: '50MB', maxItems: 1000 })),

    memoryAndDatabase: store()
      .useL1Layer(drivers.memory({ maxSize: '50MB', maxItems: 1000 }))
      .useL2Layer(
        drivers.database({
          connectionName: 'mysql',
          autoCreateTable: true,
          tableName: 'cache',
        })
      ),

    memoryAndRedis: store()
      .useL1Layer(drivers.memory({ maxSize: '50MB', maxItems: 1000 }))
      .useL2Layer(
        drivers.redis({
          connectionName: 'main',
        })
      )
      .useBus(drivers.redisBus({ connectionName: 'main' })),

    database: store().useL2Layer(
      drivers.database({
        connectionName: 'mysql',
        autoCreateTable: true,
        tableName: 'cache',
      })
    ),

    redis: store().useL2Layer(
      drivers.redis({
        connectionName: 'main',
      })
    ),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
