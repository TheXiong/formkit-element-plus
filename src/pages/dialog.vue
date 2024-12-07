<template>
    <el-dialog v-model="showDialog" title="title" width="40%" :before-close="handleClose">
        {{ data }}
        <!-- <FormKit ref="formRef" type="elForm" label-position="top" submit-label="Register" v-model="data"
            @submit="onSubmit">
            <FormKitSchema :schema="schema" />
        </FormKit> -->
        <template #footer>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
        </template>
    </el-dialog>

    <el-button @click="showDialog = true">打开</el-button>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';
import { FormKitSchemaDefinition, FormKitSchemaNode } from '@formkit/core';

const showDialog = ref(false)
const handleClose = (done: () => void) => {
    showDialog.value = false
    done()
}

const data = ref({})
const formRef = ref()

const schema = computed<FormKitSchemaDefinition>(() => {
    return [
        {
            $formkit: 'el-checkbox-group',
            name: 'xxx',
            label: 'xxxx',
            validation: "required",
            options: [
                {
                    label: "激活未确认",
                    value: "ACTIVE_UNACK",
                },
                {
                    label: "激活已确认",
                    value: "ACTIVE_ACK",
                },
                {
                    label: "清除未确认",
                    value: "CLEARED_UNACK",
                },
                {
                    label: "清除已确认",
                    value: "CLEARED_ACK",
                },
            ],
        },
        {
            $formkit: 'el-textarea',
            label: '描述',
            name: 'description',
            placeholder: '请输入规则节点描述'
        }
    ]
})


const onSubmit = async (data: Record<string, any>) => {
}

const handleConfirm = () => {
    formRef.value?.node?.submit()
}
</script>