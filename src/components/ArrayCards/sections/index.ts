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


export const group = repeaterSection("group", () => ({
  $formkit: "group",
  index: "$index",
}));

export const item = repeaterSection("item", () => ({
  $el: "li",
  for: ["item", "index", "$items"],
  attrs: {
    role: "listitem",
    key: "$item",
    "data-index": "$index",
  },
}));

export const items = repeaterSection("items", () => ({
  $el: "ul",
  attrs: {
    role: "list",
    style: "list-style: none;padding: 0;margin: 0;width: 100%;display: flex;flex-direction: column;gap: 10px;"
  },
}));

export const Card = repeaterSection("blockWrapper", () => ({
  $cmp: 'ElCard',
  slots: {
    header: {
      $el: 'div',
      attrs: {
        style: 'display: flex; align-items: center; justify-content: space-between;'
      },
      children: [
        {
          $el: 'span',
          children: '$label'
        },
        {
          $el: 'div',
          attrs: {
            style: 'display: flex; align-items: center; justify-content: space-between;gap: 10px;'
          },
          children: [
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createShift($index, 1)",
                style: "cursor: pointer;"
              },
              children: [{
                $cmp: 'Bottom'
              }]
            },
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createShift($index, -1)",
                style: "cursor: pointer;"
              },
              children: [{
                $cmp: 'Top'
              }]
            },
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createRemover($index)",
                style: "cursor: pointer;"
              },
              children: [{
                $cmp: 'DeleteFilled'
              }]
            },
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createInsert($index)",
                style: "cursor: pointer;"
              },
              children: [{
                $cmp: 'CirclePlusFilled'
              }]
            }
          ]
        }
      ]
    },
    default: "$slots.default"
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
          class: 'drag-table'
          // "row-height": 67
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
