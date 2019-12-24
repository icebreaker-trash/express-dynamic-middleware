<template>
  <section>
    <div>
      <el-button @click="handleAdd">
        添加
      </el-button>
    </div>

    <el-table v-loading="loading" :data="items" stripe>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="name" />
      <el-table-column prop="keys" label="keys" />
      <el-table-column prop="params" label="params" />
      <el-table-column prop="path" label="path" />
      <el-table-column prop="code" label="code" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="codeDialogVisible">
      <el-input v-model="formData.code" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" />
      <el-button @click="confirm">
        提交
      </el-button>
    </el-dialog>
  </section>
</template>

<script>
import {
  getMiddlewareList,
  getMiddlewareRuntimeList,
  postMiddleware,
  putMiddleware,
  deleteMiddleware
} from '@/api/client'
const _formData = {
  id: null,
  code: ''
}
function shadowClone (t) {
  return { ...t }
}

export default {
  name: 'Index',
  data () {
    return {
      listQuery: {},
      items: [],
      total: 0,
      loading: false,
      codeDialogVisible: false,
      formData: shadowClone(_formData)
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
        const {
          data: { items, total }
        } = await getMiddlewareList(this.listQuery)
        this.items = items
        this.total = total
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
    handleAdd () {
      this.formData = shadowClone(_formData)
      this.codeDialogVisible = true
    },
    confirm () {
      this.formData.id ? this.confirmUpdate() : this.confirmAdd()
    },
    async confirmAdd () {
      try {
        await postMiddleware(this.formData)
      } catch (error) {}
    },
    async confirmUpdate () {
      try {
        await putMiddleware(this.formData)
      } catch (error) {}
    },
    handleEdit (row) {
      this.formData = shadowClone(row)
      this.codeDialogVisible = true
    },
    handleDelete ({ id }) {
      this.$confirm('要删吗？').then(() => {
        deleteMiddleware(id).then((res) => {
          this.getList()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
