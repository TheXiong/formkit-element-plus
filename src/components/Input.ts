import { ElInput } from "element-plus";
import { defineComponent, h, watch, ref } from "vue";

export default defineComponent({
    props: ["context"],
    setup(props) {
        if (props.context.classes.inner == "formkit-inner") {
            props.context.classes.inner = "";
        }

        const localValue = ref(props.context.value);

        watch(
            () => props.context.value,
            (val) => {
                // 外部值变化时才更新本地值
                localValue.value = val;
            }
        );

        return () => {
            return h(
                ElInput,
                {
                    modelValue: localValue.value,
                    "onUpdate:modelValue": (val: any) => {
                        localValue.value = val;
                        props.context.node.input(val);
                    },
                    onBlur() {
                        props.context.handlers.blur();
                    },
                    prefixIcon: props.context.prefixIcon,
                    suffixIcon: props.context.suffixIcon,
                    disabled: props.context.disabled,
                    ...props.context.attrs,
                },
                props.context.slots
            );
        };
    },
});
