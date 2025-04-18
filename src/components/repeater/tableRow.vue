<script lang="ts">
import { h } from "vue";
import FormKit from "../FormKit";
import FormKitSchema from "../FormKitSchema";

export default {
    props: {
        cells: {
            type: Object,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columns: {
            type: Object,
            required: true,
        },
        fns: {
            type: Object,
            required: true,
        },
        removeControl: {
            type: Boolean,
            required: true,
        },
        upControl: {
            type: Boolean,
        },
        downControl: {
            type: Boolean,
        },
        insertControl: {
            type: Boolean,
        },
        tableData: {
            type: Array,
            required: true,
        },
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
        },
    },
    setup(props) {
        const render = () => {
            return h(FormKit, { type: "group", index: props.rowIndex }, () =>
                props.cells.map((cell, index) => {
                    if (props.columns[index].dataKey === 'action' || props.columns[index].dataKey === 'index' || props.columns[index].dataKey === 'drag') {
                        return h(cell, {}, () => h(FormKitSchema, {
                            schema: props.columns[index].columnSchema, data: {
                                ...props.fns,
                                removeControl: props.removeControl,
                                upControl: props.upControl,
                                downControl: props.downControl,
                                insertControl: props.insertControl,
                                index: props.rowIndex,
                                tableData: props.tableData,
                                min: props.min,
                                max: props.max,
                            }
                        }))
                    }
                    return h(cell, {
                        style: 'overflow: visible;'
                    }, () => h(FormKitSchema, { schema: props.columns[index].columnSchema }))
                })
            );
        };

        return () => render();
    },
};
</script>

<style scoped></style>
