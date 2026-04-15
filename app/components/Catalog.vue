<script setup lang="ts">
import type { Bike } from '~/utils/types/bike';


const props = defineProps<{
    bikes: Bike[]
}>()





// pagination
const perPage = 8
const currentPage = ref<number>(1)

// totalPages
const totalPages = computed(() =>
    Math.ceil(props.bikes.length / perPage)
)

// change page
const goToPage = (page: number) => {
    currentPage.value = page
}



</script>

<template>
    <section class="mb-8 pt-8 md:pt-12 md:mb-12 relative" id="catalog">
        <div class="container mx-auto px-4 lg:px-5">
            <!-- filter -->
            <Filter />
            <!-- Items -->

            <Items :current-page="currentPage" :per-page="perPage" :bikes="bikes" />
            <!-- pagination -->
            <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="goToPage" />
        </div>
    </section>
</template>

<style scoped lang="css"></style>