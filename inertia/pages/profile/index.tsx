import * as React from 'react'

export default function Profile() {
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

        <div className="p-8">
          <div className="max-w-3xl mx-auto py-8 lg:py-12">
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 tracking-tight">
              Account Settings
            </h1>
            <p className="text-muted-foreground mb-10">
              Manage your profile, preferences, and security settings.
            </p>

            <div className="space-y-8">
              {/* General Information Section */}
              <section className="bg-surface-container-low rounded-[2rem] p-8 md:p-10 border border-border/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>

                <h2 className="font-heading font-bold text-2xl mb-8 relative z-10">
                  General Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Hunter"
                      className="w-full bg-surface-container rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="alex@streamverse.tv"
                      className="w-full bg-surface-container rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2.5 md:col-span-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Massive football fan. Catching every Premier League game unconditionally."
                      className="w-full bg-surface-container rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent transition-all resize-none shadow-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-end relative z-10">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
                    Save Changes
                  </button>
                </div>
              </section>

              {/* Password Change Section */}
              <section className="bg-surface-container-low rounded-[2rem] p-8 md:p-10 border border-border/20 shadow-sm">
                <h2 className="font-heading font-bold text-2xl mb-8">Security & Password</h2>

                <div className="max-w-md space-y-6">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-surface-container rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-surface-container rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button className="bg-surface-container-high hover:bg-surface-container-highest text-foreground px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.98]">
                    Update Password
                  </button>
                </div>
              </section>

              {/* Danger Zone Section */}
              <section className="bg-surface-container-low border border-destructive/20 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <h2 className="font-heading font-bold text-2xl text-destructive mb-3">
                    Danger Zone
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>

                  <div className="bg-surface-container border border-destructive/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-foreground">
                        Permanently Delete Account
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        This action will immediately delete all personal data and active
                        subscriptions from StreamVerse.
                      </p>
                    </div>
                    <button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm shrink-0 active:scale-[0.98]">
                      Delete Account
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
