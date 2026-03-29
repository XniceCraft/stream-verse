import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Search, Filter, ArrowUpDown, Trophy, PlayCircle } from 'lucide-react'
import { FootballCard } from '@/components/card/football-card'
import { Navbar } from '@/components/layout/navbar'
import { Seo } from '@/components/other/seo'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounceEffect } from '@/hooks/use-debounce-effect'
import { formatDateTime } from '@/lib/utils'

import type { InertiaProps } from '@/types'
import type { Data } from '@generated/data'

export default function FootballIndex({
  matches = [],
  filters,
}: InertiaProps<{
  matches?: Data.Football[]
  filters: {
    search: string | undefined
    status: string | undefined
    sort: string | undefined
  }
}>) {
  const [search, setSearch] = useState(filters.search)
  const [statusFilter, setStatusFilter] = useState(filters.status)
  const [sort, setSort] = useState(filters.sort)

  useDebounceEffect(
    () => {
      router.get(
        '/football',
        { search, status: statusFilter, sort },
        { preserveState: true, replace: true }
      )
    },
    1000,
    [search, statusFilter, sort]
  )

  return (
    <>
      <Seo title="Football Matches" />
      <Navbar />
      <main className="min-h-screen bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 space-y-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                <Trophy className="size-4" />
                <span>Global Tournaments</span>
              </div>
              <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground">
                Football Matches
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Browse and watch thrilling football action, view complete schedules, and check the
                latest scores.
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-4 md:flex-row md:items-center bg-surface-container-low p-4 rounded-2xl border border-border/40 shadow-sm backdrop-blur-xl transition-all focus-within:border-primary/30">
            <div className="relative flex-1 group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="size-5" />
              </div>
              <Input
                type="text"
                placeholder="Search teams or leagues..."
                className="pl-11 h-12 rounded-xl bg-background/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm border-border/50 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
              <div className="relative group">
                <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
                  <SelectTrigger className="w-full sm:w-[170px] h-12 rounded-xl bg-background/50 focus:ring-1 focus:ring-primary shadow-sm border-border/50 text-sm font-medium">
                    <Filter className="mr-2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="inprogress">Live Matches</SelectItem>
                    <SelectItem value="notstarted">Upcoming</SelectItem>
                    <SelectItem value="finished">Finished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative group">
                <Select value={sort} onValueChange={(val) => setSort(val)}>
                  <SelectTrigger className="w-full sm:w-[170px] h-12 rounded-xl bg-background/50 focus:ring-1 focus:ring-primary shadow-sm border-border/50 text-sm font-medium">
                    <ArrowUpDown className="mr-2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Time (Oldest)</SelectItem>
                    <SelectItem value="desc">Time (Newest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <section>
            {matches.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-surface-container-low/30 py-24 text-center backdrop-blur-sm">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container shadow-inner">
                  <PlayCircle className="size-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">No matches found</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  We couldn't find any football matches matching your search criteria and filters.
                </p>
                <button
                  onClick={() => {
                    setSearch('')
                    setStatusFilter('all')
                    setSort('desc')
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {matches.map((match) => (
                  <FootballCard
                    key={match.id}
                    id={match.id}
                    league={match.league.name}
                    status={match.status}
                    homeTeamName={match.teams.home.name}
                    awayTeamName={match.teams.away.name}
                    homeTeamLogo={match.teams.home.badge}
                    awayTeamLogo={match.teams.away.badge}
                    matchTime={formatDateTime(match.time)}
                    score={match.score.home + ' - ' + match.score.away}
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
