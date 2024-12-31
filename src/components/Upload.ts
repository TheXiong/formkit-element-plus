import { computed, defineComponent, h, nextTick, ref, toRaw, unref } from 'vue'
import { ElUpload, UploadUserFile } from 'element-plus';


export default defineComponent({
    props: ["context"],
    setup(props, { slots }) {
        props.context.classes.inner = "";

        let fileList: UploadUserFile[] = [];
        const valueToHandler = {
            'file': {
                get: (value: UploadUserFile | UploadUserFile[]) => {
                    if (!value) return [];
                    return Array.isArray(value) ? value : [value];
                },
                set: (value: UploadUserFile[]) => {
                    const batch = (!props.context.attrs.limit) || props.context.attrs.limit > 1;
                    if (value.length === 0) {
                        return batch ? [] : null;
                    }

                    return batch ? value : value[0];
                }
            },
            'url': {
                get: (value: string | string[]) => {
                    if (!value) return [];
                    if (typeof value === 'string') {
                        const target = fileList.find(v => v.name === value);
                        if (target) {
                            return [target]
                        }
                        return [{ url: value, name: value.split('/').pop() }];
                    } else {
                        return value.map(v => {
                            const target = fileList.find(v1 => v1.name === v);
                            if (target) {
                                return target
                            }
                            return ({ url: v, name: v.split('/').pop() })
                        });
                    }
                },
                set: (value: UploadUserFile[]) => {
                    fileList = value;

                    const batch = (!props.context.attrs.limit) || props.context.attrs.limit > 1;
                    if (value.length === 0) {
                        return batch ? [] : '';
                    }

                    const getPath = (file: any) => {
                        if (!file.response) return file.name;

                        let path = ''
                        if (file.response.data) {
                            path = file.response.data.url || file.response.data.src || file.response.data.path;
                        } else {
                            path = file.response.url || file.response.src || file.response.path;
                        }
                        return path;
                    }

                    return batch ? value.map(v => v.url || getPath(v)) : (value[0].url || getPath(value[0]));
                }
            }
        }

        let cacheValue: string;

        const value = computed({
            get() {
                if (props.context?.valueGetter) {
                    return props.context?.valueGetter?.(props.context.value)
                } else {
                    if (props.context.valueType && valueToHandler[props.context.valueType]) {
                        return valueToHandler[props.context.valueType]?.get(props.context.value)
                    } else {
                        return valueToHandler['file']?.get(props.context.value)
                    }
                }
            },
            set(val) {
                let rt = val;

                if (props.context?.valueSetter) {
                    rt = props.context?.valueSetter?.(val)
                } else {
                    if (props.context.valueType && valueToHandler[props.context.valueType]) {
                        rt = valueToHandler[props.context.valueType]?.set(val)
                    } else {
                        rt = valueToHandler['file']?.set(val)
                    }
                }

                if (cacheValue !== JSON.stringify(rt)) {
                    cacheValue = JSON.stringify(rt);
                    nextTick(() => {
                        console.log('set', rt);

                        props.context.node.input(rt);
                    });
                }
            }
        });

        return () => {
            let children: any[] = [];
            if (slots.default) {
                children = slots.default();

            } else {
                children = props.context.slots?.default?.() ?? [];
            }

            return h(ElUpload, {
                "file-list": value.value,
                "onUpdate:fileList": (val: UploadUserFile[]) => {
                    console.log('onUpdate:fileList', val);
                    value.value = val;
                },
                "onSuccess": (response: any, file: any, fileList: any) => {
                    console.log('onSuccess', response, file, fileList);
                    value.value = fileList;
                },
                disabled: props.context.disabled,
                ...props.context.attrs
            }, () => children
            )
        }


    },

})