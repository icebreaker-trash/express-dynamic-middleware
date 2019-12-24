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
      <el-form :model="formData" label-width="100px">
        <el-form-item label="path">
          <el-input v-model="formData.path" />
        </el-form-item>
        <el-form-item label="method">
          <el-select v-model="formData.method" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="formData.code" type="textarea" :autosize="{ minRows: 10}" placeholder="请输入内容" />
        </el-form-item>

        <el-button @click="confirm">
          提交
        </el-button>
      </el-form>
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
  code: '',
  path: '',
  method: 'all'
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
      formData: shadowClone(_formData),
      options: [{
        value: 'all',
        label: 'all'
      }, {
        value: 'get',
        label: 'get'
      }, {
        value: 'post',
        label: 'post'
      }, {
        value: 'put',
        label: 'put'
      }, {
        value: 'delete',
        label: 'delete'
      }]
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
