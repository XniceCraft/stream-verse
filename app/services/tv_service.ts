import axios from 'axios'
import cache from '@adonisjs/cache/services/main'

import type {
  TvChannel as TvChannelContract,
  TvChannelDetail as TvChannelDetailContract,
  TvStream,
} from '#types/contract/tv'
import type { Pagination } from '#types/contract/pagination'
import type { ServiceResponse } from '#types/contract/service'

interface ApiChannel {
  id: string
  name: string
  alt_names: string[]
  network: string | null
  owners: string[]
  country: string
  categories: string[]
  is_nsfw: boolean
  launched: string | null
  closed: string | null
  replaced_by: string | null
  website: string | null
}

interface ApiStream {
  channel: string | null
  feed: string | null
  title: string
  url: string
  quality: string | null
  label: string | null
  user_agent: string | null
  referrer: string | null
}

interface ApiLogo {
  channel: string
  feed: string | null
  tags: string[]
  width: number
  height: number
  format: string
  url: string
}

interface Options {
  search?: string
  category?: string
  country?: string
  sort?: 'name-asc' | 'name-desc'
  pagination?: Pick<Pagination, 'page' | 'pageSize'>
}

export class TvService {
  static API_BASE = 'https://iptv-org.github.io/api'

  public async getChannelById(id: string): Promise<TvChannelDetailContract | null> {
    const channel = await cache.getOrSet({
      key: `iptv:channel:${id}`,
      ttl: '30m',
      factory: async () => {
        try {
          const channels = await this.getChannels()
          const found = channels.data.find((ch) => ch.id === id)
          if (!found) return null

          const streams = await this.fetchStreams()
          const channelStreams: TvStream[] = streams[id].map((s) => ({
            channel: s.channel,
            title: s.title,
            url: s.url,
            quality: s.quality,
            userAgent: s.user_agent,
            referrer: s.referrer,
          }))

          return {
            ...found,
            streams: channelStreams,
          }
        } catch (error) {
          console.error('Error fetching TV channel:', error)
          return null
        }
      },
    })

    return channel ?? null
  }

  public async getChannels(options?: Options): Promise<ServiceResponse<TvChannelContract[]>> {
    let channels: TvChannelContract[] = await cache.getOrSet({
      key: 'data:tv',
      ttl: '30m',
      factory: async () => {
        const result = await this.fetchChannels()
        const streams = await this.fetchStreams()
        const logos = await this.fetchLogos()

        const logoMapped = logos.reduce(
          (acc, logo) => {
            acc[logo.channel] = logo.url
            return acc
          },
          {} as Record<string, string>
        )

        return result
          .filter((ch) => !ch.is_nsfw && ch.closed === null && streams[ch.id])
          .map((ch) => ({
            id: ch.id,
            name: ch.name,
            country: ch.country,
            network: ch.network,
            categories: ch.categories,
            logo: logoMapped[ch.id] ?? null,
            website: ch.website,
            isNsfw: ch.is_nsfw,
          }))
      },
    })
    const total = channels.length

    if (options?.search) {
      channels = channels.filter((ch) =>
        ch.name.toLowerCase().includes(options.search!.toLowerCase())
      )
    }

    if (options?.category) {
      channels = channels.filter((ch) => ch.categories.includes(options.category!))
    }

    if (options?.country) {
      channels = channels.filter((ch) => ch.country === options.country)
    }

    if (options?.sort) {
      channels = channels.sort((a, b) =>
        options.sort === 'name-asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    } else {
      channels = channels.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (options?.pagination) {
      const { page, pageSize } = options.pagination
      channels = channels.slice((page - 1) * pageSize, page * pageSize)
    }

    return {
      data: channels,
      pagination: options?.pagination
        ? {
            page: options.pagination.page,
            pageSize: options.pagination.pageSize,
            pageCount: Math.ceil(total / options.pagination.pageSize),
            total,
          }
        : undefined,
    }
  }

  public async getCategories(): Promise<string[]> {
    return cache.getOrSet({
      key: 'data:tv:categories',
      ttl: '1h',
      factory: async () => {
        const channels = await this.getChannels()
        const cats = new Set<string>()
        channels.data.forEach((ch) => ch.categories.forEach((c) => cats.add(c)))
        return Array.from(cats).sort()
      },
    })
  }

  protected async fetchLogos(): Promise<ApiLogo[]> {
    try {
      const response = await axios.get<ApiLogo[]>(`${TvService.API_BASE}/logos.json`)
      return response.data
    } catch (error) {
      console.error('Error fetching IPTV logos:', error)
      return []
    }
  }

  protected async fetchChannels(): Promise<ApiChannel[]> {
    try {
      const response = await axios.get<ApiChannel[]>(`${TvService.API_BASE}/channels.json`)
      return response.data
    } catch (error) {
      console.error('Error fetching IPTV channels:', error)
      return []
    }
  }

  protected async fetchStreams(): Promise<Record<string, ApiStream[]>> {
    return await cache.getOrSet({
      key: 'data:tv:streams',
      ttl: '1h',
      factory: async () => {
        try {
          const response = await axios.get<ApiStream[]>(`${TvService.API_BASE}/streams.json`)
          return response.data.reduce(
            (acc, stream) => {
              if (stream.channel) {
                acc[stream.channel] = [...(acc[stream.channel] ?? []), stream]
              }
              return acc
            },
            {} as Record<string, ApiStream[]>
          )
        } catch (error) {
          console.error('Error fetching IPTV streams:', error)
          return {}
        }
      },
    })
  }
}
