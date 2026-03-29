import { FootballCard } from '@/components/card/football-card'
import { Navbar } from '@/components/layout/navbar'
import { Seo } from '@/components/other/seo'
import { formatDateTime } from '@/lib/utils'

import type { InertiaProps } from '@/types'
import type { Data } from '@generated/data'

export default function Home({
  liveFootball,
  upcomingFootball,
}: InertiaProps<{
  liveFootball: Data.Football[]
  upcomingFootball: Data.Football[]
}>) {
  return (
    <>
      <Seo title="Home" />

      <Navbar />
      <main>
        <section
          id="hero-section"
          className="bg-blue-50 flex min-h-screen items-center justify-center"
        >
          <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
            <div>
              <h1>StreamVerse</h1>
              <p>Watch live football matches for free</p>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Live Football Matches</h2>
            {liveFootball.length === 0 ? (
              <p className="text-center text-muted-foreground">No football matches available</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {liveFootball.map((match) => (
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

          <section>
            <h2 className="mb-4 text-2xl font-bold">Upcoming Football Matches</h2>
            {upcomingFootball.length === 0 ? (
              <p className="text-center text-muted-foreground">No football matches available</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {upcomingFootball.map((match) => (
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
          <section>
            <h2 className="mb-4 text-2xl font-bold">TV Channels</h2>
            <p className="text-center text-muted-foreground">No TV channels available</p>
          </section>
        </div>
      </main>
    </>
  )
}
