<script setup lang="ts">
import { useRouter } from 'vue-router';

import Text from '../shared/ui/core/text.vue';
import Grid from '../shared/ui/layout/grid.vue';
import { gymHealthFacts } from '../shared/utils/workout-contents';

const randomNumber = Math.floor(Math.random() * gymHealthFacts.length);
const todaysFact = gymHealthFacts[randomNumber];

const router = useRouter();

const navigateToWorkout = () => {
    router.push('/workout');
};
</script>

<template>
    <section id="dashboard">
        <div class="card tip-container">
            <Text as="h2">Welcome back!</Text>

            <div>
                <Text as="p" class="tip">
                    <strong>💡 Daily tips</strong>
                    <br />
                    {{ todaysFact }}
                </Text>
            </div>

            <button @click="navigateToWorkout">Start workout &rarr;</button>
        </div>

        <Grid />
    </section>
</template>

<style scoped>
.tip-container,
.tip-container div,
#dashboard {
    display: flex;
}

.tip-container,
#dashboard {
    flex-direction: column;
}

#dashboard {
    gap: 2rem;
}

.tip-container {
    gap: 0.5rem;
}

@media (min-width: 640px) {
    .tip-container {
        gap: 1rem;
    }
}
</style>
