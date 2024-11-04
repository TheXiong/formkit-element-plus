<script setup>
import { onMounted, ref } from "vue";
let data = ref({
    name: "hello",

});
let onClickSubmit = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },3000)
    })
}


const myForm = ref()
const submit = (a) => {
    // debugger
    myForm.value.node.submit()
    console.log(myForm.value.node, 'myForm.value.node');
    
}
</script>
<template>
    <pre wrap>{{ data }}</pre>

    <FormKit ref="myForm" type="elForm" v-model="data" @submit="onClickSubmit" label-position="top">
        <FormKit type="el-input" label="Name abcdef" name="name" validation="required" formItem />
        <FormKit type="el-input" label="Code" name="code" formItem />
        <FormKit type="el-textarea" label="Remark" name="remark" formItem />

        <template #footer="{disabled}">
            <!-- <el-button type="primary" :disabled="disabled" @click="submit(a)">Submit</el-button> -->
            <FormKit type="submit" :disabled="disabled" />
        </template>
    </FormKit>

</template> 