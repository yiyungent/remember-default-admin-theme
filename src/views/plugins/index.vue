<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.status"
        placeholder="插件状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in pluginStatusOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="PluginID" width="95">
        <template slot-scope="scope">
          {{ scope.row.pluginID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="插件名" width="100">
        <template slot-scope="scope">
          {{ scope.row.displayName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{
            scope.row.status | statusFilter
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="版本" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.version">{{ scope.row.version }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button v-if="row.status == 'enabled'" size="mini" type="success">
            禁用
          </el-button>
          <el-button v-if="row.status == 'disabled'" size="mini">
            启用
          </el-button>
          <el-button v-if="row.status == 'disabled'" size="mini" type="danger">
            卸载
          </el-button>
          <el-button
            v-if="row.status == 'uninstalled'"
            size="mini"
            type="danger"
          >
            删除
          </el-button>
          <el-button
            size="mini"
            type="info"
          >
            设置
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/admin/plugins";

const pluginStatusOptions = [
  { key: "installed", display_name: "已安装" },
  { key: "enabled", display_name: "已启用" },
  { key: "disabled", display_name: "已禁用" },
  { key: "uninstalled", display_name: "已卸载" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const pluginStatusKeyValue = pluginStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  filters: {
    statusFilter(status) {
      return pluginStatusKeyValue[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        status: undefined
      },
      pluginStatusOptions
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    }
  }
};
</script>
