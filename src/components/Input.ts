import { ElInput } from "element-plus";
import { defineComponent, h, computed, watch } from "vue";

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
            },
        });

        console.log(props.context);
        
        return () => {
            return h(
                ElInput,
                {
                    modelValue: value.value,
                    "onUpdate:modelValue": (val: any) => {
                        value.value = val;
                    },
                    onBlur() {
                        props.context.handlers.blur();
                    },
                    prefixIcon: props.context.prefixIcon,
                    suffixIcon: props.context.suffixIcon,
                    disabled: props.context.disabled,
                    ...props.context.attrs,
                },
                {
                    prefix: props.context.prefix ? () => {
                        return h(
                            "div",
                            {
                                className: props.context.classes.prefix,
                            },
                            [props.context.prefix]
                        )

                    } : null,
                    suffix: props.context.suffix ? () => {
                        return h(
                            "div",
                            {
                                className: props.context.classes.suffix,
                            },
                            [props.context.suffix]
                        )

                    } : null,
                    prepend: props.context.prepend ? () => {
                        return h(
                            "div",
                            {
                                className: props.context.classes.prepend,
                            },
                            [props.context.prepend]
                        )

                    } : null,
                    append: props.context.append ? () => {
                        return h(
                            "div",
                            {
                                className: props.context.classes.append,
                            },
                            [props.context.append]
                        )

                    } : null,
                }
            );
        };
    },
});
