<script setup lang="ts">

import Error from '~/error.vue';
import type { Bike } from '~/utils/types/bike';

const config = useRuntimeConfig();
const { data: bikes, refresh, pending, error } = await useFetch<Bike[]>("/bikes", {
    baseURL: config.public.apiBase,
});
</script>

<template>
    <Hero />
    <template v-if="pending">
        <div class="flex items-center gap-y-5 flex-col justify-center w-full h-full">
            <img class="animate-spin" src="~/assets/img/progress-black.svg" alt="Loading">
        </div>
    </template>
    <template v-if="bikes">
        <Catalog :bikes="bikes" />
    </template>
    <Error v-else-if="error" :error="error" />
</template>

<style scoped lang="css"></style>