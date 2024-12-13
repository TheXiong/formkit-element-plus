import type { FormKitNode } from "@formkit/core";
import { undefine } from "@formkit/utils";
import { toRaw } from "vue";


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
  node.props.upControl = node.props.upControl ?? true;
  node.props.downControl = node.props.downControl ?? true;
  node.props.insertControl = node.props.insertControl ?? true;
  node.props.addButton = node.props.addButton ?? true;
  node.props.addLabel = node.props.addLabel ?? false;
  node.props.addAttrs = node.props.addAttrs ?? {};

  

  if (node.props.min > node.props.max) {
    throw Error("Repeater: min must be less than max");
  }

  if ("disabled" in node.props) {
    node.props.disabled = undefine(node.props.disabled);
  }

  if (node.context) {
    node.context.actionCount = (+node.props.removeControl) + (+node.props.upControl) + (+node.props.downControl) + (+node.props.insertControl)
    node.context.actionWidth = (node.context.actionCount as number) * 46 + (node.context.actionCount as number - 1) * 8
    console.log(node.context.actionCount, 'node.context.actionCount');
    

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

    if (node.context.columns && Array.isArray(node.context.columns)) {
      node.context.columns.forEach((column: any) => {
        if(!column._label) {
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
    }
  }
}