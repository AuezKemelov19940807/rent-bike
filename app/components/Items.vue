<script setup lang="ts">

const props = defineProps<{
    currentPage: number;
    perPage: number;
}>()


const paginatedItems = computed(() => {
    const start = (props.currentPage - 1) * props.perPage
    return items.slice(start, start + props.perPage)
})
</script>

<template>

    <!-- Items -->
    <div
        class="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-10 xs:gap-y-6 gap-x-2.5 md:gap-x-5 lg:gap-x-10">
        <Item v-for="item in paginatedItems" :key="item.id" :image="item.image" :icon="item.icon" :status="item.status"
            :model="item.model" />
    </div>

</template>

<style scoped lang="css"></style>