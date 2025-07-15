import { createRepeaterSection } from "../repeaterSection";
import { Menu } from "@element-plus/icons-vue";

// 创建我们的数组项部分
const arrayItemsSection = createRepeaterSection();
// 添加按钮部分
export const addButton = arrayItemsSection("addButton", () => ({
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

// 项目组部分（列表容器）
export const items = arrayItemsSection("items", () => ({
  $el: "ul",
  attrs: {
    role: "list",
    style: "list-style: none; padding: 0; margin: 0; width: 100%; display: flex; flex-direction: column; gap: 16px;",
    class: "drag-list"
  },
}));

// 单个项目容器
export const item = arrayItemsSection("item", () => ({
  $el: "li",
  for: ["item", "index", "$items"],
  attrs: {
    role: "listitem",
    key: "$item",
    "data-index": "$index",
    style: "display: flex; gap: 16px;align-items: center;"
  },
}));

// 组内容
export const group = arrayItemsSection("group", () => ({
  $formkit: "group",
  index: "$index",
}));

// 卡片部分
export const content = arrayItemsSection("content", () => ({
  $el: 'div',
  attrs: {
    style: 'display: flex; gap: 16px;'
  },
  children: "$slots.default"
}));

// 操作按钮部分
export const operations = arrayItemsSection("operations", () => ({
  $el: 'div',
  attrs: {
    style: 'display: flex; align-items: center;'
  },
  children: [
    {
      $cmp: 'ElSpace',
      props: {
        size: 'small',
        wrap: false
      },
      children: [
        // 删除按钮
        {
          $cmp: 'ElTooltip',
          props: {
            content: 'Remove',
            placement: 'top',
            effect: 'light'
          },
          children: [
            {
              $cmp: 'ElButton',
              props: {
                type: 'text',
                onClick: "$fns.createRemover($index)",
                disabled: "$value.length <= $min"
              },
              children: [
                {
                  $cmp: 'ElIcon',
                  props: {
                    size: 20
                  },
                  children: [{
                    $cmp: 'Delete'
                  }]
                }
              ]
            }
          ]
        },
        // 复制按钮
        {
          $cmp: 'ElTooltip',
          props: {
            content: 'Copy',
            placement: 'top',
            effect: 'light'
          },
          children: [
            {
              $cmp: 'ElButton',
              props: {
                type: 'text',
                onClick: "$fns.createInsert($index)",
                disabled: "$value.length >= $max"
              },
              children: [
                {
                  $cmp: 'ElIcon',
                  props: {
                    size: 20
                  },
                  children: [{
                    $cmp: 'CopyDocument'
                  }]
                }
              ]
            }
          ]
        },

      ]
    }
  ]
}));

export const arrayItems = arrayItemsSection('arrayItems', () => ({
  $el: 'div',
  attrs: {
    style: 'width: 100%;'
  },
}));

export const drag = arrayItemsSection('drag', () => ({
  $el: 'div',
  attrs: {
    class: 'handle',
    style: 'display: flex;align-items: center;justify-content: center;'
  },
  children: [
    {
      $cmp: 'ElButton',
      props: {
        size: 20,
        icon: Menu,
        style: 'cursor: move;'
      },

    }
  ]
}));
