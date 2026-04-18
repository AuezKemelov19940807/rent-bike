<script setup lang="ts">
import type { Bike } from '~/utils/types/bike';
const config = useRuntimeConfig();
const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return Array.isArray(s) ? s[0] : s
})


const id = computed(() => {
    if (!slug.value) return null
    return slug.value.split('-').pop()
})

const { data: bike, refresh, pending, error } = await useFetch<Bike>(`/bikes/${id.value}`, {
    baseURL: config.public.apiBase,
});
</script>

<template>

    <CatalogItemDetailsPage v-if="bike" :bike="bike" />
</template>

<style scoped lang="css"></style>