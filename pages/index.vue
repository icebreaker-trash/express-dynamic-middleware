<template>
  <section>
    <div>
      <el-button>添加</el-button>
    </div>

    <el-table v-loading="loading" :data="items" stripe>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="name" />
      <el-table-column prop="keys" label="keys" />
      <el-table-column prop="params" label="params" />
      <el-table-column prop="path" label="path" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getMiddlewareList, getMiddlewareRuntimeList } from '@/api/client'
export default {
  name: 'Index',
  data () {
    return {
      listQuery: {},
      items: [],
      total: 0,
      loading: false
    }
  },
  mounted () {
    this.getList()
    this.getRuntimeList()
  },
  methods: {
    async getList () {
      try {
        this.loading = true
        const { data } = await getMiddlewareList(this.listQuery)
        this.items = data
        this.total = data.length
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getRuntimeList () {
      try {
        const { data } = await getMiddlewareRuntimeList()
        return data
      } catch (error) {
        console.error(error)
      }
    },
    handleAdd () {},
    handleEdit () {},
    handleDelete () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
