<script setup>
import { ref } from "vue";
const data = ref({
    upload: [
        {
            name: 'food.jpg',
            url: 'http://172.16.5.247:9000/dms/20241225/d200adad6b634a1c96ef80101ef49b1e.png'
        }
    ]
})

const beforeUpload = (file) => {
    console.log('beforeUpload', file)
    return true
}
</script>

<template>
    <pre wrap>{{ data }}</pre>
    <FormKit type="group" v-model="data">
        <FormKit type="elUpload" label="elUpload" name="upload" action="/api/upload" :auto-upload="true" :before-upload="beforeUpload">
            <el-button type="primary" size="small">select file</el-button>
        </FormKit>
    </FormKit>
</template>