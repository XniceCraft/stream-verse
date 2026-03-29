import { Link } from '@adonisjs/inertia/react'
import { cn } from '@/lib/utils'

import type { Status } from '../../../types/contract/football'

interface FootballCardProps {
  id: string
  league: string
  status: Status
  homeTeamName: string
  awayTeamName: string
  homeTeamLogo: string
  awayTeamLogo: string
  matchTime: string
  score: string
}

const cardBackground: Record<Status, string> = {
  inprogress: 'bg-red-50/20',
  notstarted: 'bg-amber-50/20',
  finished: 'bg-green-50/20',
}

export function FootballCard({
  id,
  league,
  status,
  homeTeamName,
  awayTeamName,
  homeTeamLogo,
  awayTeamLogo,
  matchTime,
  score,
}: FootballCardProps) {
  return (
    <Link
      route="football.show"
      routeParams={{ id: id }}
      className={cn(
        'relative w-full max-w-64 overflow-hidden rounded-2xl',
        cardBackground[status],
        'border border-border/40 p-4 shadow-xl backdrop-blur-sm',
        'transition-all duration-300 hover:shadow-2xl hover:border-border/60'
      )}
    >
      <div
        className="pointer-events-none absolute -top-1/2 -left-1/2 h-[200%] w-[200%]"
        style={{
          background:
            status === 'inprogress'
              ? 'radial-gradient(circle, rgba(230,0,0,0.04) 0%, transparent 60%)'
              : 'radial-gradient(circle, rgba(107,139,189,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <header className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground">
          {league}
        </header>

        <div className="flex flex-col items-center gap-4 py-1">
          <TeamBadge name={homeTeamName} logo={homeTeamLogo} />

          <div className="relative flex w-full flex-col items-center gap-1 py-1">
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-border/40" />
            <div className="relative bg-surface-container-high/60 px-4 backdrop-blur-md">
              <span className="font-heading text-4xl font-extrabold tracking-tighter text-foreground drop-shadow-sm">
                {score}
              </span>
            </div>
            <time
              className={cn(
                'text-sm font-semibold tracking-wide',
                status === 'inprogress' ? 'text-red-500' : 'text-muted-foreground'
              )}
            >
              {matchTime}
            </time>
          </div>

          <TeamBadge name={awayTeamName} logo={awayTeamLogo} />
        </div>
      </div>
    </Link>
  )
}

function TeamBadge({ name, logo }: { name: string; logo: string }) {
  return (
    <figure className="flex w-full flex-col items-center gap-2 px-2">
      <div className="flex size-13 items-center justify-center rounded-2xl bg-surface-container-highest/40 p-1.5 backdrop-blur-sm">
        <img src={logo} alt={name} className="size-full object-contain drop-shadow-lg" />
      </div>
      <figcaption className="w-full truncate text-center text-sm font-semibold text-foreground/90">
        {name}
      </figcaption>
    </figure>
  )
}
