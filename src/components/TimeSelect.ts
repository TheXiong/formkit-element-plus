import { ElTimeSelect } from 'element-plus';
import { defineComponent, h, computed } from 'vue'

export default defineComponent({
    props: ["context"],
    setup(props) {
        if (props.context.classes.inner == "formkit-inner") {
            props.context.classes.inner = "";
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
            return h(ElTimeSelect, {
                valueFormat: "HH:mm:ss",
                modelValue: value.value,
                "onUpdate:modelValue": (val: any) => {
                    value.value = val;
                },
                onBlur() {
                    props.context.handlers.blur()
                },
                disabled: props.context.disabled,
                ...props.context.attrs
            }, props.context.slots);
        }
    }
});