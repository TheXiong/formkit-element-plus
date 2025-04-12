import type { FormKitNode } from "@formkit/core";
import { undefine } from "@formkit/utils";

export const repeats = function (node: FormKitNode) {
  node._c.sync = true;

  node.props.min = node.props.min ? Number(node.props.min) : 0;
  node.props.max = node.props.max ? Number(node.props.max) : 1 / 0;
  let timer: any

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
    const fns = node.context.fns;
    fns.createShift = (index: number, offset: number) => (e) => {
      e?.stopPropagation();
      const value = node._value as unknown[];
      value.splice(index + offset, 0, value.splice(index, 1)[0]),
        node.input(value, false);
    };
    fns.createInsert = (index: number) => (e) => {
      e?.stopPropagation();
      const value = node._value as unknown[];
      value.splice(index + 1, 0, {}), node.input(value, false);
    };
    fns.createAppend = () => (e) => {
      e?.stopPropagation();
      const value = node._value as unknown[];
      value.push({}), node.input(value, false);
    };
    fns.createRemover = (index: number) => (e) => {
      e?.stopPropagation();
      const value = node._value as unknown[];
      value.splice(index, 1), node.input(value, false);
    };

    node.context.errorsCountMap = {}
    node.context.hideCollaspeErrors = true
    fns.findCount = (index: number) => {
      return (node.context?.errorsCountMap as Record<number, number>)[index]
    }
  }
}
