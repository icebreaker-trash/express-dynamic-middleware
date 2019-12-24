<template>
  <div>
    <client-only>
      <div class="border">
        <codemirror v-model="code" :options="cmOptions" />
      </div>
    </client-only>
    <el-button @click="execute">
      运行
    </el-button>
    <div>output:{{ output }}</div>
  </div>
</template>

<script>

import 'codemirror/lib/codemirror.css'
import { executeCodeWithApp } from '@/api/client/apis/execute'
const components = {}
if (process.client) {
  const Codemirror = require('@/components/Codemirror').default
  Object.assign(components, { Codemirror })
}
export default {
  name: 'Code',
  components,
  data () {
    return {
      code: '',
      cmOptions: {

      },
      output: ''
    }
  },
  methods: {
    async execute () {
      try {
        const {
          data: {
            output
          }
        } = await executeCodeWithApp({ code: this.code })
        this.output = typeof output === 'string' ? output : JSON.stringify(output)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
 border: 1px solid black;
}
</style>
