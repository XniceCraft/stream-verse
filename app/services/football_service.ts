import axios from 'axios'
import cache from '@adonisjs/cache/services/main'
import env from '#start/env'

import type {
  Match as MatchContract,
  MatchDetail as MatchDetailContract,
  Status,
} from '#types/contract/football'
import type { Pagination } from '#types/contract/pagination'
import type { ServiceResponse } from '#types/contract/service'

interface Leauge {
  name: string
  country: string
  flag: string
  logo: string
}

interface Match {
  id: string
  title: string
  timestamp: number
  status: Status
  status_detail: string
  round: string
  teams: {
    home: {
      name: string
      code: string
      color: string
      badge: string
    }
    away: {
      name: string
      code: string
      color: string
      badge: string
    }
  }
  score: {
    current: {
      home: number
      away: number
    }
    period_1: string | null
    period_2: string | null
    normal_time: string | null
    display: string
  }
}

interface MatchData {
  league: Leauge
  matches: Match[]
}

interface MatchesResponse {
  success: boolean
  total_leagues: number
  total_matches: number
  data: MatchData[]
}

interface MatchDetailResponse {
  success: true
  data: {
    match_info: {
      id: string
      title: string
      timestamp: number
      status: Status
      status_detail: string
      league: {
        name: string
        season: string
        round: string
        country: string
        flag: string
        logo: string
      }
      teams: {
        home: {
          name: string
          code: string
          color: string
          badge: string
        }
        away: {
          name: string
          code: string
          color: string
          badge: string
        }
      }
      score: {
        current: {
          home: number
          away: number
        }
        period_1: string | null
        period_2: string | null
        normal_time: string | null
        display: string
      }
      time_info: {
        injury_time_1: null // Unknown
        injury_time_2: null // Unknown
        period_start: null // Unknown
      }
    }
    sources:
      | {
          id: string
          streamNo: number
          embedUrl: string
          source: string
          hd: boolean
          language: string
        }[]
      | null
    info: {
      venue: {
        stadium: string
        city: string
        country: string
        image: string
        capacity: number
        coordinates: {
          lat: number
          lng: number
        }
      } | null
      referee: string | null
      managers: {
        home: string | null
        away: string | null
      }
    }
  }
}

interface Options {
  search?: string
  status?: Status
  sort?: 'asc' | 'desc'
  pagination?: Pick<Pagination, 'page' | 'pageSize'>
}

export class FootballService {
  static API_ENDPOINT = 'https://api.sportsrc.org/v2'

  public async getMatchById(id: string): Promise<MatchDetailContract | null> {
    const match = await cache.getOrSet({
      key: `sportsrc:football:${id}`,
      ttl: '3m',
      factory: async () => {
        try {
          const response = await axios.get<MatchDetailResponse>(
            `${FootballService.API_ENDPOINT}/?type=detail&id=${id}`,
            {
              headers: {
                'X-API-KEY': env.get('SPORTSRC_API_KEY'),
              },
            }
          )

          if (!response.data.success) {
            return null
          }

          return {
            id: response.data.data.match_info.id,
            title: response.data.data.match_info.title,
            time: response.data.data.match_info.timestamp,
            status: response.data.data.match_info.status,
            league: {
              name: response.data.data.match_info.league.name,
              logo: response.data.data.match_info.league.logo,
            },
            teams: {
              home: {
                name: response.data.data.match_info.teams.home.name,
                code: response.data.data.match_info.teams.home.code,
                badge: response.data.data.match_info.teams.home.badge,
              },
              away: {
                name: response.data.data.match_info.teams.away.name,
                code: response.data.data.match_info.teams.away.code,
                badge: response.data.data.match_info.teams.away.badge,
              },
            },
            score: {
              home: response.data.data.match_info.score.current.home,
              away: response.data.data.match_info.score.current.away,
            },
            streams:
              response.data.data.sources?.map((source) => ({
                id: source.id,
                name: source.source,
                url: source.embedUrl,
              })) ?? [],
            info: {
              venue: response.data.data.info.venue?.stadium ?? null,
              referee: response.data.data.info.referee,
              managers: {
                home: response.data.data.info.managers.home,
                away: response.data.data.info.managers.away,
              },
            },
          }
        } catch (error) {
          console.error('Error fetching football match:', error)
          return null
        }
      },
    })

    return match ?? null
  }

  public async getMatches(options?: Options): Promise<ServiceResponse<MatchContract[]>> {
    let matches: MatchContract[] = await cache.getOrSet({
      key: 'data:football',
      ttl: '5m',
      factory: async () => {
        const result = await this.fetchMatches()

        return result.flatMap((league) =>
          league.matches.map((match) => ({
            id: match.id,
            title: match.title,
            time: match.timestamp,
            status: match.status,
            league: {
              name: league.league.name,
              logo: league.league.logo,
            },
            teams: {
              home: {
                name: match.teams.home.name,
                code: match.teams.home.code,
                badge: match.teams.home.badge,
              },
              away: {
                name: match.teams.away.name,
                code: match.teams.away.code,
                badge: match.teams.away.badge,
              },
            },
            score: {
              home: match.score.current.home,
              away: match.score.current.away,
            },
            streams: [],
          }))
        )
      },
    })
    const total = matches.length

    if (options?.search) {
      matches = matches.filter((match) =>
        match.title.toLowerCase().includes(options.search!.toLowerCase())
      )
    }

    if (options?.status) {
      matches = matches.filter((match) => match.status === options.status)
    }

    if (options?.sort) {
      matches = matches.sort((a, b) => (options.sort === 'asc' ? a.time - b.time : b.time - a.time))
    }

    if (options?.pagination) {
      const { page, pageSize } = options.pagination
      matches = matches.slice((page - 1) * pageSize, page * pageSize)
    }
    return {
      data: matches,
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

  protected async fetchMatches(): Promise<MatchData[]> {
    try {
      const response = await axios.get<MatchesResponse>(
        `${FootballService.API_ENDPOINT}/?type=matches`,
        {
          headers: {
            'X-API-KEY': env.get('SPORTSRC_API_KEY'),
          },
        }
      )

      if (!response.data.success) {
        return []
      }

      return response.data.data
    } catch (error) {
      console.error('Error fetching football matches:', error)
      return []
    }
  }
}
