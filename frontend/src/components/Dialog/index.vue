<template>
  <Transition name="dialoger">
    <div
      class="dialog-background justify-center backdrop-blur-sm items-center flex"
      v-if="modelValue"
      @click="modelValue = false"
    >
      <!--背景板-->
      <div class="dialog-inner">
        <!-- 对话框内容 -->
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
//获取Vue组件
import { computed } from 'vue';
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
//value双向绑定
const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped>
.dialog-background {
  @apply fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-slate-800/20;
}
.dialoger-enter-active,
.dialoger-leave-active {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.dialoger-enter-from,
.dialoger-leave-to {
  opacity: 0;
}
.dialoger-enter-active  .dialog-inner,
.dialoger-leave-active  .dialog-inner {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.dialoger-enter-active  .dialog-inner
{
transition-delay: 50ms;
}
.dialoger-enter-from .dialog-inner,
.dialoger-leave-to .dialog-inner {
  transform: translateY(30px) scale(.75);
  opacity: 0;
}
</style>
