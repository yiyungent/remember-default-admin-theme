import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/admin/plugins/list',
    method: 'get',
    params
  })
}
