import type { FormKitNode } from "@formkit/core";
import { undefine } from "@formkit/utils";
import { computed, onMounted } from "vue";
import { Bottom, CirclePlusFilled, DeleteFilled, Top } from "@element-plus/icons-vue";
import Sortable from "sortablejs";
import { TableV2FixedDir } from "element-plus";

export const repeats = function (node: FormKitNode) {
  node._c.sync = true;

  node.props.min = node.props.min ? Number(node.props.min) : 0;
  node.props.max = node.props.max ? Number(node.props.max) : 1 / 0;
  let timer: any

  // node.hook.input((payload, next) => {
  //   if (node.props.valueType === 'KV' && !Array.isArray(payload)) {
  //     const columns = (node.context?.columns as any[]) || []
  //     if (columns.length !== 2 || !Object.keys(payload).length) {
  //       return next([])
  //     }

  //     const [keyName, valueName] = columns.map(c => c.name)

  //     const data = []
  //     // 将对象转换成数组
  //     for (const key in payload) {
  //       data.push({
  //         [keyName]: key,
  //         [valueName]: payload[key]
  //       })
  //     }
  //     return next(data)
  //   }
  //   return next(payload)
  // })

  // node.root.hook.submit((payload, next) => {
  //   const address = node.address.slice(1)
  //   console.log(address, payload, 'payload');
  //   if (node.props.valueType === 'KV') {
  //     if (address.length == 1) {
  //       let data: Record<string, string> = {}
  //       const columns = (node.context?.columns as any[]) || []
  //       const [keyName, valueName] = columns.map(c => c.name)
  //       payload[address[0]].forEach((ele: Record<string, string>) => {
  //         if (ele[keyName] && ele[valueName]) {
  //           data[ele[keyName]] = ele[valueName]
  //         }
  //       });
  //       payload[address[0]] = data
  //     }

  //   }

  //   return next(payload)
  // })


  node.on("input", ({ payload }) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      if (Array.isArray(payload)) {
        if (payload.length < node.props.min) {
          const value = createValue(node.props.min - payload.length, () => ({}));
          return node.input(payload.concat(value), false)
        } else {
          if (payload.length > node.props.max) {
            return node.input(payload.slice(0, node.props.max))
          }
        }
      } else {
        return node.input(createValue(node.props.min, () => ({})))
      }
    })

  })

  node.on("created", repeaterFeature.bind(null, node));
};

type FnType = (index: number) => object;

function createValue(num: number, fn: FnType) {
  return new Array(num).fill("").map((value, index) => fn(index));
}

