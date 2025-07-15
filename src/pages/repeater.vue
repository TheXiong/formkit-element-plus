<template>
  <FormKit ref="myForm" type="el-form" v-model="data" @submit="onSubmit">
    <FormKitSchema :schema="schema" />

    <template #footer="{ disabled, node }">
      <el-button :loading="disabled" :disabled="disabled" type="primary" @click="node.submit">提交</el-button>
    </template>
  </FormKit>

  <pre>{{ data }}</pre>
</template>

<script>
import { ref, defineComponent } from 'vue'

const paramTypeMap = {
  NUMBER: '数字',
  STRING: '字符串',
  BOOLEAN: '布尔',
  ENUM: '枚举'
  // OBJECT: '对象',
}

export default defineComponent({
  name: 'InputDemo',
  setup() {
    const data = ref()
    const myForm = ref()

    const schema = [
      {
        $formkit: 'el-input',
        name: 'paramKey',
        label: '参数key',
        validation: 'required',
        validationMessages: { required: '请输入参数key' }
      },
      {
        $formkit: 'el-input',
        name: 'name',
        label: '参数名称',
        validation: 'required',
        validationMessages: { required: '请输入参数名称' }
      },
      {
        $formkit: 'el-select',
        name: 'paramType',
        label: '参数类型',
        options: paramTypeMap,
        validation: 'required',
        validationMessages: { required: '请选择参数类型' },
        id: 'paramType'
      },
      {
        $formkit: 'group',
        name: 'additional',
        label: '参数附加信息',
        children: [
          {
            $formkit: 'el-input-number',
            name: 'min',
            label: '最小值',
            id: 'min',
            key: 'min',
            style: 'width: 100%',
            if: '$get(paramType).value===NUMBER'
          },
          {
            $formkit: 'el-input-number',
            name: 'max',
            label: '最大值',
            id: 'max',
            key: 'max',
            style: 'width: 100%',
            if: '$get(paramType).value===NUMBER'
          },
          {
            $formkit: 'el-array-table',
            name: 'options',
            label: '选项',
            addLabel: '添加',
            if: '$get(paramType).value===ENUM',
            id: 'options1',
            key: 'options1',
            columns: [
              {
                $formkit: 'el-input',
                name: 'label',
                label: `label`,
                id: 'label',
                key: 'label',
              },
              {
                $formkit: 'el-input',
                name: 'value',
                label: `value`,
                id: 'value',
                key: 'value',
              }
            ]
          }
        ]
      },
      {
        if: '$get(paramType).value===STRING',
        then: {
          $formkit: 'el-input',
          name: 'paramValue',
          label: '默认值',
          key: 'paramValue1'
        },
        else: {
          if: '$get(paramType).value===NUMBER',
          then: {
            $formkit: 'el-input-number',
            name: 'paramValue',
            label: '默认值',
            key: 'paramValue2',
            style: 'width: 100%',
            min: '$get(min).value',
            max: '$get(max).value',
            validation:
              '$: "min:" + ($get(min).value || -99999999999999999999) + "|" +"max:" + ($get(max).value || 99999999999999999999)'
          },
          else: {
            if: '$get(paramType).value===BOOLEAN',
            then: {
              $formkit: 'el-switch',
              name: 'paramValue',
              label: '默认值',
              key: 'paramValue3',
              value: false
            },
            else: {
              if: '$get(paramType).value===ENUM',
              then: {
                $formkit: 'el-select',
                name: 'paramValue',
                label: '默认值',
                key: 'paramValue4',
                optionsDepIds: ['options1'],
                optionsLoader: (depData) => {
                  console.log(depData.options, 'depData')
                  if (depData?.options) {
                    return depData?.options.map(opt=>{
                      return {
                        label: opt.label,
                        value: opt.value
                      }
                    })
                  }
                  return []
                }
              }
            }
          }
        }
      },
      {
        $formkit: 'el-switch',
        name: 'require',
        label: '必填',
        value: false,
        validation: 'required',
        validationMessages: { required: '请选择是否必填' }
      },
      {
        $formkit: 'el-input',
        name: 'validateExpression',
        label: '校验表达式',
        value: ''
      },
      {
        $formkit: 'el-input',
        name: 'paramDesc',
        label: '描述',
        value: ''
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