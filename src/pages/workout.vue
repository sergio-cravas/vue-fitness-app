<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import WorkoutIcon from '../shared/ui/core/workout-icon.vue';
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
                <Text as="p">Day {{ workoutId < 9 ? '0' + (workoutId + 1) : (workoutId + 1) }}</Text>
                        <WorkoutIcon :index="workoutId" />
            </div>

            <Text as="h2">{{ workoutType[workoutId % 3] }} Workout</Text>
        </div>

        <div class="workout-grid">
            <Text as="h4" class="grid-name">Warmup</Text>
            <Text as="h6">Sets</Text>
            <Text as="h6">Reps</Text>
            <Text as="h6" class="grid-weights">Weights</Text>

            <div class="workout-grid-row" v-for="(w, wIdx) in warmup" :key="wIdx">
                <div class="grid-name">
                    <Text as="p">{{ w.name }}</Text>
                    <button @click="() => selectedExercise = w.name">
                        <i class="fa-regular fa-circle-question" />
                    </button>
                </div>
                <Text as="p">{{ w.sets }}</Text>
                <Text as="p">{{ w.reps }}</Text>
                <input class="grid-weights" placeholder="14kg" type="text" disabled />
            </div>

            <div class="workout-grid-line" />

            <Text as="h4" class="grid-name">Warmup</Text>

            <Text as="h6">Sets</Text>
            <Text as="h6">Reps</Text>

            <Text as="h6" class="grid-weights">Weights</Text>

            <div class="workout-grid-row" v-for="(w, wIdx) in workout" :key="wIdx">
                <div class="grid-name">
                    <Text as="p">{{ w.name }}</Text>
                    <button @click="() => selectedExercise = w.name">
                        <i class="fa-regular fa-circle-question" />
                    </button>
                </div>
                <Text as="p">{{ w.sets }}</Text>
                <Text as="p">{{ w.reps }}</Text>
                <input class="grid-weights" placeholder="14kg" type="text" />
            </div>
        </div>

        <div class="card workout-btns">
            <button @click="handleSaveWorkout">
                Save & Exit <i class="fa-solid fa-save" />
            </button>

            <button @click="handleSaveWorkout">
                Complete <i class="fa-solid fa-check" />
            </button>
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

.workout-grid,
.workout-grid-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 1rem;
}

.workout-grid-row,
.workout-grid-line {
    grid-column: span 7 / span 7;
}

.workout-grid-line {
    margin: 0.5rem 0;
    height: 3px;
    border-radius: 2px;
    background: var(--background-muted);
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
