<script setup>
import { ref } from "vue";
const data = ref({})

setTimeout(() => {
    // data.value.upload1 = 'http://172.16.5.247:9000/dms/20241225/d200adad6b634a1c96ef80101ef49b1e.png'
}, 1000)

const schema = [{
    name: 'upload1',
    label: 'elUpload1',
    $formkit: 'elUpload',
    action: '/api/upload',
    valueType: "url",
    autoUpload: true,
    // multiple: true,
    limit: 1,
    children: [{
        $cmp: 'elButton',
        props: {
            type: 'primary',
            size: 'small'
        },
        children: 'select file'
    }]
}]

const beforeUpload = (file) => {
    console.log('beforeUpload', file)
    return true
}
</script>

<template>
    <pre wrap>{{ data }}</pre>
    <FormKit type="elForm" v-model="data">
        <!-- <FormKit type="elUpload" label="elUpload" name="upload" action="/api/upload" :auto-upload="true"
            :before-upload="beforeUpload" valueType="url">
            <el-button type="primary" size="small">select file</el-button>
        </FormKit> -->

        <FormKitSchema :schema="schema" />
    </FormKit>
</template>