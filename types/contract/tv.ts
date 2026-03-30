export type TvChannel = {
  id: string
  name: string
  network: string | null
  country: string
  categories: string[]
  logo: string | null
  website: string | null
  isNsfw: boolean
}

export type TvStream = {
  channel: string | null
  title: string
  url: string
  quality: string | null
  userAgent: string | null
  referrer: string | null
}

export type TvChannelDetail = TvChannel & {
  streams: TvStream[]
}
