import request from '../request'

export function getMiddlewareList (params) {
  return request.get('/middleware', params)
}

export function getMiddlewareRuntimeList (params) {
  return request.get('/middleware/runtime', params)
}

export function postMiddleware (data) {
  return request.post('/middleware', data)
}

export function putMiddleware (data) {
  return request.put('/middleware', data)
}

export function deleteMiddleware (params) {
  return request.delete('/middleware', params)
}
