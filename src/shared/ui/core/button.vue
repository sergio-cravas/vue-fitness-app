<script setup lang="ts">
import Text from './text.vue';

interface Props {
  text: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <button :class="['custom-button', `button-${variant}`, `button-${size}`, { 'button-full-width': fullWidth, 'button-disabled': disabled }]" :disabled="disabled" @click="handleClick">
    <Text as="p" class="button-text">{{ text }}</Text>
    <i v-if="icon" :class="icon" class="button-icon" />
  </button>
</template>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: inherit;
}

.custom-button:hover:not(.button-disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-button:active:not(.button-disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Variants */
.button-primary {
  background: var(--color-primary);
  color: white;
}

.button-primary:hover:not(.button-disabled) {
  background: var(--color-primary-hover, #0056b3);
}

.button-secondary {
  background: var(--background-muted);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.button-secondary:hover:not(.button-disabled) {
  background: var(--background-muted-hover, #f8f9fa);
}

.button-success {
  background: var(--color-success, #28a745);
  color: white;
}

.button-success:hover:not(.button-disabled) {
  background: var(--color-success-hover, #218838);
}

.button-danger {
  background: var(--color-danger, #dc3545);
  color: white;
}

.button-danger:hover:not(.button-disabled) {
  background: var(--color-danger-hover, #c82333);
}

/* Sizes */
.button-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.button-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.button-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* States */
.button-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button-full-width {
  width: 100%;
  flex: 1;
}

.button-icon {
  font-size: 0.9em;
}

.button-text {
  white-space: nowrap;
}
</style>
