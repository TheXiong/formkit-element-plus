<template>
    <FormKit ref="myForm" type="el-form" label-position="top" v-model="data" @submit="onSubmit">
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
  import { ref, defineComponent, watch } from 'vue'
  
  export default defineComponent({
    name: 'InputDemo',
    setup() {
      const data = ref()
      const myForm = ref()
  
      const schema = [
  {
    $formkit: 'el-input',
    name: 'name',
    label: 'name',
    validation: 'required'
  },
  {
    $formkit: 'el-select',
    name: 'type',
    label: 'type',
    validation: 'required',
    options: ['MQTT', 'TCP', 'UDP', 'HTTP'],
    id: 'a'
  },
  {
    $formkit: 'el-input',
    name: 'ip',
    label: 'ip',
    validation: 'required'
  },
  {
    $formkit: 'el-input',
    name: 'port',
    label: 'port',
    validation: 'required',
    key: 'port'
  },
  {
    $formkit: 'group',
    name: 'additional',
    label: 'additional',
    validation: 'required',
    if: '$get(a).value==MQTT',
    key: 'additional',
    children: [
      {
        $formkit: 'el-input',
        name: 'clientId',
        label: 'clientId',
        validation: 'required',
        key: 'clientId'
      },
      {
        $formkit: 'el-input',
        name: 'qos',
        label: 'qos',
        validation: 'required'
      },
      {
        $formkit: 'el-input',
        name: 'downTopic',
        label: 'downTopic',
        validation: 'required'
      },
      {
        $formkit: 'el-input',
        name: 'upTopic',
        label: 'upTopic',
        validation: 'required'
      },
      {
        $formkit: 'el-input',
        name: 'connectionTimeout',
        label: 'connectionTimeout',
        validation: 'required'
      },
      {
        $formkit: 'el-input',
        name: 'receiveDataMax',
        label: 'receiveDataMax',
        validation: 'required'
      }
    ]
  }
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
  