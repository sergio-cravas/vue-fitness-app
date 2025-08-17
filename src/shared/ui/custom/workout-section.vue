<script setup lang="ts">
import Text from '../core/text.vue';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  value?: string;
}

// Define component props interface
interface Props {
  title: string;
  data: Exercise[];
  inputDisabled?: boolean;
  updateExercise?: (name: string) => void;
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  title: '',
  data: () => [],
  inputDisabled: false,
});

const handleUpdateExercise = (name: string) => {
  props.updateExercise?.(name);
};
</script>

<template>
  <Text as="h4" class="grid-name">{{ title }}</Text>
  <Text as="h6">Sets</Text>
  <Text as="h6">Reps</Text>
  <Text as="h6" class="grid-weights">Weights</Text>

  <div class="workout-grid-row" v-for="(w, wIdx) in data" :key="wIdx">
    <div class="grid-name">
      <Text as="p">{{ w.name }}</Text>
      <button @click="() => handleUpdateExercise(w.name)">
        <i class="fa-regular fa-circle-question" />
      </button>
    </div>

    <Text as="p">{{ w.sets }}</Text>
    <Text as="p">{{ w.reps }}</Text>
    <input class="grid-weights" placeholder="14kg" type="text" :disabled="inputDisabled" v-model="w.value" />
  </div>
</template>

<style scoped>
.workout-grid-row {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1rem;
}

.workout-grid-row {
  grid-column: span 7 / span 7;
}

.grid-name {
  grid-column: span 3 / span 3;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.grid-name button {
  padding: 0;
  border: none;
  box-shadow: none;
}

.grid-name button:hover {
  transform: none;
  box-shadow: none;
  color: var(--color-link);
}

.workout-grid-row .grid-name button {
  opacity: 0;
  pointer-events: none;
}

.workout-grid-row:hover .grid-name button {
  opacity: 1;
  pointer-events: all;
}

.grid-name p {
  text-transform: capitalize;
}

.grid-weights {
  grid-column: span 2 / span 2;
}
</style>
