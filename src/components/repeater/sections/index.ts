import { createRepeaterSection } from "../repeaterSection";
import { CirclePlusFilled, DeleteFilled, Top, Bottom } from "@element-plus/icons-vue";

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

export const content = repeaterSection("content", "div");

export const controlLabel = repeaterSection("controlLabel", "span");

export const downControl = repeaterSection("downControl", () => ({
  $cmp: "ElButton",
  props: {
    disabled: "$index >= $value.length - 1",
    onClick: "$fns.createShift($index, 1)",
    icon: Bottom,
    class: `$classes.control`,
  },
  if: "$downControl",
}));

export const downIcon = repeaterSection("downIcon", () => ({
  $cmp: "IconArrowDownCircleLine",
}));

export const empty = repeaterSection("empty", () => ({
  $el: "div",
}));

export const fieldset = repeaterSection("fieldset", () => ({
  $el: "fieldset",
  attrs: {
    id: "$id",
    disabled: "$disabled",
  },
}));

export const group = repeaterSection("group", () => ({
  $formkit: "group",
  index: "$index",
}));

export const insertControl = repeaterSection("insertControl", () => ({
  $cmp: "ElButton",
  props: {
    disabled: "$value.length >= $max",
    onClick: "$fns.createInsert($index)",
    icon: CirclePlusFilled,
    class: `$classes.control`,
  },
  if: "$insertControl",
}));

export const insertIcon = repeaterSection("insertIcon", () => ({
  $cmp: "IconAddCircle",
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
  },
}));

export const removeControl = repeaterSection("removeControl", () => ({
  $cmp: "ElButton",
  props: {
    disabled: "$value.length <= $min",
    onClick: "$fns.createRemover($index)",
    icon: DeleteFilled,
    class: `$classes.control`,
  },
  bind: "$controlAttrs",
  if: "$removeControl",
}));

export const removeIcon = repeaterSection("removeIcon", () => ({
  $cmp: "IconCloseCircle",
}));


export const upControl = repeaterSection("upControl", () => ({
  $cmp: "ElButton",
  props: {
    disabled: "$index <= 0",
    icon: Top,
    onClick: "$fns.createShift($index, -1)",
    class: `$classes.control`,
  },
  if: "$upControl",
}));

export const upIcon = repeaterSection("upIcon", () => ({
  $cmp: "IconArrowUpCircleLine",
}));

export const Row = repeaterSection("row", () => ({
  $cmp: 'ElRow',
  props: {
    gutter: 12,

  },
}));

export const Col = repeaterSection("col", () => ({
  $cmp: 'ElCol',
  props: {
  },
}));

export const ColSpace = repeaterSection("colSpace", () => ({
  $cmp: 'ElSpace',
  props: {
    direction: "vertical"
  },
}));
export const RowSpace = repeaterSection("rowSpace", () => ({
  $cmp: 'ElSpace',
  props: {
  },
}));


export const Card = repeaterSection("blockWrapper", () => ({
  $el: 'div',
  attrs: {
    style: "width: 100%"
  }
}));

export const CardHeader = repeaterSection("blockWrapperHeader", () => ({
  $el: 'div',
  children: "$label"
}));

// export const Table = repeaterSection("table", () => ({
//   $cmp: 'ElTable',
//   props: {
//     data: "$value",
//   },
// }));

export const tableWrapper = repeaterSection('tableWrapper', () => {
  return {
    $el: 'div',
    attrs: {
      class: 'el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table el-table--layout-fixed is-scrolling-none',
      style: 'width: 100%'
    },
  };
});
export const tableInnerWrapper = repeaterSection('tableInnerWrapper', () => {
  return {
    $el: 'div',
    attrs: {
      class: 'el-table__inner-wrapper'
    },
  };
});

export const tableHeaderWrapper = repeaterSection('tableHeaderWrapper', () => {
  return {
    $el: 'div',
    attrs: {
      class: 'el-table__header-wrapper'
    },
  };
});

export const headerTable = repeaterSection('headerTable', () => {
  return {
    $el: 'table',
    attrs: {
      class: 'el-table__header',
      style: 'width: 100%'
    }
  };
});

export const tableBodyWrapper = repeaterSection('tableBodyWrapper', () => {
  return {
    $el: 'div',
    attrs: {
      class: 'el-table__body-wrapper'
    },
  };
});

export const bodyTable = repeaterSection('bodyTable', () => {
  return {
    $el: 'table',
    // meta: {
    //   autoAnimate: true,
    // },
    attrs: {
      class: 'el-table__body',
      style: 'width: 100%',
      id: "$id",
    }
  };
});

export const thead = repeaterSection('thead', () => {
  return {
    $el: 'thead',
  };
});

export const theadRow = repeaterSection('theadRow', () => {
  return {
    $el: 'tr',
  };
});

export const theadCol = repeaterSection('theadCol', () => {
  return {
    $el: 'th',
    for: ['column', 'index', '$columns'],
    attrs: {
      key: '$column',
      class: 'is-leaf el-table__cell',
      style: {
        if: "$column.columnWidth",
        then: "$: 'width: ' + ($column.columnWidth)"
      }
    },
    children: [
      {
        $el: 'div',
        attrs: {
          class: 'cell',
        },
        children: '$column._label'
      }
    ],
  };
});

export const theadActionCol = repeaterSection('theadActionCol', () => {
  return {
    $el: 'th',
    attrs: {
      class: 'is-leaf el-table__cell',
      style: '$: "width:" + $actionWidth'
    },
    children: '',
  };
});

export const tbodyRow = repeaterSection('tbodyRow', () => {
  return {
    $el: 'tr',
    for: ['item', 'index', '$items'],
    attrs: {
      key: '$item',
      class: "formkit-item",
      // style: 'height: 67px'
    },
  };
});

export const tbody = repeaterSection('tbody', () => {
  return {
    $el: 'tbody',
  };
});

export const tbodyCol = repeaterSection('tbodyCol', () => {
  return {
    $el: 'td',
    for: ['column', 'index', '$columns'],
    children: [{
      $el: 'div',
      children: [
        {
          $cmp: 'FormKitSchema',
          props: {
            schema: '$column'
          }
        }
      ],
      attrs: {
        class: 'cell',
        style: 'padding-bottom: 18px'
      }
    }],
    attrs: {
      key: '$column',
      class: 'el-table__cell',
      style: {
        if: "$column.columnWidth",
        then: "$: 'width: ' + ($column.columnWidth)"
      }
    },
  };
});

export const tbodyActionCol = repeaterSection('tbodyActionCol', () => {
  return {
    $el: 'td',
    attrs: {
      class: 'el-table__cell',
      style: '$: "width:" + $actionWidth'
    },
  };
});

export const actionButtonGroup = repeaterSection('actionButtonGroup', () => {
  return {
    $el: 'div',
    attrs: {
      style: 'padding-bottom: 18px;display:flex;justify-content:center;'
    },
  };
});