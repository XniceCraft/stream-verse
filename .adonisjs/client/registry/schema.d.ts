/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/page_controller').default['home']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/page_controller').default['home']>>>
    }
  }
  'football.index': {
    methods: ["GET","HEAD"]
    pattern: '/football'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/football').footballFiltersValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/football_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/football_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'football.show': {
    methods: ["GET","HEAD"]
    pattern: '/football/match/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/football_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/football_controller').default['show']>>>
    }
  }
  'tv.index': {
    methods: ["GET","HEAD"]
    pattern: '/tv'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/tv').tvFiltersValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tv_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tv_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tv.show': {
    methods: ["GET","HEAD"]
    pattern: '/tv/channel/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tv_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tv_controller').default['show']>>>
    }
  }
  'profile.index': {
    methods: ["GET","HEAD"]
    pattern: '/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
