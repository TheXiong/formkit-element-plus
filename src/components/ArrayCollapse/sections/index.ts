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

export const collapseWrapper = repeaterSection("collapseWrapper", () => ({
  $el: "div",
  attrs: {
    style: "width: 100%;"
  },

}));

export const collapse = repeaterSection("collapse", () => ({
  $cmp: "ElCollapse",
  props: {
    accordion: true,
  }
}));

export const collapseItem = repeaterSection("collapseItem", () => ({
  $cmp: "ElCollapseItem",
  props: {
    title: "",
  },
  slots: {
    icon: [
      {
        $el: 'div',
        attrs: {
          style: 'display: flex; align-items: center; width: 100%;'
        },
        children: [
          {
            $el: 'div',
            attrs: {
              style: 'flex: 1;display: flex;align-items: center;justify-content: flex-start;'
            },
            children: [{
              $el: 'div',
              attrs: {
                style: 'display: flex; align-items: center;margin-right: 10px;'
              },
              children: [
                {
                  if: "$isActive",
                  then: {
                    $cmp: 'ElIcon',
                    props: {
                      size: 20,
                    },
                    children: [{
                      $cmp: 'ArrowDown'
                    }]
                  },
                  else: {
                    $cmp: 'ElIcon',
                    props: {
                      size: 20,
                    },
                    children: [{
                      $cmp: 'ArrowRight'
                    }]
                  }
                }
              ]
            }, {
              $el: 'span',
              attrs: {
                style: 'font-size: 16px;'
              },
              children: [
                "$: '#' +($index + 1) + '.' + $label"
              ]
            }]
          },
          {
            $el: 'div',
            attrs: {
              style: 'display: flex; align-items: center; justify-content: flex-end;gap: 10px;width: 200px;padding-right: 10px;'
            },
            children: [
              {
                $cmp: 'ElIcon',
                props: {
                  size: 16,
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
                  size: 16,
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
                  size: 16,
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
                  size: 16,
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

    ]
  }
}));



export const item = repeaterSection("item", () => ({
  $el: "div",
  for: ["item", "index", "$items"],
  attrs: {
    role: "listitem",
    key: "$item",
    "data-index": "$index",
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

export const content = repeaterSection("content", () => ({
  $el: "div",
  children: "$slots.default"
}));
