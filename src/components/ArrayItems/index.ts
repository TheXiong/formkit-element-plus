import type { FormKitTypeDefinition } from "@formkit/core";
import { createSection } from "@formkit/inputs";
import { addButton, items, item, group, content, operations, arrayItems } from "./sections";
import { repeats } from "./features/repeats";
import AddButton from "./AddButton.vue";
import { ElCard, ElIcon, ElButton, ElTooltip, ElSpace } from "element-plus";
import {
    Delete,
    ArrowUp,
    ArrowDown,
    Plus,
    CopyDocument,
    Warning
} from "@element-plus/icons-vue";
import FormItem from "../FormItem.vue";
import { drag } from "./sections";

const FormItemSection = createSection('outer', () => ({
    $cmp: 'FormItem',
    meta: {
        autoAnimate: true,
    },
    props: {
        context: '$node.context',
    },
}));

/**
 * Input definition for ArrayItems input.
 * @public
 */
export const ArrayItems: FormKitTypeDefinition = {
    schema: FormItemSection(arrayItems(items(item(drag(), group(content()), operations()), addButton(`$addLabel`)))),
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
        "showIndex",
        "insertControl",
        "removeControl",
        "addButton",
        "controlAttrs",
        "addLabel",
        "addAttrs",
        "help",
    ],
    /**
     * Additional features that make this input work.
     */
    features: [repeats],
    library: {
        ElCard,
        ElIcon,
        ElButton,
        ElTooltip,
        ElSpace,
        Delete,
        ArrowUp,
        ArrowDown,
        Plus,
        CopyDocument,
        Warning,
        FormItem,
        AddButton
    },
}; 