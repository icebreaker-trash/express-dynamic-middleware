import request from '../request'

export function getMiddlewareList (params) {
  return request.get('/middleware', params)
}

export function getMiddlewareRuntimeList (params) {
  return request.get('/middleware/runtime', params)
}
