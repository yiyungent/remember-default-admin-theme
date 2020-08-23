import request from "@/utils/request";

export function listAction(status) {
  return request({
    url: "/admin/plugins/list",
    method: "get",
    params: { status: status }
  });
}

export function installAction(pluginId) {
  return request({
    url: "/admin/plugins/install",
    method: "post",
    params: { pluginId: pluginId }
  });
}

export function uninstallAction(pluginId) {
  return request({
    url: "/admin/plugins/uninstall",
    method: "post",
    params: { pluginId: pluginId }
  });
}

export function deleteAction(pluginId) {
  return request({
    url: "/admin/plugins/delete",
    method: "post",
    params: { pluginId: pluginId }
  });
}

export function enableAction(pluginId) {
  return request({
    url: "/admin/plugins/enable",
    method: "post",
    params: { pluginId: pluginId }
  });
}

export function disableAction(pluginId) {
  return request({
    url: "/admin/plugins/disable",
    method: "post",
    params: { pluginId: pluginId }
  });
}
