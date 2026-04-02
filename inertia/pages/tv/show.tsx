import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { Seo } from '@/components/other/seo'
import { Play } from 'lucide-react'
import { urlFor } from '@/client'
import {
  MediaPlayer,
  MediaPlayerVideo,
  MediaPlayerLoading,
  MediaPlayerError,
  MediaPlayerVolumeIndicator,
  MediaPlayerControls,
  MediaPlayerControlsOverlay,
  MediaPlayerPlay,
  MediaPlayerSeekBackward,
  MediaPlayerSeekForward,
  MediaPlayerVolume,
  MediaPlayerTime,
  MediaPlayerFullscreen,
} from '@/components/ui/media-player'
import MuxVideo from '@mux/mux-video-react'

import type { InertiaProps } from '@/types'
import type { Data } from '@generated/data'

export default function TVShow({ channel }: InertiaProps<{ channel: Data.Tv.Variants['detail'] }>) {
  const [activeStream, setActiveStream] = useState<
    Data.Tv.Variants['detail']['streams'][number] | null
  >(channel.streams?.[0] || null)

  return (
    <>
      <Seo title={channel.name} path={urlFor('tv.show', { id: channel.id })} />

      <div className="min-h-screen bg-background text-foreground flex antialiased">
        <aside className="w-64 bg-surface-container-low hidden md:flex flex-col border-r border-border/50">
          <div className="h-20 flex items-center px-8 text-xl font-bold text-primary tracking-tighter">
            <Link href="/">StreamVerse</Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/"
              className="block text-muted-foreground hover:text-foreground hover:bg-surface-container px-4 py-2 rounded-md transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/football"
              className="block text-muted-foreground hover:text-foreground hover:bg-surface-container px-4 py-2 rounded-md transition-colors font-medium"
            >
              Live Matches
            </Link>
            <Link
              href="/tv"
              className="block text-foreground bg-surface-container px-4 py-2 rounded-md transition-colors font-medium"
            >
              TV Channels
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full bg-surface overflow-y-auto">
          <header className="h-20 flex items-center justify-between px-8 bg-surface-container-low/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 border border-border/50 flex items-center justify-center">
                <span className="text-xs font-bold text-primary uppercase">
                  {channel.country || 'TV'}
                </span>
              </div>
            </div>
          </header>

          <div className="p-8">
            <div className="flex flex-col xl:flex-row gap-8">
              <div className="flex-1">
                <div className="aspect-video w-full bg-[#0a0a0a] rounded-4xl overflow-hidden relative shadow-lg flex items-center justify-center border border-border/10">
                  {activeStream ? (
                    <MediaPlayer autoHide className="w-full h-full">
                      <MediaPlayerVideo asChild>
                        <MuxVideo src={activeStream.url} autoPlay crossOrigin="" />
                      </MediaPlayerVideo>
                      <MediaPlayerLoading />
                      <MediaPlayerError />
                      <MediaPlayerVolumeIndicator />

                      <MediaPlayerControls>
                        <MediaPlayerControlsOverlay />
                        <MediaPlayerPlay />
                        <MediaPlayerSeekBackward />
                        <MediaPlayerSeekForward />
                        <MediaPlayerVolume />
                        <MediaPlayerTime />
                        <MediaPlayerFullscreen />
                      </MediaPlayerControls>
                    </MediaPlayer>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                        <span className="text-destructive font-bold text-xl uppercase tracking-widest">
                          Offline
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-white mb-2">
                        No Stream Available
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        We're sorry, but there are no active broadcasts available for {channel.name}{' '}
                        at this time.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between items-start">
                  {channel.streams && channel.streams.length > 0 && (
                    <nav className="mt-6 flex flex-wrap gap-3 items-center">
                      <span className="font-medium text-sm text-muted-foreground mr-2">
                        Servers:
                      </span>
                      {channel.streams.map((stream) => (
                        <button
                          key={stream.url}
                          onClick={() => setActiveStream(stream)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            activeStream?.url === stream.url
                              ? 'bg-primary text-primary-foreground shadow-md'
                              : 'bg-surface-container hover:bg-surface-container-high text-foreground border border-border/50'
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          {stream.title}
                        </button>
                      ))}
                    </nav>
                  )}
                  <div>
                    <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3 tracking-tight">
                      {channel.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="px-2.5 py-1 bg-destructive/10 text-destructive text-[10px] font-bold rounded-md uppercase tracking-widest border border-destructive/20">
                        Live Broadcast
                      </span>
                      <p className="text-muted-foreground font-medium text-sm">
                        Categories:{' '}
                        {channel.categories.length > 0 ? channel.categories.join(', ') : 'General'}
                      </p>
                    </div>
                    {channel.website && (
                      <p className="mt-3 text-muted-foreground font-medium text-sm">
                        Website:{' '}
                        <a
                          href={channel.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {channel.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar: TV Guide / Info */}
              <div className="w-full xl:w-[400px]">
                <div className="bg-surface-container-low p-8 rounded-2xl border border-border/30 shadow-sm">
                  <h3 className="font-heading font-bold text-xl mb-6">Channel Info</h3>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 border-b border-border/50 pb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Country
                      </span>
                      <span className="font-medium text-foreground uppercase">
                        {channel.country || 'Unknown'}
                      </span>
                    </div>

                    {channel.network && (
                      <div className="flex flex-col gap-1 border-b border-border/50 pb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Network
                        </span>
                        <span className="font-medium text-foreground">{channel.network}</span>
                      </div>
                    )}

                    <div className="flex flex-col gap-1 pb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Streams
                      </span>
                      <span className="font-medium text-foreground">
                        {channel.streams.length} Stream{channel.streams.length === 1 ? '' : 's'}{' '}
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
