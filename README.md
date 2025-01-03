# FormKit element plus

<a href="https://element-plus.org/">Element plus</a> for <a href="https://formkit.com/">FormKit.</a>

Most of the components are based on <a href="https://element-plus.org/">Element plus</a>, attributes directly pass to the element plus component.

## Preview

<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/ui.png" alt="preview" />

# install
<p>
This library require <a href="https://element-plus.org/">Element plus</a> and <a href="https://formkit.com/">FormKit</a> to be installed.
</p>

```shell
npm i element-plus
npm i @formkit/vue
npm i @formkit/i18n
npm i formkit-element-plus
```

## Setup

direct setup in main.ts
```typescript
import { plugin, defaultConfig } from '@formkit/vue'
import { ElementPlusInputs } from "formkit-element-plus";
import { zh } from '@formkit/i18n'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(plugin, defaultConfig({
    // set language
    locales: { zh },
    locale: 'zh',
    inputs: {
        ...ElementPlusInputs
    }
}))
```

## Usage

### Basic

<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/formItem.png" alt="preview" />


```typescript
 <FormKit type="el-form" v-model="data" ref="elf" id="elform">
      <FormKit type="el-input" label="input3" name="input3" validation="required" placeholder="testing3" clearable />

      <FormKit type="el-select" label="Select" name="select" :options="{
        mercury: 'Mercury',
        venus: 'Venus',
        earth: 'Earth',
        mars: 'Mars',
        jupiter: 'Jupiter',
        saturn: 'Saturn',
        uranus: 'Uranus',
        neptune: 'Neptune',
      }" 
      validation="required" clearable placeholder="select placeholder" filterable multiple />

      <FormKit type="el-checkbox" label="Checkbox1" name="cb1" validation="required"/>

      <FormKit type="el-rate" label="Rate" name="rate1"/>
      <FormKit type="el-switch" label="Switch" name="switch1"/>
      <FormKit type="el-time-picker" label="Time Picker 1" name="time_picker_1"/>
      <FormKit type="el-input-number" label="input nubmer 1" name="input_number_1"/>

      <FormKit type="el-radio-group" label="Radio Group" name="radio1" :options="{
        mercury: 'Mercury',
        venus: 'Venus',
        earth: 'Earth',
        mars: 'Mars',
        jupiter: 'Jupiter',
        saturn: 'Saturn',
        uranus: 'Uranus',
        neptune: 'Neptune',
      }" validation="required"/>


      <FormKit type="el-slider" label="Slider1" name="slider1" />
      <FormKit type="el-slider" label="Slider2" name="slider2" :min="100" :max="200" :step="2" />

      <FormKit type="el-color-picker" label="ColorPicker" name="color1" />


    </FormKit>
```


### Supported type
<details>
  <summary>el-cascader</summary>
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elCascader.png"/>
</details>

<details>
  <summary>el-rate</summary>
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elRate.png"/>

```html
<FormKit type="form" v-model="data">
    <FormKit type="el-rate" label="elFormRate" name="rate" form-item/>

    <FormKit type="el-rate" label="elRate" name="rate" help="help text" />

    <FormKit type="el-rate" label="elRate" name="rate" :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text />

    <FormKit type="el-rate" label="elRate (allow-half)" name="rate_half" allow-half />
</FormKit>
```

</details>

<details>
  <summary>el-select</summary>
  <img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elSelect.png"/>

Custom template of select options
```html
<script setup>
import { ref } from "vue";
const data = ref({});
   
const cities = [
    {
        value: 'Beijing',
        label: 'Beijing',
    },
    {
        value: 'Shanghai',
        label: 'Shanghai',
    },
    {
        value: 'Nanjing',
        label: 'Nanjing',
    },
    {
        value: 'Chengdu',
        label: 'Chengdu',
    },
    {
        value: 'Shenzhen',
        label: 'Shenzhen',
    },
    {
        value: 'Guangzhou',
        label: 'Guangzhou',
    },
]

</script>
<template>
  <FormKit type="el-select" label="select (Custom template)" name="input1" :options="cities">
      <template #option="{ item }">
          <span style="float: left">{{ item.label }}</span>
          <span style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
              ">{{ item.value }}
          </span>
      </template>
  </FormKit>
<template>
```

