<script lang="ts" setup>
import { ElButton } from "element-plus";
import { CirclePlusFilled } from "@element-plus/icons-vue";
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

const handleAppendClick = () => {
  if (!props.disabled && props.onClick) {
    props.onClick();
  }
};
</script>

<template>
  <div :class="context.classes.add" style="display: flex;justify-content: flex-start;padding: 12px 0;">
    <ElButton :disabled="disabled" v-bind="props.bind" @click="handleAppendClick">
      <!-- <template #icon>
        <CirclePlusFilled class="h-full w-full" />
      </template> -->
      {{ context.addLabel }}
    </ElButton>
  </div>
</template>