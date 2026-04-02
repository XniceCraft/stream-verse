import './css/app.css'
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/manrope/wght.css'
import { client } from './client'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { StrictMode } from 'react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { NuqsAdapter } from 'nuqs/adapters/react'
import MainLayout from '@/components/layout/main-layout'

import type { ReactElement } from 'react'
import type { Data } from '@generated/data'

createInertiaApp({
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (pageElement: ReactElement<Data.SharedProps>) => <MainLayout children={pageElement} />
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <NuqsAdapter>
          <TuyauProvider client={client}>
            <App {...props} />
          </TuyauProvider>
        </NuqsAdapter>
      </StrictMode>
    )
  },
  progress: {
    color: '#4B5563',
  },
})
