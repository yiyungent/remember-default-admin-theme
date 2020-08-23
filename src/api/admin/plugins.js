import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/admin/plugins/list",
    method: "get",
    params
  });
}
