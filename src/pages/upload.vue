<script setup>
import { ref } from "vue";
const data = ref({})

setTimeout(() => {
    data.value.upload1 = 'http://172.16.5.247:9000/dms/20241225/d200adad6b634a1c96ef80101ef49b1e.png'
}, 1000)


const request = (options) => {
    console.log(options, 'options')
    const { file, onSuccess, onError } = options;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 200,
                data: {
                    path: `http://127.0.0.1/${options.file.name}`
                }
            })
        }, 2000)
    })
}

const beforeUpload = (file) => {
    console.log('beforeUpload', file)
    return true
}

const schema = [{
    name: 'upload1',
    label: 'elUpload1',
    $formkit: 'elUpload',
    action: '/api/upload',
    valueType: "url",
    autoUpload: true,
    // multiple: true,
    'list-type':"picture-card",
    limit: 1,
    children: [{
        $cmp: 'elButton',
        props: {
            type: 'primary',
            size: 'small'
        },
        children: 'select file'
    }],
    'http-request': request,
}]



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