<template>
    <FormKit ref="myForm" type="el-form" v-model="data" @submit="onSubmit">
      <FormKitSchema :schema="schema" />
  
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
  import { ref, defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'InputDemo',
    setup() {
      const data = ref()
      const myForm = ref()
  
      const schema = [
        {
          $formkit: 'el-array-table',
          name: 'table',
          label: 'table',
          addLabel: '添加',
          removeControl: true,
          upControl: true,
          downControl: true,
          insertControl: true,
          min: 1,
        //   max: 4,
          columns: [
            {
              $formkit: 'el-switch',
              name: 'a',
              label: `a`,
              inlinePrompt: true,
              value: true,
              columnWidth: 100,
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
            //   style: 'width: 100%;',
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
  