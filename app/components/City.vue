<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const cityDropdown = ref<boolean>(false);
const cityDropdownRef = ref<HTMLElement | null>(null)
const selectedCity = ref('NHA_TRANG')
const toggleCityDropdown = () => {
    cityDropdown.value = !cityDropdown.value;
};


onClickOutside(cityDropdownRef, () => {
    cityDropdown.value = false
})

const cities = [
    { code: 'NHA_TRANG', name: 'Нячанг', country: 'VN' },
    { code: 'QUI_NHON', name: 'Куинён', country: 'VN' },
    { code: 'TUY_HOA', name: 'Туихоа', country: 'VN' },
];

const setCity = (code: string) => {
    selectedCity.value = code
    cityDropdown.value = false
};

</script>

<template>
    <div class="relative">
        <div class="flex items-center cursor-pointer select-none" @click="toggleCityDropdown" ref="cityDropdownRef">
            <span class="uppercase text-lg">{{cities.find(c => c.code === selectedCity)?.name}}</span>
            <span class="w-6 h-6 flex items-center justify-center transition-all duration-300"
                :class="cityDropdown ? 'rotate-180' : ''">
                <img src="~/assets/img/arrow-bottom.svg" alt="Arrow Bottom">
            </span>
        </div>
        <Transition>
            <div class="absolute left-1/2 -translate-x-1/2 mt-6 px-7 py-2 bg-white shadow-card rounded-lg 
        before:absolute
        before:left-1/2 
        before:-translate-x-1/2
        before:-top-2
        before:w-0 
        before:h-0
        before:border-l-8 
        before:border-l-transparent
        before:border-r-8 
        before:border-r-transparent
        before:border-b-8 
        before:border-b-white
        " v-if="cityDropdown">
                <ul class="flex flex-col gap-y-2">
                    <li class="cursor-pointer" v-for="cityItem in cities" :key="cityItem.code">
                        <span class="uppercase select-none text-lg"
                            :class="{ 'text-[#0A1C3A99] opacity-60 ': cityItem.code !== selectedCity, }"
                            @click="setCity(cityItem.code)">
                            {{ cityItem.name }}
                        </span>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="css">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>