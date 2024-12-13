import type { FormKitTypeDefinition } from "@formkit/core";

import {
    outer,
    fieldset,
    legend,
    help,
    inner,
    prefix,
    $if,
    suffix,
    messages,
    message,
    textInput,
    createSection,
} from "@formkit/inputs";
import { repeats } from "./features/repeats";
import {
    actionButtonGroup,
    addButton,
    bodyTable,
    Card,
    CardHeader,
    ColSpace,
    downControl,
    empty,
    group,
    headerTable,
    insertControl,
    removeControl,
    RowSpace,
    tableBodyWrapper,
    tableHeaderWrapper,
    tableInnerWrapper,
    tableWrapper,
    tbodyActionCol,
    tbodyCol,
    tbodyRow,
    thead,
    theadActionCol,
    theadCol,
    theadRow,
    upControl,
} from "./sections";
import { CirclePlusFilled, DeleteFilled, Top, Bottom } from "@element-plus/icons-vue";
import AddButton from "./AddButton.vue";
import { ElButton, ElCard, ElCol, ElRow, ElSpace, ElTable, ElTableColumn } from "element-plus";
import { FormItem } from "..";

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
        $if(
            "$value.length === 0",
            $if("$slots.empty", empty()),
            tableWrapper(
                tableInnerWrapper(
                    tableHeaderWrapper(headerTable(thead(theadRow(theadCol(), $if("$actionCount > 0", theadActionCol()))))),
                    tableBodyWrapper(bodyTable(
                        tbodyRow(
                            group(tbodyCol()),
                            $if(
                                "$actionCount > 0",
                                tbodyActionCol(
                                    actionButtonGroup(
                                        RowSpace(
                                            upControl(),
                                            removeControl(),
                                            insertControl(),
                                            downControl()
                                        ))

                                ))
                        )
                    ))
                )
            ),

        ),
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
        "addLabel",
        "addButton",
        "columns",
        "valueType",
        "help"
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
        FormItem
    },
};
