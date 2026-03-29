import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'football/index': ExtractProps<(typeof import('../../inertia/pages/football/index.tsx'))['default']>
    'football/show': ExtractProps<(typeof import('../../inertia/pages/football/show.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'profile/index': ExtractProps<(typeof import('../../inertia/pages/profile/index.tsx'))['default']>
    'tv/index': ExtractProps<(typeof import('../../inertia/pages/tv/index.tsx'))['default']>
    'tv/show': ExtractProps<(typeof import('../../inertia/pages/tv/show.tsx'))['default']>
  }
}
