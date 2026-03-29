const DUMMY_CHANNELS = [
  { id: '1', name: 'SKY SPORTS' },
  { id: '2', name: 'ESPN' },
  { id: '3', name: 'BEIN' },
  { id: '4', name: 'TNT' },
  { id: '5', name: 'NBC' },
  { id: '6', name: 'CBS' },
  { id: '7', name: 'PRIME' },
  { id: '8', name: 'DAZN' },
]

export default function TVShow() {
  return (
    <div className="min-h-screen bg-background text-foreground flex antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface-container-low hidden md:flex flex-col border-r border-border/50">
        <div className="h-20 flex items-center px-8">
          <h1 className="font-heading font-bold text-2xl text-primary tracking-tighter">
            StreamVerse
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="text-muted-foreground hover:text-foreground hover:bg-surface-container px-4 py-2 rounded-md transition-colors cursor-pointer">
            Home
          </div>
          <div className="text-muted-foreground hover:text-foreground hover:bg-surface-container px-4 py-2 rounded-md transition-colors cursor-pointer">
            Live Matches
          </div>
          <div className="text-foreground bg-surface-container px-4 py-2 rounded-md transition-colors cursor-pointer font-medium">
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

        <div className="p-8">
          {/* Top Navigation specific to channels */}
          <div className="mb-8">
            <h2 className="font-heading font-bold text-2xl mb-4">Browse Channels</h2>
            <div
              className="w-full overflow-x-auto pb-6 pt-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-5 min-w-max px-1">
                {DUMMY_CHANNELS.map((channel) => (
                  <div
                    key={channel.id}
                    className="w-[72px] h-[72px] rounded-full bg-surface-container border border-border/30 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high hover:border-primary/30 transition-all duration-300 shadow-sm hover:-translate-y-1"
                  >
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {channel.name.substring(0, 4)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Main Video Area */}
            <div className="flex-1">
              <div className="aspect-video w-full bg-[#0a0a0a] rounded-[2rem] overflow-hidden relative shadow-lg flex items-center justify-center border border-border/10">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-all hover:scale-105 backdrop-blur-md">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary-foreground border-b-[10px] border-b-transparent ml-2 opacity-90"></div>
                </div>
                <div className="absolute top-8 left-8">
                  <div className="font-heading font-bold text-2xl tracking-tighter text-white/80 mix-blend-overlay">
                    SKY SPORTS
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3 tracking-tight">
                    Sky Sports Premier League
                  </h1>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 bg-destructive/10 text-destructive text-[10px] font-bold rounded-md uppercase tracking-widest border border-destructive/20">
                      Live Broadcast
                    </span>
                    <p className="text-muted-foreground font-medium text-sm">
                      Now playing: Goal Rush - Matchweek 24 Analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: TV Guide */}
            <div className="w-full xl:w-[400px]">
              <div className="bg-surface-container-low p-8 rounded-2xl border border-border/30 shadow-sm">
                <h3 className="font-heading font-bold text-xl mb-8">Schedule</h3>

                <div className="relative border-l border-border/50 pl-8 space-y-10 pb-4 ml-2">
                  {/* Current Live Block */}
                  <div className="relative group">
                    <span className="absolute -left-[37px] w-3 h-3 rounded-full bg-primary ring-[6px] ring-primary/20 shadow-[0_0_12px_rgba(107,139,189,0.8)]"></span>

                    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5 flex items-center gap-2">
                      14:00 - 16:00
                      <span className="text-[9px] bg-primary/20 px-1.5 py-0.5 rounded text-primary">
                        LIVE
                      </span>
                    </div>
                    <div className="font-heading font-semibold text-xl mb-2 text-foreground">
                      Matchweek Analysis
                    </div>
                    <div className="text-muted-foreground text-sm leading-relaxed">
                      In-depth review of yesterday's games, featuring highlights and tactical
                      breakdowns.
                    </div>
                  </div>

                  {/* Upcoming Block 1 */}
                  <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                    <span className="absolute -left-[35px] w-2 h-2 rounded-full bg-border ring-[4px] ring-surface-container-low"></span>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      16:00 - 18:00
                    </div>
                    <div className="font-heading font-semibold text-xl">Build Up: PL Matchday</div>
                  </div>

                  {/* Upcoming Block 2 */}
                  <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                    <span className="absolute -left-[35px] w-2 h-2 rounded-full bg-border ring-[4px] ring-surface-container-low"></span>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      18:00 - 20:30
                    </div>
                    <div className="font-heading font-semibold text-xl">
                      Live: Arsenal vs Chelsea
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
