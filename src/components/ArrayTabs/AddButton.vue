<script lang="ts" setup>
import { ElButton } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { FormKitFrameworkContext } from "@formkit/core";
import type { PropType } from "vue";

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  onClick: {
    type: Function as PropType<() => void>,
    required: true,
  },
  bind: {
    type: Object,
    required: true,
  },
});

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  if (!props.disabled && props.onClick) {
    props.onClick();
  }
};
</script>

<template>
  <div style="display: flex; justify-content: flex-start; padding: 12px 0;">
    <ElButton 
      :disabled="disabled" 
      v-bind="props.bind" 
      @click="handleClick"
      type="primary"
      :icon="Plus"
      plain
    >
      {{ context.node.props.addLabel }}
    </ElButton>
  </div>
</template> 