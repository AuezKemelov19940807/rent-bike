<script setup lang="ts">
const props = defineProps<{
    image: string;
    model: string;
    brand: string;
    status: string;
    id: number;
}>()




const statusColor = computed(() => {
    switch (props.status) {
        case 'rented':
            return 'bg-[#FF383C]'
        case 'maintenance':
            return 'bg-[#B9B9B9]'
        default:
            return 'bg-[#94FFAF]'
    }
})

const bikeSlug = computed(() => {
    if (!props.brand || !props.model || !props.id) return ''

    return `${slugify(props.brand)}-${slugify(props.model)}-${props.id}`
})

</script>

<template>
    <NuxtLink class="overflow-hidden relative cursor-pointer pb-[70%]  transition-shadow duration-1000"
        :to="$localePath(`/catalog/${bikeSlug}`)">
        <!-- <div class="w-8 h-8 bg-white flex items-center   z-10 justify-center absolute top-2 left-2 rounded-full">
            <span class="flex items-center justify-center ">
                <img class="  " :src="icon" alt="Bike Icon">
            </span>
        </div> -->

        <span class="bg-white z-10 absolute flex items-center gap-x-2 px-2 py-1 rounded-full top-3 right-2">
            <span class="text-sm">
                {{ $t(status) }}
            </span>
            <span class="w-2.5 h-2.5 rounded-full block" :class="statusColor" />
        </span>
        <p class="absolute -left-0.5 z-20 bg-white text-black px-2 py-2 font-semibold -bottom-0.5 rounded-tr-lg">
            {{ brand }} {{ model }}
        </p>
        <div class="absolute top-0 left-0 w-full h-full">
            <img class="object-cover rounded-lg w-full transition-all duration-1000 h-full " :src="image"
                alt="Item Image">
        </div>
    </NuxtLink>
</template>

<style scoped lang="css"></style>