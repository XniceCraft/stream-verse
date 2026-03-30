import { useCallback, useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Link } from '@adonisjs/inertia/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { UserIcon, TextAlignJustify } from 'lucide-react'
import { cn } from '@/lib/utils'

export type NavigationSection = {
  title: string
  href: string
}

const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Football',
    href: '/football',
  },
  {
    title: 'TV',
    href: '/tv',
  },
]

function UserMenuButton({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden bg-blue-800/50 hover:bg-blue-800/80',
            className
          )}
        >
          <span className="relative z-10 transition-all duration-500 hover:cursor-pointer">
            You
          </span>
          <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
            <UserIcon size={16} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const currentUrl = usePage().url.split('?')[0]
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY >= 50)
  }, [])

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleScroll, handleResize])

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out',
          scrolled
            ? 'top-3 left-[max(0.75rem,calc(50%-22rem))] right-[max(0.75rem,calc(50%-22rem))]'
            : 'top-0'
        )}
      >
        <nav
          className={cn(
            'flex items-center justify-between gap-3.5 lg:gap-6 transition-all duration-500 ease-in-out',
            scrolled
              ? 'px-3 py-2 bg-background/60 backdrop-blur-xl border border-border/40 shadow-2xl shadow-primary/10 rounded-full'
              : 'mx-auto max-w-7xl w-full px-4 py-4 sm:px-6'
          )}
        >
          <Link
            route="home"
            className={cn(
              'tracking-tight text-gray-900 font-bold transition-all duration-500 origin-left',
              scrolled ? 'text-base' : 'text-xl'
            )}
          >
            StreamVerse
          </Link>

          <div>
            <NavigationMenu className="max-lg:hidden bg-blue-800/50 p-0.5 rounded-full">
              <NavigationMenuList className="flex gap-x-1">
                {navigationData.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className={cn(
                        'px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-gray-50 hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal',
                        currentUrl === navItem.href && 'bg-background text-foreground'
                      )}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <UserMenuButton className="hidden lg:flex" />

          <div className="lg:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors">
                <TextAlignJustify size={20} />
                <span className="sr-only">Menu</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 mt-2">
                {navigationData.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <a href={item.href} className="w-full cursor-pointer text-sm font-medium">
                      {item.title}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>
    </>
  )
}
