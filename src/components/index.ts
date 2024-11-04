import { FormKitPlugin } from '@formkit/core';
import { createInput } from '@formkit/vue'

import Input from './Input'
import Textarea from './Textarea'
import Rate from './Rate'
import Select from "./Select"
import Switch from "./Switch"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import ColorPicker from "./ColorPicker"
import Password from "./Password"
import InputNumber from "./InputNumber"
import Checkbox from "./Checkbox"
import Slider from "./Slider"
import TimeSelect from "./TimeSelect"
import RadioGroup from "./RadioGroup"
import Upload from "./Upload"
import Autocomplete from "./Autocomplete"
import Cascader from './Cascader'
import DateRangePicker from './DateRangePicker'
import Transfer from './Transfer'
import CheckboxGroup from './CheckboxGroup';
import Tree from './Tree';
import TreeSelect from './TreeSelect';

import createFormItemInput from './createFormItemInput';

import FormItem from "./FormItem.vue"
import Form from './Form.vue'
import FormUpload from './FormUpload'

import { forms, disablesChildren, createSection, options } from '@formkit/inputs';
import { ElForm } from 'element-plus';

export { createOptionsLoaderPlugin } from "../plugins"

export { FormItem, Form, FormUpload, createFormItemInput }

export const createElementPlugin = (): FormKitPlugin => {

    return (node) => {
        let type = node.props.type + '';
        type = type.replace(/[A-Z]/g, (m: string) => "-" + m.toLowerCase());

        let create: any = createInput;
        if (node.props.attrs["form-item"] !== undefined || node.props.attrs["formItem"] !== undefined) {
            create = createFormItemInput;
        }

        switch (type) {
            case "el-checkbox-group":
                return node.define(create(CheckboxGroup, {
                    props: ["options", "optionsDepIds", "optionsLoader"],
                    features: [options],
                }));
            case "el-transfer":
                return node.define(create(Transfer, {
                    props: ["data"]
                }));
            case "el-date-range-picker":
                return node.define(create(DateRangePicker));
            case "el-cascader":
                return node.define(create(Cascader));
            case "el-input":
                return node.define(create(Input,{
                    props: ["prefix", "suffix", "prepend", "append"]
                }));
            case "el-switch":
                return node.define(create(Switch));
            case "el-textarea":
                return node.define(create(Textarea));
            case "el-password":
                return node.define(create(Password));
            case "el-date-picker":
                return node.define(create(DatePicker));
            case "el-time-picker":
                return node.define(create(TimePicker));
            case "el-color-picker":
                return node.define(create(ColorPicker));
            case "el-input-number":
                return node.define(create(InputNumber))
            case "el-checkbox":
                return node.define(create(Checkbox,{
                    props:["tooltip"]
                }));
            case "el-slider":
                return node.define(create(Slider));
            case "el-time-select":
                return node.define(create(TimeSelect));
            case "el-upload":
                return node.define(create(Upload));
            case "el-autocomplete":
                return node.define(create(Autocomplete));
            case "el-rate":
                return node.define(create(Rate));
            case "el-select":
                return node.define(create(Select, {
                    props: ["options", "optionsDepIds", "optionsLoader"],
                    features: [options],
                }));
            case "el-radio-group":
                return node.define(create(RadioGroup, {
                    props: ["options", "optionsDepIds", "optionsLoader", "isRadioButton"],
                    features: [options],
                }));
            case "el-tree":
                return node.define(create(Tree));
            case "el-tree-select":
                return node.define(create(TreeSelect));
            case "el-form":
                let n = node.define({
                    schema: createSection("ElForm", () => ({
                      $cmp: "ElForm",
                      bind: "$attrs",
                      meta: {
                        autoAnimate: true,
                      },
                      props: {
                        id: "$id",
                        name: "$node.name",
                        onSubmit: "$handlers.submit",
                        "data-loading": "$state.loading || undefined",
                      },
                    }))("$slots.default","$slots.footer"),
                    type: "group",
                    props: ["submitBehavior", "incompleteMessage"],
                    features: [forms, disablesChildren],
                    library: {
                      ElForm,
                    },
                  });
                return n;
        }


    }


};