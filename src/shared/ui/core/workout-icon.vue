<script setup lang="ts">
// Define component props interface
interface Props {
  /**
   * @default 0
   */
  index?: number;
}

// Define props with defaults
withDefaults(defineProps<Props>(), {
  index: 0,
});
</script>

<template>
  <component v-bind="$attrs">
    <i class="fa-solid fa-dumbbell" v-if="index % 3 == 0"></i>
    <i class="fa-solid fa-weight-hanging" v-if="index % 3 == 1"></i>
    <i class="fa-solid fa-bolt" v-if="index % 3 == 2"></i>
  </component>
</template>

<style scoped></style>
