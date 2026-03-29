import { useState, useMemo } from 'react'
import { Search, Filter, ArrowUpDown, Tv, PlayCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Seo } from '@/components/other/seo'
import { TvCard } from '@/components/card/tv-card'

import type { InertiaProps } from '@/types'

// Temporary generic type since TV contract doesn't exist yet
export interface TvChannel {
  id: string
  name: string
  category: string
  logo?: string
  isLive: boolean
}

const DUMMY_CHANNELS: TvChannel[] = [
  { id: '1', name: 'SKY SPORTS', category: 'Sports', isLive: true },
  { id: '2', name: 'ESPN', category: 'Sports', isLive: true },
  { id: '3', name: 'BEIN SPORT 1', category: 'Sports', isLive: true },
  { id: '4', name: 'TNT SPORTS', category: 'Sports', isLive: true },
  { id: '5', name: 'NBC', category: 'General', isLive: false },
  { id: '6', name: 'CBS', category: 'General', isLive: true },
  { id: '7', name: 'PRIME VIDEO', category: 'Sports', isLive: false },
  { id: '8', name: 'DAZN', category: 'Sports', isLive: true },
]

export default function TvIndex({
  channels = DUMMY_CHANNELS,
}: InertiaProps<{
  channels?: TvChannel[]
}>) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all') // 'all', 'Sports', 'General' etc.
  const [sort, setSort] = useState('name-asc') // 'name-asc', 'name-desc'

  const categories = useMemo(() => {
    const cats = new Set(channels.map((c) => c.category))
    return Array.from(cats)
  }, [channels])

  const filteredChannels = useMemo(() => {
    return channels
      .filter((channel) => {
        // Search filter
        if (search && !channel.name.toLowerCase().includes(search.toLowerCase())) {
          return false
        }
        // Category filter
        if (categoryFilter !== 'all' && channel.category !== categoryFilter) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (sort === 'name-asc') {
          return a.name.localeCompare(b.name)
        } else if (sort === 'name-desc') {
          return b.name.localeCompare(a.name)
        }
        return 0
      })
  }, [channels, search, categoryFilter, sort])

  return (
    <>
      <Seo title="TV Channels" />
      <Navbar />
      <main className="min-h-screen bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
          {/* Header */}
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                <Tv className="size-4" />
                <span>Live Broadcasting</span>
              </div>
              <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground">
                TV Channels
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Browse our collection of live TV channels and never miss your favorite shows or
                sports events.
              </p>
            </div>
          </header>

          {/* Filters & Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center bg-surface-container-low p-4 rounded-2xl border border-border/40 shadow-sm backdrop-blur-xl transition-all focus-within:border-primary/30">
            <div className="relative flex-1 group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="size-5" />
              </div>
              <input
                type="text"
                placeholder="Search TV channels..."
                className="block w-full rounded-xl border border-border/50 bg-background/50 py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Filter className="size-4" />
                </div>
                <select
                  className="w-full sm:w-auto min-w-[160px] appearance-none rounded-xl border border-border/50 bg-background/50 py-3 pl-10 pr-10 text-sm outline-none transition-all focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="size-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <ArrowUpDown className="size-4" />
                </div>
                <select
                  className="w-full sm:w-auto min-w-[170px] appearance-none rounded-xl border border-border/50 bg-background/50 py-3 pl-10 pr-10 text-sm outline-none transition-all focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="size-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <section>
            {filteredChannels.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface-container-low/30 py-24 text-center backdrop-blur-sm">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container shadow-inner">
                  <PlayCircle className="size-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  No channels found
                </h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  We couldn't find any TV channels matching your search and filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearch('')
                    setCategoryFilter('all')
                    setSort('name-asc')
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredChannels.map((channel) => (
                  <TvCard
                    key={channel.id}
                    id={channel.id}
                    name={channel.name}
                    category={channel.category}
                    logo={channel.logo}
                    isLive={channel.isLive}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
