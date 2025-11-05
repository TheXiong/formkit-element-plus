import type { FormKitTypeDefinition } from "@formkit/core";

import {
    createSection,
} from "@formkit/inputs";
import './style.css';
import { addButton, Card, group, item, items } from "./sections";
import { ElCard, ElIcon } from "element-plus";
import { Bottom, CirclePlusFilled, DeleteFilled, Top } from "@element-plus/icons-vue";
import { repeats } from "./features/repeats";
import FormItem  from "../FormItem.vue";
import AddButton from "./AddButton.vue";

const FormItemSection = createSection('outer', () => ({
    $cmp: 'FormItem',
    meta: {
        autoAnimate: true,
    },
    props: {
        context: '$node.context',
    },
}))
/**
 * Input definition for a repeater input.
 * @public
 */
export const ArrayCards: FormKitTypeDefinition = {
    schema: FormItemSection(items(item(group(Card())),addButton(`$addLabel`))),
    /**
     * The type of node, can be a list, group, or input.
     */
    type: "list",
    /**
     * An array of extra props to accept for this input.
     */
    props: [
        "min",
        "max",
        "controlAttrs",
        "addLabel",
        "addAttrs",
        "addButton",
        "help",
    ],
    /**
     * Additional features that make this input work.
     */
    features: [repeats],
    library: {
        ElCard,
        ElIcon,
        Bottom,
        CirclePlusFilled,
        DeleteFilled,
        Top,
        FormItem,
        AddButton
    },
};
