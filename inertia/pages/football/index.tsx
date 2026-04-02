import { useDebounceEffect } from '@/hooks/use-debounce-effect'
import { parseAsString, parseAsInteger, useQueryState } from 'nuqs'
import { router } from '@inertiajs/react'
import { Search, Filter, ArrowUpDown, Trophy, PlayCircle } from 'lucide-react'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
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
import { urlFor } from '@/client'

import type { Data } from '@generated/data'
import type { InertiaProps, Pagination } from '@/types'

export default function FootballIndex({
  matches = [],
  pagination,
}: InertiaProps<{
  matches?: Data.Football[]
  pagination?: Pagination
}>) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [statusFilter, setStatusFilter] = useQueryState('status', parseAsString.withDefault(''))
  const [sort, setSort] = useQueryState('sort', parseAsString.withDefault(''))
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  useDebounceEffect(
    () => {
      router.reload({ data: { search, status: statusFilter, sort, page } })
    },
    1000,
    [search, statusFilter, sort, page]
  )

  const renderPagination = () => {
    if (!pagination || pagination.pageCount <= 1) return null

    const maxVisiblePages = 5
    let startPage = Math.max(1, page - 2)
    let endPage = Math.min(pagination.pageCount, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    const pages = []

    if (startPage > 1) {
      pages.push(
        <PaginationItem key="1">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage(1)
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={page === i}
            onClick={(e) => {
              e.preventDefault()
              setPage(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < pagination.pageCount) {
      if (endPage < pagination.pageCount - 1) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      pages.push(
        <PaginationItem key={pagination.pageCount}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage(pagination.pageCount)
            }}
          >
            {pagination.pageCount}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return (
      <PaginationComponent className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) setPage(page - 1)
              }}
              className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page < pagination.pageCount) setPage(page + 1)
              }}
              className={page >= pagination.pageCount ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    )
  }

  return (
    <>
      <Seo title="Football Matches" path={urlFor('football.index')} />
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
              <>
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
                      matchTime={match.time}
                      score={match.score.home + ' - ' + match.score.away}
                    />
                  ))}
                </div>
                {renderPagination()}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
