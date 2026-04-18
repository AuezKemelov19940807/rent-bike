<script setup lang="ts">
import type { Bike } from '~/utils/types/bike';


const props = defineProps<{
    currentPage: number;
    perPage: number;
    bikes: Bike[]
}>()


const paginatedItems = computed(() => {
    const start = (props.currentPage - 1) * props.perPage
    return props.bikes.slice(start, start + props.perPage)
})
</script>

<template>

    <!-- Items -->
    <div {{ bikes }}
        class="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-10 xs:gap-y-6 gap-x-2.5 md:gap-x-5 lg:gap-x-10">
        <Item v-for="item in paginatedItems" :key="item.id" :image="item.main_photo" :status="item.status"
            :model="item.model" :brand="item.brand" :id="item.id" :company="item.company" />
    </div>

</template>

<style scoped lang="css"></style>