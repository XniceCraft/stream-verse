/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  football: {
    index: typeof routes['football.index']
    show: typeof routes['football.show']
  }
  tv: {
    index: typeof routes['tv.index']
    show: typeof routes['tv.show']
  }
  profile: {
    index: typeof routes['profile.index']
  }
}
