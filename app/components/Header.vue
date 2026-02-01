<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const { locale, locales, setLocale } = useI18n()
const burgerMenu = ref<boolean>(false);
const burgerDropdownRef = ref<HTMLElement | null>(null);
const selectedCity = ref('NHA_TRANG')
const cities = [
    { code: 'NHA_TRANG', name: 'Нячанг', country: 'VN' },
    { code: 'QUI_NHON', name: 'Куинён', country: 'VN' },
    { code: 'TUY_HOA', name: 'Туихоа', country: 'VN' },
];

const setCity = (code: string) => {
    selectedCity.value = code

};

const toggleBurgerMenu = () => {
    burgerMenu.value = !burgerMenu.value;
};

onClickOutside(burgerDropdownRef, () => {
    burgerMenu.value = false
})

</script>

<template>
    <header class="py-2 border-b border-gray">
        <Transition name="fade">
            <div class="fixed sm:hidden inset-0 transition-all duration-300 z-10 bg-black/50" v-if="burgerMenu"></div>
        </Transition>

        <div class="container mx-auto px-4 lg:px-5">
            <div class="flex justify-between items-center">
                <logo />
                <!-- burger -->
                <div class="pr-4 w-6 h-6 flex items-center justify-center" @click="toggleBurgerMenu"
                    ref="burgerDropdownRef">
                    <div :class="{ 'before:top-1/2 before:translate-y-1/2 before:-rotate-45 after:top-1/2 after:translate-y-1/2 after:rotate-45': burgerMenu }"
                        class="z-50 before:transition-all before:duration-300 after:transition-all after:duration-300 block sm:hidden relative before:absolute before:w-4.5 before:h-0.5 before:bg-black before:top-0 before:left-0 before:rounded-full after:absolute after:w-4.5 after:h-0.5 after:bg-black after:bottom-0 after:rounded-full after:left-0  h-3">
                        <span :class="{ 'opacity-0': burgerMenu }"
                            class="absolute  top-1/2 -translate-y-1/2 w-4.5 rounded-full h-0.5 bg-black block transition-all duration-300"></span>
                    </div>
                </div>

                <!-- mobile dropdawn -->
                <Transition>

                    <div v-if="burgerMenu"
                        class="absolute bg-white z-20 py-6 w-full left-0 top-0 flex sm:hidden items-center justify-center">

                        <div class="flex flex-col gap-y-6">
                            <!-- city -->
                            <ul class="flex flex-col items-center justify-center gap-y-6">
                                <li v-for="cityItem in cities" :key="cityItem.code" @click="setCity(cityItem.code)">
                                    <span :class="{ 'text-[#0A1C3A99] opacity-60 ': cityItem.code !== selectedCity, }"
                                        class="uppercase text-2xl font-semibold transition-all duration-300">
                                        {{ cityItem.name }}
                                    </span>
                                </li>
                            </ul>
                            <!-- lang -->
                            <ul class="flex gap-x-12 px-4 py-2 bg-white shadow-card rounded-lg w-fit">
                                <li v-for="localeItem in locales" :key="localeItem.code"
                                    @click="setLocale(localeItem.code)">
                                    <span :class="{ 'text-[#0A1C3A99] opacity-60': localeItem.code !== locale }"
                                        class="uppercase text-2xl font-semibold transition-all duration-300">
                                        {{ localeItem.code }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Transition>

                <div class="hidden sm:flex gap-x-4">
                    <Lang />
                    <City />
                </div>
            </div>
        </div>
    </header>

</template>

<style scoped lang="css">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>