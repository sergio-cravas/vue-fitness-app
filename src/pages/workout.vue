<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useWorkoutDataStore } from '../shared/store';
import Button from '../shared/ui/core/button.vue';
import Text from '../shared/ui/core/text.vue';
import WorkoutIcon from '../shared/ui/core/workout-icon.vue';
import WorkoutSection from '../shared/ui/custom/workout-section.vue';
import Portal from '../shared/ui/layout/portal.vue';
import { exerciseDescriptions, workoutProgram, workoutType } from '../shared/utils/workout-contents';

const route = useRoute();
const router = useRouter();
const { workoutData, saveData, isWorkoutCompleted } = useWorkoutDataStore();

const workoutId = Number(route.params.id);
const { workout, warmup } = workoutProgram[workoutId as keyof typeof workoutProgram];

let allowToComplete = computed(() => isWorkoutCompleted(workoutId));
let selectedExercise = ref<keyof typeof exerciseDescriptions | null>(null);
let selectedDescription = computed(() => (selectedExercise.value ? exerciseDescriptions[selectedExercise.value] : ''));

let workoutWithValues = computed(() =>
  workout.map((item) => ({
    ...item,
    value: workoutData?.[workoutId]?.workout?.[item.name],
  }))
);

const handleSaveWorkout = (complete: boolean = false) => {
  let data = workoutWithValues.value.reduce((curr, prev) => ({ ...curr, [prev.name]: prev.value }), {});

  saveData(workoutId, data);

  if (complete) router.push('/dashboard');
};

const handleOnClosePortal = () => {
  selectedExercise.value = null;
};

const handleUpdateExercise = (value: string) => {
  if (value in exerciseDescriptions) {
    selectedExercise.value = value as keyof typeof exerciseDescriptions;
  } else {
    console.warn(`Exercise "${value}" not found in exerciseDescriptions`);
    selectedExercise.value = null;
  }
};
</script>

<template>
  <Portal v-if="!!selectedExercise" @close="handleOnClosePortal">
    <div class="exercise-description">
      <Text as="h3">{{ selectedExercise }}</Text>

      <div>
        <Text as="small">Description</Text>
        <Text as="p">{{ selectedDescription }}</Text>
      </div>

      <Button icon="fa-solid fa-xmark" text="Close" @click="handleOnClosePortal" />
    </div>
  </Portal>

  <section id="workout-card">
    <div class="plan-card card">
      <div class="plan-card-header">
        <Text as="p" style="font-weight: bold"> Day {{ workoutId < 9 ? '0' + (workoutId + 1) : workoutId + 1 }} </Text>
        <WorkoutIcon :index="workoutId" />
      </div>

      <Text as="h2">{{ workoutType[workoutId % 3] }} Workout</Text>
    </div>

    <div class="workout-grid">
      <WorkoutSection title="Warmup" :data="warmup" input-disabled :update-exercise="handleUpdateExercise" />

      <div class="workout-grid-line" />

      <WorkoutSection title="Warmup" :data="workoutWithValues" :update-exercise="handleUpdateExercise" />
    </div>

    <div class="card workout-btns">
      <Button full-width text="Save & Exit" icon="fa-solid fa-save" @click="() => handleSaveWorkout()" />

      <Button full-width text="Complete" icon="fa-solid fa-check" variant="success" :disabled="!allowToComplete" @click="() => handleSaveWorkout(true)" />
    </div>
  </section>
</template>

<style scoped>
#workout-card,
.plan-card {
  display: flex;
  flex-direction: column;
}

#workout-card {
  gap: 1.5rem;
}

.plan-card-header,
.workout-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.workout-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1rem;
}

.workout-grid-line {
  grid-column: span 7 / span 7;
  margin: 0.5rem 0;
  height: 3px;
  border-radius: 2px;
  background: var(--background-muted);
}

.exercise-description {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.exercise-description h3 {
  text-transform: capitalize;
}

.exercise-description button i {
  padding-left: 0.5rem;
}
</style>
