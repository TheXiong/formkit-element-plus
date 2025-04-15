import { createRepeaterSection } from "../repeaterSection";

// 创建我们的数组标签页部分
const arrayTabsSection = createRepeaterSection();

// 添加按钮部分
export const addButton = arrayTabsSection("addButton", () => ({
  $cmp: "AddButton",
  props: {
    onClick: "$fns.add()",
    disabled: "$value.length >= $max || !$showAdd",
    context: "$node.context",
    bind: "$addAttrs",
  },
  if: "$addButton",
  type: "button",
}));

// 外层容器
export const tabsWrapper = arrayTabsSection("tabsWrapper", () => ({
  $el: "div",
  attrs: {
    style: "width: 100%;"
  },
}));

// 标签页容器
export const tabs = arrayTabsSection("tabs", () => ({
  $cmp: "ElTabs",
  props: {
    modelValue: "$node.context.activeTab",
    "onUpdate:modelValue": "$fns.setActiveTab($event)",
    type: "$tabType",
    tabPosition: "$tabPosition",
    stretch: "$stretch",
  },
}));

// 标签页内容
export const tabPane = arrayTabsSection("tabPane", () => ({
  $cmp: "ElTabPane",
  props: {
    name: "$index",
    closable: "$closable",
    disabled: false,
    lazy: true,
  },
  children: [
    {
      $formkit: "group",
      index: "$index",
      children: "$slots.default"
    }
  ],
  slots: {
    label: {
      $el: "div",
      attrs: {
        style: "display: flex; align-items: center; gap: 4px;"
      },
      children: [
        // 标签页标题
        {
          $el: "span",
          if: "$showIndex",
          children: [
            {
              $el: "b",
              children: [
                {
                  $cmp: "ElBadge",
                  props: {
                    value: "$index + 1",
                    type: "primary"
                  }
                }
              ]
            }
          ]
        },
        {
          $el: "span",
          children: "$label"
        },
        // 操作按钮
        {
          $el: "div",
          attrs: {
            style: "display: flex; align-items: center; margin-left: 8px;"
          },
          children: [
            // 复制按钮
            {
              $cmp: "ElTooltip",
              props: {
                content: "Copy",
                placement: "top",
                effect: "light"
              },
              if: "$showCopy",
              children: [
                {
                  $cmp: "ElButton",
                  props: {
                    size: "small",
                    type: "text",
                    onClick: "$fns.copy($index)",
                    disabled: "$value.length >= $max"
                  },
                  children: [
                    {
                      $cmp: "ElIcon",
                      props: {
                        size: 14
                      },
                      children: [
                        {
                          $cmp: "CopyDocument"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            // 删除按钮
            {
              $cmp: "ElTooltip",
              props: {
                content: "Remove",
                placement: "top",
                effect: "light"
              },
              if: "$showRemove",
              children: [
                {
                  $cmp: "ElButton",
                  props: {
                    size: "small",
                    type: "text",
                    onClick: "$fns.remove($index)",
                    disabled: "$value.length <= $min"
                  },
                  children: [
                    {
                      $cmp: "ElIcon",
                      props: {
                        size: 14
                      },
                      children: [
                        {
                          $cmp: "Delete"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}));

// 项目迭代器
export const item = arrayTabsSection("item", () => ({
  $el: "div",
  for: ["item", "index", "$items"],
})); 