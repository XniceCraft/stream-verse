import { TooltipProvider } from '@/components/ui/tooltip'

export default function MainLayout({ children }: { children?: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}
