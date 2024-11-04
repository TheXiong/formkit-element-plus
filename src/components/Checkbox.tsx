import { QuestionFilled } from '@element-plus/icons-vue';
import { ElCheckbox, ElTooltip } from 'element-plus';
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
            return (
                <div style="display:flex;align-items:center">
                    <ElCheckbox
                        label={props.context.label}
                        modelValue={value.value}
                        onUpdate:modelValue={(val: any) => {
                            value.value = val;
                        }}
                        onBlur={() => {
                            props.context.handlers.blur()
                        }}
                        disabled={props.context.disabled}
                        v-bind={props.context.attrs} />
                    {
                        props.context.tooltip ?
                            <div class="formkit-tooltip" style="display:flex;align-items:center">
                                <ElTooltip
                                    popper-class="formkit-tooltip-popper"
                                    effect="dark"
                                    content={props.context.tooltip}
                                    placement="top-start"
                                >
                                    <QuestionFilled style="width: 18px;height: 18px;margin-left: 6px;" />
                                </ElTooltip>
                            </div>
                            : null
                    }
                </div>
            )
        }
    }
});