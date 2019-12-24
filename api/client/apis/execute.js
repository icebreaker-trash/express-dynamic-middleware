import request from '../request'

export function executeCodeWithApp (data) {
  return request.post('/execute', data)
}
