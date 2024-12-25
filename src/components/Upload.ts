import { computed, defineComponent, h } from 'vue'
import { ElUpload } from 'element-plus';
export default defineComponent({
    props: ["context"],
    setup(props, { slots }) {
        props.context.classes.inner = "";

        let children: any[] = [];
        if (slots.default) {
            children = slots.default();

        } else {
            children = props.context.slots?.default?.() ?? [];
        }

        const value = computed({
            get() {
                return props.context.value;
            },
            set(val) {
                props.context.node.input(val);
            }
        });

        return () => {
            return h(ElUpload, {
                autoUpload: false,
                "file-list": value.value,
                "onUpdate:fileList": (val: any) => {
                    value.value = val;
                },
                disabled: props.context.disabled,
                ...props.context.attrs
            }, () => children
            )
        }


    },

})