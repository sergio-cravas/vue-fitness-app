<template>
  <component :is="as" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
// Define the allowed HTML element types
type ElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'small';

// Define component props interface
interface Props {
  /**
   * The HTML element to render
   * @default 'div'
   */
  as?: ElementType;
}

// Define props with defaults
withDefaults(defineProps<Props>(), {
  as: 'div',
});

// Disable automatic attribute inheritance to have manual control
defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped></style>
