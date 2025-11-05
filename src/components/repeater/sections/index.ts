import { createRepeaterSection } from "../repeaterSection";

const repeaterSection = createRepeaterSection();

export const addButton = repeaterSection("addButton", () => ({
  $cmp: "AddButton",
  props: {
    onClick: "$fns.createAppend()",
    disabled: "$value.length >= $max",
    context: "$node.context",
    bind: "$addAttrs",
  },
  if: "$addButton",
  type: "button",
}));

export const Card = repeaterSection("blockWrapper", () => ({
  $el: 'div',
  attrs: {
    class: "formkit-repeater-wrapper"
  }
}));


export const tableRepeater = repeaterSection('tableRepeater', () => {
  return {
    $el: 'div',
    attrs: {
      style: '$: "height: " + $tableHeight'
    },
    children: [{
      $cmp: 'ElAutoResizer',
      children: [{
        $cmp: 'ElTableV2',
        props: {
          data: '$tableData',
          columns: '$tableColumns',
          width: '$width',
          height: '$height',
          // cache: 100,
          "row-key": "_id",
          class: 'drag-table',
          // "row-height": 67
          headerClass: 'formkit-repeater-table-header',
          rowClass: 'formkit-repeater-table-row',
        },
        slots: {
          row: {
            $cmp: 'TableRow',
            props: {
              cells: '$cells',
              rowIndex: "$rowIndex",
              columns: '$columns',
              fns: '$fns',
              removeControl: '$removeControl',
              upControl: '$upControl',
              downControl: '$downControl',
              insertControl: '$insertControl',
              tableData: '$tableData',
              min: '$min',
              max: '$max',
            }
          },
          empty: {
            $cmp: 'ElEmpty',
            props: {
              description: '暂无数据',
              'image-size': 64
            }
          }
        }
      }]
    }]
  }
});
