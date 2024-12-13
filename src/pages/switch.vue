<script setup>
import { ref } from "vue";
import { Check, Close } from '@element-plus/icons-vue'
const data = ref({})
</script>

<template>
    <FormKit type="group" v-model="data">
        <!-- <FormKit type="elSwitch" label="elSwitch" name="switch1" help="this is a help" />
        <FormKit type="elSwitch" label="elSwitch (size)" name="switch2" size="large" />
        <FormKit type="elSwitch" name="swtich3" active-text="Pay by month" inactive-text="Pay by year" /> -->
        <FormKit type="elSwitch" name="swtich4" inline-prompt
            :active-icon="Check" :inactive-icon="Close" />
    </FormKit>

    <pre wrap>{{ data }}</pre>

<!-- 
    <form-kit type="elForm" v-model="data">
        <form-kit type="elFormInput" label="Input" name="input" help="abcd" />
        <form-kit type="elFormSwitch" label="elFormSwitch" name="switch1" help="this is a help" />
    </form-kit> -->

</template>