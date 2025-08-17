<script setup lang="ts">
import { workoutProgram, workoutType } from '../../utils/workout-contents';
import Button from '../core/button.vue';
import Text from '../core/text.vue';

// Define component props interface
interface Props {
  firstIncompleteWorkoutIndex: number;
  handleResetPlan: () => void;
  handleSelectWorkout: (id: number) => void;
}

// Define props with defaults
withDefaults(defineProps<Props>(), {
  firstIncompleteWorkoutIndex: 0,
  handleResetPlan: () => {},
  handleSelectWorkout: () => {},
});
</script>

<template>
  <section id="grid">
    <button :key="index" class="card-button plan-card" v-for="(_, index) in Object.keys(workoutProgram)" @click="() => handleSelectWorkout(index)" :disabled="index > 0 && index > firstIncompleteWorkoutIndex">
      <div>
        <Text as="p">Day {{ index < 9 ? '0' + (index + 1) : index + 1 }}</Text>

        <i class="fa-solid fa-dumbbell" v-if="index % 3 == 0"></i>
        <i class="fa-solid fa-weight-hanging" v-if="index % 3 == 1"></i>
        <i class="fa-solid fa-bolt" v-if="index % 3 == 2"></i>
      </div>

      <Text as="h3">{{ workoutType[index % 3] }}</Text>
    </button>

    <Button text="Reset" icon="fa-solid fa-rotate-left" :disabled="firstIncompleteWorkoutIndex != -1" @click="handleResetPlan" class="card-button plan-card-reset" />
  </section>
</template>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 1rem;
}

#grid button {
  width: 100%;
}

#grid button:disabled {
  box-shadow: none;
  cursor: not-allowed;
}

.plan-card {
  display: flex;
  flex-direction: column;
}

.plan-card-reset {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.plan-card div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.plan-card div p {
  text-align: left;
}

@media (min-width: 640px) {
  #grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
