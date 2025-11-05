<template>
  <div>
    <h1>ArrayTabs 示例</h1>
    
    <div class="card">
      <h3>基本用法</h3>
      <FormKit
        type="elForm"
        label-width="80px"
        v-model="basicData"
        #default="{value}"
      >
        <FormKitSchema :schema="basicSchema" />
        
        <div class="result">
          <pre>{{ JSON.stringify(value, null, 2) }}</pre>
        </div>
      </FormKit>
    </div>
    
    <div class="card">
      <h3>自定义样式</h3>
      <FormKit
        type="elForm"
        label-width="80px"
        v-model="customData"
        #default="{value}"
      >
        <FormKitSchema :schema="customSchema" />
        
        <div class="result">
          <pre>{{ JSON.stringify(value, null, 2) }}</pre>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const basicData = ref({});
const customData = ref({});

const basicSchema = [
  {
    $formkit: 'elArrayTabs',
    name: 'tabs',
    label: '人员信息',
    validation: 'required',
    min: 1,
    max: 5,
    'add-label': '添加人员',
    children: [
      {
        $formkit: 'elInput',
        name: 'name',
        label: '姓名',
        validation: 'required'
      },
      {
        $formkit: 'elInput',
        name: 'age',
        label: '年龄',
        validation: 'number|required'
      },
      {
        $formkit: 'elSelect',
        name: 'gender',
        label: '性别',
        validation: 'required',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      },
      {
        $formkit: 'elInput',
        name: 'phone',
        label: '电话'
      }
    ]
  }
];

const customSchema = [
  {
    $formkit: 'elArrayTabs',
    name: 'projects',
    label: '项目信息',
    validation: 'required',
    min: 1,
    tabType: 'card',
    tabPosition: 'left',
    closable: false,
    'add-label': '添加项目',
    children: [
      {
        $formkit: 'elInput',
        name: 'name',
        label: '项目名称',
        validation: 'required'
      },
      {
        $formkit: 'elDatePicker',
        name: 'startDate',
        label: '开始日期',
        validation: 'required'
      },
      {
        $formkit: 'elTextarea',
        name: 'description',
        label: '项目描述',
        validation: 'required'
      },
      {
        $formkit: 'elInputNumber',
        name: 'budget',
        label: '预算'
      }
    ]
  }
];
</script>

<style>
.card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  max-height: 300px;
  overflow: auto;
}

h1 {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 20px;
  color: #409eff;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>