function repeaterFeature(node: FormKitNode) {
  node.props.removeControl = node.props.removeControl ?? true;
  node.props.upControl = node.props.upControl ?? false;
  node.props.downControl = node.props.downControl ?? false;
  node.props.insertControl = node.props.insertControl ?? false;
  node.props.addButton = node.props.addButton ?? true;
  node.props.addLabel = node.props.addLabel ?? 'add';
  node.props.addAttrs = node.props.addAttrs ?? {};
  node.props.controlAttrs = node.props.controlAttrs ?? {};
  node.props.actionWidth = node.props.actionWidth ?? 0;

  if (node.props.min > node.props.max) {
    throw Error("Repeater: min must be less than max");
  }

  if ("disabled" in node.props) {
    node.props.disabled = undefine(node.props.disabled);
  }

  if (node.context) {
    node.context.actionCount = (+node.props.removeControl) + (+node.props.upControl) + (+node.props.downControl) + (+node.props.insertControl)
    if (!node.props.actionWidth) {
      node.context.actionWidth = (node.context.actionCount as number) * 46 + (node.context.actionCount as number - 1) * 8 + 'px'
    } else {
      node.context.actionWidth = node.props.actionWidth
    }


    const fns = node.context.fns;
    fns.createShift = (index: number, offset: number) => () => {
      const value = node._value as unknown[];
      value.splice(index + offset, 0, value.splice(index, 1)[0]),
        node.input(value, false);
    };
    fns.createInsert = (index: number) => () => {
      const value = node._value as unknown[];
      value.splice(index + 1, 0, {}), node.input(value, false);
    };
    fns.createAppend = () => () => {
      const value = node._value as unknown[];
      value.push({}), node.input(value, false);
    };
    fns.createRemover = (index: number) => () => {
      const value = node._value as unknown[];
      value.splice(index, 1), node.input(value, false);
    };

    node.context.tableData = computed(() => {
      if (node.context?.value && Array.isArray(node.context?.value)) {
        node.context.value.forEach((item: any, index: number) => {
          if (!item._id) {
            item._id = new Date().getTime()
          }
        })
      }

      return (node.context?.value || [])
    })


    if (node.context.columns && Array.isArray(node.context.columns)) {
      node.context.columns.forEach((column: any) => {
        if (!column._label) {
          column._label = column.label
          column.label = ''
        }
        column["validation-messages"] = {
          required: column._label + '不得留空'
        }

        if (!column.placeholder) {
          const isRequired = (column.validation || '').split('|').includes('required')
          column.placeholder = column._label + (isRequired ? '*' : '')
        }
      })

      const tableColumns: any[] = node.context.columns.map((column: any, columnIndex: number) => {
        return {
          columnSchema: column,
          key: `${column.name}-${columnIndex}`,
          dataKey: column.name,
          title: column._label,
          ...column.columnWidth? {
            width: column.columnWidth
          }: {
            width: 100,
            flexGrow: 1
          }
        }
      })

      tableColumns.unshift({
        key: 'index',
        dataKey: 'index',
        title: '序号',
        width: 100,
        flexGrow: 0,
        columnSchema: {
          $el: 'span',
          children: '$index + 1'
        }
      })

      tableColumns.unshift({
        key: 'drag',
        dataKey: 'drag',
        title: '排序',
        width: 100,
        flexGrow: 0,
        columnSchema: {
          $el: 'div',
          attrs: {
            class: 'handle',
            style: 'width: 24px;height: 24px;display: flex;align-items: center;justify-content: center;'
          },
          children: [
            {
              $cmp: 'Menu',
              props: {
                size: 20,
                style: 'cursor: move;'
              },

            }
          ]
        },
      })

      onMounted(() => {
        const el = document.querySelector('.drag-table .el-table-v2__body>div>div')
        if (el) {
          new Sortable(el, {
            handle: '.handle', // handle's class
            animation: 150,
            onEnd: ({ newIndex, oldIndex }) => {
              console.log(newIndex, oldIndex);
              if (newIndex !== oldIndex) {
                const value = node._value as unknown[];
                value.splice(newIndex, 0, value.splice(oldIndex, 1)[0]),
                  node.input(value, false);
              }
            }
          });
        }
      })

      if ((node.context as any).actionCount > 0) {
        tableColumns.push({
          key: 'action',
          dataKey: 'action',
          title: '操作',
          width: (node.context as any).actionCount * 46 + ((node.context as any).actionCount - 1) * 12 + 16,
          flexGrow: 0,
          // fixed: TableV2FixedDir.RIGHT,
          columnSchema: {
            $el: 'div',
            attrs: {
              style: 'display:flex;justify-content:center;'
            },
            children: [
              {
                $cmp: "ElButton",
                props: {
                  disabled: "$index <= 0",
                  icon: Top,
                  onClick: "$createShift($index, -1)",
                  class: `$classes.control`,
                },
                if: "$upControl",
              },
              {
                $cmp: "ElButton",
                props: {
                  disabled: "$tableData.length <= $min",
                  onClick: "$createRemover($index)",
                  icon: DeleteFilled,
                  class: `$classes.control`,
                },
                bind: "$controlAttrs",
                if: "$removeControl",
              },
              {
                $cmp: "ElButton",
                props: {
                  disabled: "$tableData.length >= $max",
                  onClick: "$createInsert($index)",
                  icon: CirclePlusFilled,
                  class: `$classes.control`,
                },
                if: "$insertControl",
              },
              {
                $cmp: "ElButton",
                props: {
                  disabled: "$index >= $tableData.length - 1",
                  onClick: "$createShift($index, 1)",
                  icon: Bottom,
                  class: `$classes.control`,
                },
                if: "$downControl",
              }
            ],
          }
        })
      }

      node.context.tableColumns = tableColumns
      node.context.tableHeight = computed(() => {
        if (node.context?.value.length < 10) {
          if (node.context?.value.length === 0) {
            return '250px'
          }
          return ((node.context?.value.length || 0) + 1) * 50 + 'px'
        } else {
          return '550px'
        }
      })
    }
  }
}
