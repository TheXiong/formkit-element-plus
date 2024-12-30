import { computed, defineComponent, h, nextTick, toRaw, unref } from 'vue'
import { ElUpload, UploadUserFile } from 'element-plus';


export default defineComponent({
    props: ["context"],
    setup(props, { slots }) {
        props.context.classes.inner = "";

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
                        return [{ url: value, name: value.split('/').pop() }];
                    } else {
                        return value.map(v => ({ url: v, name: v.split('/').pop() }));
                    }
                },
                set: (value: UploadUserFile[]) => {
                    const batch = (!props.context.attrs.limit) || props.context.attrs.limit > 1;
                    if (value.length === 0) {
                        return batch ? [] : '';
                    }

                    const getPath = (response: any) => {
                        if(!response) return '';
                        if (response.data) {
                            return response.data.url || response.data.src || response.data.path;
                        } else {
                            return response.url || response.src || response.path;
                        }
                    }

                    return batch ? value.map(v => v.url || getPath(v.response)) : (value[0].url || getPath(value[0].response));
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
                    value.value = val;
                },
                disabled: props.context.disabled,
                ...props.context.attrs
            }, () => children
            )
        }


    },

})