<template>
    <FormKit ref="myForm" type="el-form" v-model="data" @submit="onSubmit">
      <FormKitSchema1 :schema="schema" />
  
      <template #footer="{ disabled, node }">
        <el-button
          :loading="disabled"
          :disabled="disabled"
          type="primary"
          @click="node.submit"
          >提交</el-button
        >
      </template>
    </FormKit>
  
    <pre>{{ data }}</pre>
  </template>
  
  <script>
  import { ref, defineComponent, watch } from 'vue'
  import FormKitSchema1 from '../components/FormKitSchema.ts'
  
  export default defineComponent({
    name: 'InputDemo',
    components: {
      FormKitSchema1
    },
    setup() {
      const data = ref()
      const myForm = ref()
  
      const schema = [
        {
          $formkit: 'el-array-items',
          name: 'table',
          label: 'cccc',
          addLabel: '添加',
          min: 1,
        //   max: 4,
          children: [
            {
              $formkit: 'el-switch',
              name: 'a',
              label: `a`,
              inlinePrompt: true,
              value: true,
              width: 100,
            },
            {
              $formkit: 'el-input',
              name: 'b',
              label: `b`,
              validation: 'required',
            },
            {
              $formkit: 'el-select',
              name: 'c',
              label: 'c',
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '3' },
                { label: '3', value: '4' },
              ],
            },
          ],
        },
      ]
  
      const onSubmit = () => {
        console.log(data.value, 'submited')
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      }
  
      return { data, myForm, onSubmit, schema }
    },
  })
  </script>
  
  <style>
  .el-form-item .el-form-item {
    margin-bottom: 0px !important;
  }
  </style>