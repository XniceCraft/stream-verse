import type { Pagination } from './pagination.js'

export interface ServiceResponse<T> {
  data: T
  pagination?: Pagination
}