</details>

<details>
  <summary>el-date-picker and el-date-range-picker</summary>  
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elDatePicker.png"/>

```html
<FormKit type="group" v-model="data">
  <FormKit type="el-date-picker" label="el-date-picker" name="date1" validation="required" />
  <FormKit type="el-date-range-picker" label="el-date-range-picker" name="date2" />
</FormKit>
```

</details>

<details>
  <summary>el-switch</summary>  
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elSwitch.png"/>

```html
    <FormKit type="group" v-model="data">
        <FormKit type="el-switch" label="el-switch" name="switch1" />
        <FormKit type="el-switch" label="el-switch (size)" name="switch2" size="large" />
        <FormKit type="el-switch" name="swtich3" active-text="Pay by month" inactive-text="Pay by year" />
    </FormKit>
```

</details>

<details>
  <summary>el-time-picker</summary>
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elTimePicker.png"/>

```html
<FormKit type="group" v-model="data">
  <FormKit type="el-time-picker" label="el-time-picker" name="time1" />
  <FormKit type="el-time-picker" label="el-time-picker (range)" name="time2" is-range />
</FormKit>
```

</details>

<details>
  <summary>el-autocomplete</summary>
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elAutocomplete.png"/>

```html
<script setup>
import { ref } from "vue";
const data = ref({})
const createFilter = (queryString) => {
    return (restaurant) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

const restaurants = ref([
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
])

let querySearch = (queryString, cb) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    // call callback function to return suggestions
    cb(results)
}

</script>
<template>


    <pre wrap>{{ data }}</pre>
    <FormKit type="group" v-model="data">
        <FormKit type="el-autocomplete" label="el-autocomplete" name="value1" placeholder="Please Input"
            :fetch-suggestions="querySearch" />
    </FormKit>



</template>
```

</details>

<details>
  <summary>el-upload</summary>
<img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/elUpload.png"/>

```html
<script setup>
import { ref } from "vue";
const data = ref({})
</script>

<template>
    <pre wrap>{{ data }}</pre>
    <FormKit type="group" v-model="data">
        <FormKit type="el-upload" label="elUpload" name="upload">
            <el-button type="primary" size="small">select file</el-button>
        </FormKit>

        <FormKit type="el-upload" label="elFormUpload" name="upload1" form-item>
            <el-button type="primary" size="small">select file</el-button>
        </FormKit>
    </FormKit>
</template>
```

</details>


<details>
  <summary>el-tree-select</summary>
  <img src="https://raw.githubusercontent.com/mathsgod/formkit-element/main/preview/el-tree-select.png"/>

```html
<script setup>
import { ref } from 'vue'
let form = ref({})

let data = [{
    label: "Level one 1",
    value: 1,

    children: [{
        label: "Level two 1-1",
        value: 2,
        children: [{
            label: "Level three 1-1-1",
            value: 3
        }, {
            label: "Level three 1-1-2",
            value: 4
        }, {
            label: "Level three 1-1-3",
            value: 5
        }]
    }]

}]
</script>

<template>
    <form-kit type="el-form" v-model="form">
        <form-kit type="el-tree-select" name="treeselect" :data="data" label="el-tree-select" :render-after-expand="false" />

        <form-kit type="el-tree-select" name="treeselect2" :data="data" label="el-tree-select (checkbox)" show-checkbox :render-after-expand="false" />

        <form-kit type="el-tree-select" name="treeselect3" :data="data" label="el-tree-select (multiple)" multiple :render-after-expand="false" />
    </form-kit>
</template>

```
</details>



- el-checkbox
- el-color-picker
- el-input
- el-input-number
- el-password
- el-radio-group
- el-slider
- el-textarea 
- el-time-select
- el-form
- el-transfer
- el-checkbox-group
- el-tree


### el-form submit

Due to the limitation of vue3, the submit event of el-form is not supported. You can use the submit attribute of FormKit to submit the form.

```typescript
const data=ref({})
let onSubmit=()=>{
  console.log('submited')
}

```

```html
  <FormKit type="el-form" v-model="data" @submit="onSubmit">
    ...   
  </FormKit>
```





