<script setup lang="ts">






// pagination
const perPage = 8
const currentPage = ref<number>(1)

// totalPages
const totalPages = computed(() =>
    Math.ceil(items.length / perPage)
)

// change page
const goToPage = (page: number) => {
    currentPage.value = page
}



</script>

<template>
    <div class="mb-8 md:mb-12 relative">
        <div class="container mx-auto px-4 lg:px-5">
            <!-- filter -->
            <Filter />
            <!-- Items -->
            <Items :current-page="currentPage" :per-page="perPage" />
            <!-- pagination -->
            <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="goToPage" />
        </div>
    </div>
</template>

<style scoped lang="css"></style>