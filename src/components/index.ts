import { FormKitGroupValue, FormKitLibrary } from '@formkit/core';
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
import { repeater } from './repeater/index';

import { forms, disablesChildren, createSection, options, FormKitInputs } from '@formkit/inputs';
import { ElForm, UploadUserFile } from 'element-plus';

export { createOptionsLoaderPlugin, createComputedValuePlugin, createAutoAnimatePlugin } from "./plugins"

export * from './FormKitSchema'
export * from './FormKit'

export { FormItem, Form, FormUpload, createFormItemInput }

export const ElementPlusInputs: FormKitLibrary = {
    "elCheckboxGroup": createFormItemInput(CheckboxGroup, {
        props: ["options", "optionsDepIds", "optionsLoader"],
        // @ts-ignore
        features: [options],
    }),
    "elTransfer": createFormItemInput(Transfer, {
        props: ["data"]
    }),
    "elDateRangePicker": createFormItemInput(DateRangePicker),
    "elCascader": createFormItemInput(Cascader),
    "elInput": createFormItemInput(Input, {
        props: ["prefix", "suffix", "prepend", "append"]
    }),
    "elSwitch": createFormItemInput(Switch),
    "elTextarea": createFormItemInput(Textarea),
    "elPassword": createFormItemInput(Password),
    "elDatePicker": createFormItemInput(DatePicker),
    "elTimePicker": createFormItemInput(TimePicker),
    "elColorPicker": createFormItemInput(ColorPicker),
    "elInputNumber": createFormItemInput(InputNumber),
    "elCheckbox": createFormItemInput(Checkbox, {
        props: ["tooltip"]
    }),
    "elSlider": createFormItemInput(Slider),
    "elTimeSelect": createFormItemInput(TimeSelect),
    "elUpload": createFormItemInput(Upload, {props: ["valueGetter", "valueSetter", "valueType"]}),
    "elAutocomplete": createFormItemInput(Autocomplete),
    "elRate": createFormItemInput(Rate),
    "elSelect": createFormItemInput(Select, {
        props: ["options", "optionsDepIds", "optionsLoader"],
        // @ts-ignore
        features: [options],
    }),
    "elRadioGroup": createFormItemInput(RadioGroup, {
        props: ["options", "optionsDepIds", "optionsLoader", "isRadioButton"],
        // @ts-ignore
        features: [options],
    }),
    "elTree": createFormItemInput(Tree),
    "elTreeSelect": createFormItemInput(TreeSelect),
    "elForm": {
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
        }))("$slots.default", "$slots.footer"),
        type: "group",
        props: ["submitBehavior", "incompleteMessage"],
        // @ts-ignore
        features: [forms, disablesChildren],
        library: {
            ElForm,
        },
    },
    "elArrayTable": repeater
}

declare module "@formkit/inputs" {
    export interface FormKitInputProps<Props extends FormKitInputs<Props>> {
        "elCheckboxGroup": {
            type: "elCheckboxGroup";
            value?: string[] | number[];
        };
        "elTransfer": {
            type: "elTransfer";
            value?: Array<string | number>;
        };
        "elDateRangePicker": {
            type: "elDateRangePicker";
            value?: number | string | Date | [Date, Date] | [string, string];
        };
        "elCascader": {
            type: "elCascader";
            value?: string | number | string[] | number[] | any;
        };
        "elInput": {
            type: "elInput";
            value?: string;
        };
        "elSwitch": {
            type: "elSwitch";
            value?: boolean | string | number;
        };
        "elTextarea": {
            type: "elTextarea";
            value?: string;
        };
        "elPassword": {
            type: "elPassword";
            value?: string;
        };
        "elDatePicker": {
            type: "elDatePicker";
            value?: number | string | Date | [Date, Date] | [string, string];
        };
        "elTimePicker": {
            type: "elTimePicker";
            value?: number | string | Date | [Date, Date] | [number, number] | [string, string];
        };
        "elColorPicker": {
            type: "elColorPicker";
            value?: string;
        };
        "elInputNumber": {
            type: "elInputNumber";
            value?: number;
        };
        "elCheckbox": {
            type: "elCheckbox";
            value?: 	
            string | number | boolean;
        };
        "elSlider": {
            type: "elSlider";
            value?: number | number[];
        };
        "elTimeSelect": {
            type: "elTimeSelect";
            value?: string;
        };
        "elUpload": {
            type: "elUpload";
            value?: UploadUserFile[];
        };
        "elAutocomplete": {
            type: "elAutocomplete";
            value?: string;
        };
        "elRate": {
            type: "elRate";
            value?: number;
        };
        "elSelect": {
            type: "elSelect";
            value?: string | number | boolean | object | Array<any>;
        };
        "elRadioGroup": {
            type: "elRadioGroup";
            value?: string | number | boolean;
        };
        "elTree": {
            type: "elTree";
            value?: Array<string | number>;
        };
        "elTreeSelect": {
            type: "elTreeSelect";
            value?: any;
        };
        "elForm": {
            type: "elForm";
            value?: FormKitGroupValue
        };
        "elArrayTable": {
            type: "elArrayTable";
            value?: any[];
        }
    }
}