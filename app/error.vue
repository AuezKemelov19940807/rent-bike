<script setup lang="ts">
const props = defineProps<{
    error: any
}>()

</script>

<template>
    <div class="flex items-center justify-center flex-col gap-y-5 pb-10">
        <div>
            <img src="~/assets/img/error.webp" alt="Error Image">
        </div>
        <p class="text-3xl font-extrabold">
            Oops!
        </p>
        <p class="text-red-600">
            {{ error }}
        </p>

    </div>
</template>

<style scoped lang="css"></style>