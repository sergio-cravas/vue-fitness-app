import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { workoutProgram } from "../utils/workout-contents";

export type Workout = {
    [name: string]: string
};

export type WorkoutData = {
    [id: number]: {
        completed: boolean;
        workout: Workout;
    }
};

interface State {
    workoutData: Ref<WorkoutData | null>;
    firstIncompleteWorkoutIndex: Ref<number>;
    isWorkoutCompleted: (id: number) => boolean;
    saveData: (id: number, data: Workout) => void;
    clearData: () => void;
}

export const useWorkoutDataStore = defineStore('workoutData', (): State => {
    const workoutData = ref<WorkoutData | null>(null);
    const firstIncompleteWorkoutIndex = ref<number>(0);

    function isWorkoutCompleted(id: number) {
        return workoutData?.value?.[id]?.completed || false;
    }

    function saveData(id: number, data: Workout) {
        if (!workoutData.value) workoutData.value = {};

        if (!workoutData.value[id]) {
            workoutData.value[id] = {
                completed: false,
                workout: workoutProgram[id as keyof typeof workoutProgram].workout
                    .reduce((acc, curr) => ({ ...acc, [curr.name]: 0 }), {}) as Workout
            };
        }

        // Now we know workoutData.value and workoutData.value[id] exist
        const workoutEntry = workoutData.value[id];

        Object.keys(data).forEach((name: string) => {
            workoutEntry.workout[name] = data[name];
        });

        const isCompleted = Object.values(workoutEntry.workout).every((item) => !!item);

        // If every item of the workout have a value, we set the completed prop to true
        workoutEntry.completed = isCompleted;

        if (isCompleted) {
            firstIncompleteWorkoutIndex.value += 1;

            if (firstIncompleteWorkoutIndex.value > 30) firstIncompleteWorkoutIndex.value = 0;
        }
    }

    function clearData() {
        workoutData.value = null;
        firstIncompleteWorkoutIndex.value = 0;
    }

    return { workoutData, firstIncompleteWorkoutIndex, isWorkoutCompleted, saveData, clearData };
}, {
    persist: {
        key: 'fitness-app-workout-data',
        storage: localStorage,
    }
})