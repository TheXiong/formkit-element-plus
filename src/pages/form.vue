<script setup>
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
        $formkit: 'el-array-table',
        name: 'dataMapping',
        label: `hhsdf`,
        dynamic: true,
        upControl: true,
        downControl: true,
        insertControl: true,
        removeControl: true,
        validation: "required",
        min: 0,
        max: 4,
        // valueType: 'KV',
        help: 'All input fields support templatization. Use $[messageKey] to extract value from the message and ${metadataKey} to extract value from the metadata.',
        value: [
            {
                sourceKey: 'alarmThreshold',
                targetKey: 'threshold'
            }
        ],
        addLabel: 'Add mapping',
        columns: [
            {
                $formkit: 'el-input',
                name: 'not',
                label: `nnnn`,
                validation: "required",
                width: '80px'
            },
            {
                $formkit: 'el-input',
                name: 'sourceKey',
                label: `Source key`,
                validation: "required",
            },
            {
                $formkit: 'el-input',
                name: 'targetKey',
                label: 'Target key',
                validation: "required",
            },
        ]
    },
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