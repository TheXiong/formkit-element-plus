<script setup>
import { Check, Close } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
let data = ref({
    name: "hello",

});
let onClickSubmit = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })
}


const myForm = ref()
const submit = (a) => {
    // debugger
    myForm.value.node.submit()
    console.log(myForm.value.node, 'myForm.value.node');

}

const schema = [
    {
        $formkit: "el-input",
        name: 'dfd',
        label: `hhsdfdf`,
        id: 'dfd'
    },
    {
        $formkit: "el-array-table",
        name: "filters",
        label: `关联筛选器`,
        dynamic: true,
        upControl: false,
        downControl: false,
        insertControl: false,
        removeControl: true,
        addLabel: "添加筛选器",
        actionWidth: '200px',
        controlAttrs: {
            type: "primary",
            icon: Check
        },
        value: [
            {
                negate: true,
                relationType: 'aaa',
                entityTypes: 'DEVICE'
            }
        ],
        columns: [
          {
            $formkit: "el-switch",
            name: "negate",
            label: `Not`,
            inlinePrompt: true,
            activeIcon: Check,
            inactiveIcon: Close,
            value: true,
            children: ["Not"],
            columnWidth: '100px'
          },
          {
            $formkit: "el-select",
            name: "relationType",
            label: `关联类型`,
          },
          {
            $formkit: "el-select",
            name: "entityTypes",
            label: "实体类型",
            value: "",
            options: [
              { label: "设备", value: 'DEVICE' },
              { label: "资产", value: 'ASSET' },
              { label: "实体视图", value: 'ENTITY_VIEW' },
              { label: "租户", value: 'TENANT' },
              { label: "客户", value: 'CUSTOMER' },
              { label: "用户", value: 'USER' },
            ],
          },
        ],
      }
]
</script>
<template>
    <pre wrap>{{ data }}</pre>

    <FormKit ref="myForm" type="elForm" v-model="data" @submit="onClickSubmit" label-position="top">
        <el-tabs model-value="first" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="User" name="first">
                <FormKit type="el-input" label="aaa" name="aaa" validation="required" formItem />
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">
                <FormKit type="el-input" label="bbb" name="bbb" validation="required" formItem />
            </el-tab-pane>
        </el-tabs>
        <FormKitSchema :schema="schema"></FormKitSchema>

        <FormKit type="el-input" id="name" label="Name abcdef" name="name" validation="required" formItem>
            <!-- sds -->
            <template #prepend>
                oooo
            </template>
        </FormKit>
        <FormKit v-if="data.name" type="el-input" label="Code" name="code" formItem />
        <FormKit type="el-textarea" label="Remark" name="remark" formItem />

        <template #footer="{ disabled }">
            <!-- <el-button type="primary" :disabled="disabled" @click="submit(a)">Submit</el-button> -->
            <FormKit type="submit" :disabled="disabled" />
        </template>
    </FormKit>

</template>