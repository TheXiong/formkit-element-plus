import type { FormKitNode } from "@formkit/core";
import { undefine } from "@formkit/utils";

export const repeats = function (node: FormKitNode) {
  node._c.sync = true;

  node.props.min = node.props.min ? Number(node.props.min) : 0;
  node.props.max = node.props.max ? Number(node.props.max) : Infinity;
  
  // 设置默认值
  node.props.tabPosition = node.props.tabPosition ?? 'top';
  node.props.tabType = node.props.tabType ?? ''; // 默认为普通标签页，可选 'card' | 'border-card'
  node.props.stretch = node.props.stretch ?? false;
  node.props.closable = node.props.closable ?? false;
  node.props.showIndex = node.props.showIndex ?? true;
  node.props.showCopy = node.props.showCopy ?? true;
  node.props.showRemove = node.props.showRemove ?? true;
  node.props.showAdd = node.props.showAdd ?? true;
  
  let timer: any;

  // 创建活动标签页索引
  if (node.context) {
    node.context.activeTab = 0;
  }

  node.on("input", ({ payload }) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      if (Array.isArray(payload)) {
        if (payload.length < node.props.min) {
          const value = createValue(node.props.min - payload.length, () => ({}));
          return node.input(payload.concat(value), false);
        } else {
          if (payload.length > node.props.max) {
            return node.input(payload.slice(0, node.props.max));
          }
        }
      } else {
        return node.input(createValue(node.props.min, () => ({})));
      }
    });
  });

  node.on("created", repeaterFeature.bind(null, node));
};

type FnType = (index: number) => object;

function createValue(num: number, fn: FnType) {
  return new Array(num).fill("").map((value, index) => fn(index));
}

function repeaterFeature(node: FormKitNode) {
  // 设置默认值
  node.props.addButton = node.props.addButton ?? true;
  node.props.addLabel = node.props.addLabel ?? 'Add Tab';
  node.props.addAttrs = node.props.addAttrs ?? {};
  
  if (node.props.min > node.props.max) {
    throw Error("ArrayTabs: min must be less than max");
  }

  if ("disabled" in node.props) {
    node.props.disabled = undefine(node.props.disabled);
  }

  if (node.context) {
    const fns = node.context.fns;
    
    // 确保 activeTab 存在
    if (typeof node.context.activeTab === 'undefined') {
      node.context.activeTab = 0;
    }
    
    // 切换标签页
    fns.setActiveTab = (index: number) => () => {
      if (node.context) {
        node.context.activeTab = index;
      }
    };
    
    // 复制标签页
    fns.copy = (index: number) => () => {
      const value = node._value as unknown[];
      const copyItem = JSON.parse(JSON.stringify(value[index]));
      value.splice(index + 1, 0, copyItem);
      node.input(value, false);
      if (node.context) {
        node.context.activeTab = index + 1;
      }
    };
    
    // 添加标签页
    fns.add = () => () => {
      const value = node._value as unknown[];
      value.push({});
      node.input(value, false);
      if (node.context) {
        node.context.activeTab = value.length - 1;
      }
    };
    
    // 删除标签页
    fns.remove = (index: number) => () => {
      const value = node._value as unknown[];
      if (value.length <= node.props.min) {
        console.warn('Cannot remove tab: minimum number of tabs reached');
        return;
      }
      value.splice(index, 1);
      node.input(value, false);
      
      // 处理活动标签页索引
      if (node.context) {
        const activeTab = node.context.activeTab as number;
        if (activeTab >= value.length) {
          node.context.activeTab = value.length - 1;
        } else if (activeTab === index) {
          node.context.activeTab = Math.max(0, index - 1);
        }
      }
    };
  }
} 