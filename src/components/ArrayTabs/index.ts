import type { FormKitTypeDefinition } from "@formkit/core";
import { createSection } from "@formkit/inputs";
import { tabs, tabsWrapper, tabPane, item, addButton } from "./sections";
import { repeats } from "./features/repeats";
import AddButton from "./AddButton.vue";
import { 
  ElTabs, 
  ElTabPane, 
  ElIcon, 
  ElButton, 
  ElTooltip, 
  ElEmpty, 
  ElSpace,
  ElBadge
} from "element-plus";
import { 
  Delete, 
  Plus, 
  CopyDocument,
  Warning
} from "@element-plus/icons-vue";
import FormItem from "../FormItem.vue";

const FormItemSection = createSection('outer', () => ({
  $cmp: 'FormItem',
  meta: {
    autoAnimate: true,
  },
  props: {
    context: '$node.context',
  },
}));

/**
 * Input definition for ArrayTabs input.
 * @public
 */
export const ArrayTabs: FormKitTypeDefinition = {
  schema: FormItemSection(tabsWrapper(tabs(item(tabPane())), addButton(`$addLabel`))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "list",
  /**
   * An array of extra props to accept for this input.
   */
  props: [
    "min",
    "max",
    "tabPosition",
    "type",
    "stretch",
    "closable",
    "tabType",  // 'card' | 'border-card'
    "showIndex",
    "showCopy",
    "showRemove",
    "showAdd",
    "addLabel",
    "addAttrs",
    "help",
  ],
  /**
   * Additional features that make this input work.
   */
  features: [repeats],
  library: {
    ElTabs,
    ElTabPane,
    ElIcon,
    ElButton,
    ElTooltip,
    ElEmpty,
    ElSpace,
    ElBadge,
    Delete,
    Plus,
    CopyDocument,
    Warning,
    FormItem,
    AddButton
  },
}; 