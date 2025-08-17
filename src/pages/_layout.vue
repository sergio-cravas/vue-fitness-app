<template>
    <div class="layout">
        <header>
            <RouterLink to="/" class="link">
                <Text as="h1" class="text-gradient">Fitnera</Text>
            </RouterLink>
        </header>

        <main class="main-content">
            <slot />
        </main>

        <footer>
            <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <Text as="p" style="margin: 0.5rem 0; font-size: 0.875rem; color: var(--color-primary);">
                    Built following
                    <a href="https://www.youtube.com/watch?v=JAgeFLJYrUY" target="_blank" rel="noopener noreferrer">
                        Smoljames's Vue tutorial
                    </a>
                </Text>

                <Text as="p" style="margin: 0.5rem 0; font-size: 0.875rem; color: var(--color-primary);">
                    © 2025
                    <a href="https://sergiocerdahervas.com" target="_blank" rel="noopener noreferrer">
                        Sergio Cerda Hervás
                    </a>
                </Text>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import Text from '../shared/ui/core/text.vue';
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: var(--padding-small);
}

.main-content {
    flex: 1;
    padding: var(--padding-small);
}

footer {
    padding: var(--padding-large) var(--padding-small);
    background-color: var(--background-muted);
    border-top: 1px solid var(--border-primary);
}
</style>