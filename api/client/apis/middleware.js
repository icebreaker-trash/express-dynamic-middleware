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
  const {
    id
  } = data
  return request.put(`/middleware/${id}`, data)
}

export function deleteMiddleware (id) {
  return request.delete(`/middleware/${id}`)
}
