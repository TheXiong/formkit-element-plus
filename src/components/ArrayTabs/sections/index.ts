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
    class: "formkit-tabs-wrapper",
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
      children: "$slots.default",
    },
  ],
  slots: {
    label: {
      $el: "div",
      attrs: {
        class: "formkit-tabs-label",
      },
      children: [
        // 标签页标题
        {
          $cmp: "ElBadge",
          if: "$showIndex",
          props: {
            value: "$index + 1",
            type: "primary",
          },
        },
        {
          $el: "div",
          children: "$label",
          attrs: {
            class: "formkit-tabs-title",
          }
        },
        // 操作按钮
        {
          $el: "div",
          attrs: {
            class: "formkit-tabs-actions",
          },
          children: [
            // 复制按钮
            {
              $cmp: "ElTooltip",
              props: {
                content: "Copy",
                placement: "top",
                effect: "light",
              },
              if: "$showCopy",
              children: [
                {
                  $cmp: "ElButton",
                  props: {
                    size: "small",
                    type: "text",
                    onClick: "$fns.copy($index)",
                    disabled: "$value.length >= $max",
                  },
                  attrs: {
                    class: "formkit-tabs-button",
                  },
                  children: [
                    {
                      $cmp: "ElIcon",
                      props: {
                        size: 14,
                      },
                      children: [
                        {
                          $cmp: "CopyDocument",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            // 删除按钮
            {
              $cmp: "ElTooltip",
              props: {
                content: "Remove",
                placement: "top",
                effect: "light",
              },
              if: "$showRemove",
              children: [
                {
                  $cmp: "ElButton",
                  props: {
                    size: "small",
                    type: "text",
                    onClick: "$fns.remove($index)",
                    disabled: "$value.length <= $min",
                  },
                  attrs: {
                    class: "formkit-tabs-button",
                  },
                  children: [
                    {
                      $cmp: "ElIcon",
                      props: {
                        size: 14,
                      },
                      children: [
                        {
                          $cmp: "Delete",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
}));

// 项目迭代器
export const item = arrayTabsSection("item", () => ({
  $el: "div",
  for: ["item", "index", "$items"],
}));
