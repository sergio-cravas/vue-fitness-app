<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Text from '../shared/ui/core/text.vue';
import WorkoutIcon from '../shared/ui/core/workout-icon.vue';
import WorkoutSection from '../shared/ui/custom/workout-section.vue';
import { workoutProgram, workoutType } from '../shared/utils/workout-contents';

const route = useRoute();

const workoutId = Number(route.params.id);
const { workout, warmup } = workoutProgram[workoutId as keyof typeof workoutProgram];

let selectedExercise = ref<any>(null);

const handleSaveWorkout = (event: any) => {
  console.log({ event });
};
</script>

<template>
  <section id="workout-card">
    <div class="plan-card card">
      <div class="plan-card-header">
        <Text as="p" style="font-weight: bold"> Day {{ workoutId < 9 ? '0' + (workoutId + 1) : workoutId + 1 }} </Text>
        <WorkoutIcon :index="workoutId" />
      </div>

      <Text as="h2">{{ workoutType[workoutId % 3] }} Workout</Text>
    </div>

    <div class="workout-grid">
      <WorkoutSection title="Warmup" :data="warmup" input-disabled :update-exercise="(name) => (selectedExercise = name)" />

      <div class="workout-grid-line" />

      <WorkoutSection title="Warmup" :data="workout" :update-exercise="(name) => (selectedExercise = name)" />
    </div>

    <div class="card workout-btns">
      <button @click="handleSaveWorkout">Save & Exit <i class="fa-solid fa-save" /></button>

      <button @click="handleSaveWorkout">Complete <i class="fa-solid fa-check" /></button>
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

.workout-btns button {
  flex: 1;
}

.workout-btns button i {
  padding-left: 0.5rem;
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
