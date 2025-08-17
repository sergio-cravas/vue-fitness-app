<script setup lang="ts">
import { useRouter } from 'vue-router';
import Text from '../shared/ui/core/text.vue';

const router = useRouter();

const navigateToDashboard = () => {
    router.push('/dashboard');
};

</script>

<template>
    <section id="welcome">
        <div class="benefits">
            <Text as="h2">Complete this program<br />if you want...</Text>

            <div>
                <p>✅ Follow a simple program with proven results.</p>
                <p>✅ Get fit, healthy, strong and absolutely shredded.</p>
                <p>✅ Learn more about gym, training and technique</p>
            </div>
        </div>

        <div>
            <Text as="h3">The Training Plan</Text>

            <p>This training plan follows a structure known as the <strong>Bro Split</strong>.</p>
            <h5><i>Push &rarr; Pull &rarr; Legs &rarr; Repeat</i></h5>
        </div>

        <div class="card challenge">
            <Text as="h3">🔥 Your Challenge</Text>

            <p>Complete all the workouts and track your progress along the way!</p>
            <p>Do you accept?</p>
            <button @click="navigateToDashboard">Begin &rarr;</button>
        </div>
    </section>
</template>

<style scoped>
#welcome,
.challenge,
.benefits {
    display: flex;
    flex-direction: column;
}

#welcome {
    gap: 1.5rem;
}

.benefits {
    gap: 0.5rem;
}

.challenge {
    gap: 0.25rem;
}

@media (min-width: 640px) {
    #welcome {
        gap: 2rem;
        padding: 1rem 0;
    }

    .benefits {
        gap: 1rem;
    }
}
</style>
