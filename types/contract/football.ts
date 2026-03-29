interface Team {
  name: string
  code: string
  badge: string
}

export interface Stream {
  id: string
  name: string
  url: string
}

export type Status = 'notstarted' | 'inprogress' | 'finished'

export interface Match {
  id: string
  title: string
  time: number
  status: Status
  league: {
    name: string
    logo: string
  }
  teams: {
    home: Team
    away: Team
  }
  score: {
    home: number
    away: number
  }
}

export interface MatchDetail extends Match {
  streams: Stream[]
  info: {
    venue: string | null
    referee: string | null
    managers: {
      home: string | null
      away: string | null
    }
  }
}
