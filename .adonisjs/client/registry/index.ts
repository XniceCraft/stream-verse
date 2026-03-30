/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'football.index': {
    methods: ["GET","HEAD"],
    pattern: '/football',
    tokens: [{"old":"/football","type":0,"val":"football","end":""}],
    types: placeholder as Registry['football.index']['types'],
  },
  'football.show': {
    methods: ["GET","HEAD"],
    pattern: '/football/match/:id',
    tokens: [{"old":"/football/match/:id","type":0,"val":"football","end":""},{"old":"/football/match/:id","type":0,"val":"match","end":""},{"old":"/football/match/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['football.show']['types'],
  },
  'tv.index': {
    methods: ["GET","HEAD"],
    pattern: '/tv',
    tokens: [{"old":"/tv","type":0,"val":"tv","end":""}],
    types: placeholder as Registry['tv.index']['types'],
  },
  'tv.show': {
    methods: ["GET","HEAD"],
    pattern: '/tv/channel/:id',
    tokens: [{"old":"/tv/channel/:id","type":0,"val":"tv","end":""},{"old":"/tv/channel/:id","type":0,"val":"channel","end":""},{"old":"/tv/channel/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tv.show']['types'],
  },
  'profile.index': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
