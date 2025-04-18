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
import { FormKitElementPlusPlugin } from "formkit-element-plus";
import { zh } from '@formkit/i18n'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(FormKitElementPlusPlugin, {
    // set language
    locales: { zh },
    locale: 'zh'
})
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

- el-cascader
- el-rate
- el-select
- el-date-picker
- el-date-range-picker
- el-switch
- el-time-picker
- el-autocomplete
- el-upload
- el-tree-select
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
- el-array-table
- el-array-cards
- el-array-collapse
- el-array-items
- el-array-tabs


### el-form submit

Due to the limitation of vue3, the submit event of el-form is not supported. You can use the submit attribute of FormKit to submit the form.

```typescript
const data=ref({})
let onSubmit=()=>{
  console.log('submited')
}

```

```html
  <FormKit type="elForm" v-model="data" @submit="onSubmit">
    ...   
  </FormKit>
```





