<template>
  <div class="relative z-20" @focusout="$emit('blur')">
    <slot> </slot>
    <Transition name="dropdown1">
      <div class="absolute" v-if="props.show"><slot name="menu"></slot></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{show:boolean}>()
</script>

<style scoped>
.dropdown1-enter-active,
.dropdown1-leave-active {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.dropdown1-enter-from,
.dropdown1-leave-to {
  opacity: 0;
}

</style>
