import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWorkoutDataStore = defineStore('workoutData', () => {
    const data = ref<any>({});
    const isWorkoutCompleted = computed<boolean>(() => false);

    return { data, isWorkoutCompleted };
})