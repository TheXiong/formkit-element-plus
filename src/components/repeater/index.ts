import type { FormKitTypeDefinition } from "@formkit/core";

import {
    createSection,
} from "@formkit/inputs";
import { repeats } from "./features/repeats";
import {
    addButton,
    Card,
    tableRepeater,
} from "./sections";
import { Menu } from "@element-plus/icons-vue";
import AddButton from "./AddButton.vue";
import { ElButton, ElCard, ElCol, ElRow, ElSpace, ElTable, ElTableColumn, ElTableV2, ElAutoResizer, ElEmpty } from "element-plus";
import { FormItem } from "..";
import TableRow from "./tableRow.vue";
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
export const repeater: FormKitTypeDefinition = {
    schema: FormItemSection(Card(
        // CardHeader(),
        tableRepeater(),
        addButton(`$addLabel`),
    )),
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
        "upControl",
        "downControl",
        "removeControl",
        "insertControl",
        "controlAttrs",
        "addLabel",
        "addAttrs",
        "addButton",
        "columns",
        "valueType",
        "help",
        "actionWidth",
        "sortable",
        "showIndex"
    ],
    /**
     * Additional features that make this input work.
     */
    features: [repeats],
    library: {
        AddButton,
        ElCard,
        ElButton,
        ElRow,
        ElCol,
        ElSpace,
        ElTable,
        ElTableColumn,
        FormItem,
        ElTableV2,
        TableRow,
        ElAutoResizer,
        DragMenu: Menu,
        ElEmpty
    },
};
