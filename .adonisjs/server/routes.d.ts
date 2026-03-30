import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'football.index': { paramsTuple?: []; params?: {} }
    'football.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tv.index': { paramsTuple?: []; params?: {} }
    'tv.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'football.index': { paramsTuple?: []; params?: {} }
    'football.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tv.index': { paramsTuple?: []; params?: {} }
    'tv.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'football.index': { paramsTuple?: []; params?: {} }
    'football.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tv.index': { paramsTuple?: []; params?: {} }
    'tv.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.index': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}