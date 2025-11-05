import { FormKitNode } from "@formkit/core";
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
  plugins: [
    (node: FormKitNode) => {
      if (node.props.type == "group") {
        node.on('count:errors', ({ payload: count }) => {
          node.props.errorCount = count
        })
        node.on('count:blocking', ({ payload: count }) => {
          node.props.blockingCount = count
        })

        function updateTotalErrorCount(node: FormKitNode) {
          node.props.totalErrorCount =
            node.props.errorCount + node.props.blockingCount

          if (node.parent?.context) {
            (node.parent.context.errorsCountMap as Record<number, number>)[node.props.index] = node.props.totalErrorCount
          }
        }
        node.on('prop:errorCount', () => updateTotalErrorCount(node))
        node.on('prop:blockingCount', () => updateTotalErrorCount(node))
        node.on('prop:totalErrorCount', () => {
          node.props.isValid = node.props.totalErrorCount <= 0
        })

        node.on('message-added', ({ payload }) => {
          if (payload.key === 'submitted') {
            updateTotalErrorCount(node)

            if (node.parent?.context) {
              node.parent.context.hideCollaspeErrors = false
            }
          }
        })
      }
    }
  ]
}));

export const collapseWrapper = repeaterSection("collapseWrapper", () => ({
  $el: "div",
  attrs: {
    class: "formkit-collapse-wrapper"
  },

}));

export const collapse = repeaterSection("collapse", () => ({
  $cmp: "ElCollapse",
  props: {
    accordion: false,
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
          class: 'formkit-collapse-header'
        },
        children: [
          {
            $el: 'div',
            attrs: {
              class: 'formkit-collapse-content'
            },
            children: [{
              $el: 'div',
              attrs: {
                class: 'formkit-collapse-arrow'
              },
              children: [
                {
                  if: "$isActive",
                  then: {
                    $cmp: 'ElIcon',
                    props: {
                      size: 16,
                    },
                    children: [{
                      $cmp: 'ArrowDown'
                    }]
                  },
                  else: {
                    $cmp: 'ElIcon',
                    props: {
                      size: 16,
                    },
                    children: [{
                      $cmp: 'ArrowRight'
                    }]
                  }
                }
              ]
            }, {
              if: "$: $fns.findCount($index) > 0",
              then: {
                $cmp: 'ElBadge',
                props: {
                  value: "$fns.findCount($index)",
                  offset: [10, 16],
                  hidden: "$hideCollaspeErrors"
                },
                children: [
                  {
                    $el: 'span',
                    attrs: {
                      class: 'formkit-collapse-title'
                    },
                    children: [
                      "$: '#' +($index + 1) + '.' + $label"
                    ]
                  }
                ]
              },
              else: {
                $el: 'span',
                attrs: {
                  class: 'formkit-collapse-title'
                },
                children: [
                  "$: '#' +($index + 1) + '.' + $label"
                ]
              }
            }
          ]
          },
          {
            $el: 'div',
            attrs: {
              class: 'formkit-collapse-actions'
            },
            children: [
              {
                $cmp: 'ElIcon',
                props: {
                  size: 16,
                  onClick: "$fns.createShift($index, 1)"
                },
                attrs: {
                  class: 'formkit-collapse-icon'
                },
                children: [{
                  $cmp: 'Bottom'
                }]
              },
              {
                $cmp: 'ElIcon',
                props: {
                  size: 16,
                  onClick: "$fns.createShift($index, -1)"
                },
                attrs: {
                  class: 'formkit-collapse-icon'
                },
                children: [{
                  $cmp: 'Top'
                }]
              },
              {
                $cmp: 'ElIcon',
                props: {
                  size: 16,
                  onClick: "$fns.createRemover($index)"
                },
                attrs: {
                  class: 'formkit-collapse-icon'
                },
                children: [{
                  $cmp: 'DeleteFilled'
                }]
              },
              {
                $cmp: 'ElIcon',
                props: {
                  size: 16,
                  onClick: "$fns.createInsert($index)"
                },
                attrs: {
                  class: 'formkit-collapse-icon'
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
        class: 'formkit-card-header'
      },
      children: [
        {
          $el: 'span',
          children: '$label'
        },
        {
          $el: 'div',
          attrs: {
            class: 'formkit-card-actions'
          },
          children: [
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createShift($index, 1)"
              },
              attrs: {
                class: 'formkit-card-icon'
              },
              children: [{
                $cmp: 'Bottom'
              }]
            },
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createShift($index, -1)"
              },
              attrs: {
                class: 'formkit-card-icon'
              },
              children: [{
                $cmp: 'Top'
              }]
            },
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createRemover($index)"
              },
              attrs: {
                class: 'formkit-card-icon'
              },
              children: [{
                $cmp: 'DeleteFilled'
              }]
            },
            {
              $cmp: 'ElIcon',
              props: {
                size: 20,
                onClick: "$fns.createInsert($index)"
              },
              attrs: {
                class: 'formkit-card-icon'
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
