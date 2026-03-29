import { useState } from 'react'
import { Tv, Play } from 'lucide-react'
import { Seo } from '@/components/other/seo'
import { urlFor } from '@/client'

import type { InertiaProps } from '@/types'
import type { Data } from '@generated/data'
import type { Stream } from '#types/contract/football'

export default function FootballShow({
  match,
}: InertiaProps<{
  match: Data.Football.Variants['detail']
}>) {
  const [activeStream, setActiveStream] = useState<Stream | null>(match.streams?.[0] || null)

  return (
    <>
      <Seo title={match.title} path={urlFor('football.show', { id: match.id })} />
      <div className="min-h-screen bg-background text-foreground flex antialiased">
        <aside className="w-64 bg-surface-container-low hidden md:flex flex-col border-r border-border/50">
          <header className="h-20 flex items-center px-8">
            <h1 className="font-heading font-bold text-2xl text-primary tracking-tighter">
              StreamVerse
            </h1>
          </header>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="text-muted-foreground hover:text-foreground hover:bg-surface-container px-4 py-2 rounded-md transition-colors cursor-pointer">
              Home
            </div>
            <div className="text-foreground bg-surface-container px-4 py-2 rounded-md transition-colors cursor-pointer font-medium">
              Live Matches
            </div>
            <div className="text-muted-foreground hover:text-foreground hover:bg-surface-container px-4 py-2 rounded-md transition-colors cursor-pointer">
              TV Channels
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full bg-surface overflow-y-auto">
          <header className="h-20 flex items-center justify-between px-8 bg-surface-container-low/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-primary/20 border border-border/50 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">US</span>
              </div>
            </div>
          </header>

          <article className="p-8">
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Main Video Area */}
              <section className="flex-1">
                <figure className="aspect-video w-full bg-[#0a0a0a] rounded-[2rem] overflow-hidden relative shadow-lg flex items-center justify-center border border-border/10">
                  {activeStream ? (
                    <iframe
                      src={activeStream.url}
                      className="w-full h-full border-0"
                      allowFullScreen
                      title={activeStream.name}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                      <Tv className="w-12 h-12 opacity-50" />
                      <p>No stream available</p>
                    </div>
                  )}
                </figure>

                {/* Server Selection */}
                {match.streams && match.streams.length > 0 && (
                  <nav className="mt-6 flex flex-wrap gap-3 items-center">
                    <span className="font-medium text-sm text-muted-foreground mr-2">Servers:</span>
                    {match.streams.map((stream) => (
                      <button
                        key={stream.id}
                        onClick={() => setActiveStream(stream)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          activeStream?.id === stream.id
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-surface-container hover:bg-surface-container-high text-foreground border border-border/50'
                        }`}
                      >
                        <Play className="w-4 h-4" />
                        {stream.name}
                      </button>
                    ))}
                  </nav>
                )}

                <header className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6">
                  <div>
                    <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 tracking-tight">
                      {match.title}
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      {match.league.logo && (
                        <img
                          src={match.league.logo}
                          alt={match.league.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <p className="text-muted-foreground font-medium">
                        {match.league.name}
                        {match.info?.venue ? ` • ${match.info.venue}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Live Scoreboard */}
                  <div className="bg-surface-container rounded-2xl px-6 py-3 flex gap-6 text-center items-center shadow-sm border border-border/30">
                    <div className="flex items-center gap-3">
                      {match.teams.home.badge && (
                        <img
                          src={match.teams.home.badge}
                          alt={match.teams.home.name}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <div className="flex flex-col items-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                          {match.teams.home.code}
                        </div>
                        <div className="font-heading font-bold text-3xl text-primary leading-none">
                          {match.score.home}
                        </div>
                      </div>
                    </div>
                    <span className="text-border/50 font-light text-2xl">-</span>
                    <div className="flex items-center gap-3 flex-row-reverse">
                      {match.teams.away.badge && (
                        <img
                          src={match.teams.away.badge}
                          alt={match.teams.away.name}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <div className="flex flex-col items-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                          {match.teams.away.code}
                        </div>
                        <div className="font-heading font-bold text-3xl leading-none">
                          {match.score.away}
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
              </section>

              {/* Sidebar: Match Stats / Chat */}
              <aside className="w-full xl:w-[400px] flex flex-col gap-6">
                <section className="bg-surface-container-low p-6 rounded-2xl border border-border/30 h-[450px] flex flex-col shadow-sm">
                  <header className="font-heading font-bold text-xl mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Live Chat
                    </div>
                    {match.status && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {match.status}
                      </span>
                    )}
                  </header>

                  <div className="flex-1 overflow-y-auto space-y-5 mb-6 pr-2">
                    <div className="group">
                      <span className="text-xs font-bold text-primary block mb-0.5">User123</span>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        Wow what a strike!! He's been practicing that.
                      </p>
                    </div>
                    <div className="group">
                      <span className="text-xs font-bold block mb-0.5 text-foreground/70">
                        FootballFan
                      </span>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        The defense is completely sleeping today.
                      </p>
                    </div>
                    <div className="group">
                      <span className="text-xs font-bold text-primary block mb-0.5">Gunner99</span>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        COME ON YOU GUNNERS!! Hold the line!
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-auto">
                    <input
                      type="text"
                      placeholder="Say something..."
                      className="w-full bg-surface-container rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent transition-all placeholder:text-muted-foreground/60"
                    />
                  </div>
                </section>
              </aside>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
