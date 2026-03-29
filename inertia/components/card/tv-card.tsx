import { Link } from '@adonisjs/inertia/react'
import { cn } from '@/lib/utils'

interface TvCardProps {
  id: string
  name: string
  category: string
  logo?: string
  isLive?: boolean
}

export function TvCard({ id, name, category, logo, isLive = true }: TvCardProps) {
  return (
    <Link
      href={`/tv/channel/${id}`}
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-2xl',
        'border border-border/40 bg-surface-container-low p-5 shadow-sm transition-all duration-300',
        'hover:border-primary/30 hover:shadow-lg hover:-translate-y-1'
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex size-14 items-center justify-center rounded-xl bg-surface-container border border-border/50 shadow-inner group-hover:border-primary/20 transition-colors">
          {logo ? (
            <img src={logo} alt={name} className="size-10 object-contain drop-shadow-sm" />
          ) : (
            <span className="font-heading text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
              {name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        {isLive && (
          <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive border border-destructive/20 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
            <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
            Live
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {category}
        </p>
      </div>

      <div className="absolute -right-4 -bottom-4 size-24 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-150" />
    </Link>
  )
}
