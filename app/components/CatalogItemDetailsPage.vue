<script setup lang="ts">
import hero1 from '~/assets/img/hero-1.png';
import hero2 from '~/assets/img/hero-2.png';
import hero3 from '~/assets/img/hero-3.png';
import bikeIcon1 from "~/assets/img/bike-icon-1.svg";
import bikeIcon2 from "~/assets/img/bike-icon-2.svg";
import bikeIcon3 from "~/assets/img/bike-icon-3.svg";
import type { Bike } from '~/utils/types/bike';


const props = defineProps<{
    bike: Bike
}>()



const catalogItemDetailsRef = ref(null);
const catalogItemDetails = useSwiper(catalogItemDetailsRef, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
        el: '.details-pagination',
        clickable: true,
        renderBullet: (index, className) => {
            return `<span class="${className}"></span>`
        },
    },



    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            shadow: true,
            translate: [0, 0, -400],
        },
    },
})

// const slides = ref([
//     {
//         id: 1,
//         image: hero1,
//         icon: bikeIcon1
//     },
//     {
//         id: 2,
//         image: hero2,
//         icon: bikeIcon2
//     },
//     {
//         id: 3,
//         image: hero3,
//         icon: bikeIcon3
//     }
// ])

const slides = computed(() => {
    if (!props.bike) return []

    const photos = props.bike.photos || []

    return [
        props.bike.main_photo,
        ...photos.filter(p => p !== props.bike.main_photo)
    ]
})


const timePeriods = [
    { id: 'daily', text: 'Сутки' },
    { id: 'weekly', text: 'Неделя' },
    { id: 'monthly', text: 'Месяц' }
]

const activePeriod = ref(0)

const changeActivePeriod = (index: number) => {
    activePeriod.value = index
}

const price = computed(() => {
    if (!props.bike) return 0

    switch (activePeriod.value) {
        case 0:
            return props.bike.daily_rental_price
        case 1:
            return props.bike.weekly_rental_price
        case 2:
            return props.bike.monthly_rental_price
        default:
            return props.bike.daily_rental_price
    }
})





const recomentItems = [
    {
        id: 1,
        image: hero1,
        model: "Yamaha MT-07",
        icon: bikeIcon1,
        status: "Свободен",
    },
    {
        id: 2,
        image: hero2,
        model: "Multistrada 950",
        icon: bikeIcon2,
        status: "Занят",
    },
    {
        id: 3,
        image: hero3,
        model: "Multistrada 950",
        icon: bikeIcon3,
        status: "Обслуживание",
    },

    {
        id: 4,
        image: hero1,
        model: "Honda CB650R",
        icon: bikeIcon1,
        status: "Свободен",
    },
]

const dropdawn = ref<boolean>(false);

const toggleDropdown = () => {
    dropdawn.value = !dropdawn.value
}

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date))
}


const statusColor = computed(() => {
    switch (props.bike.status) {
        case 'rented':
            return 'bg-red-500'
        case 'maintenance':
            return 'bg-gray-400'
        case 'available':
            return 'bg-green-500'
        default:
            return 'bg-gray-300'
    }
})

</script>

<template>
    <div class="mb-8 md:mb-20">
        <div class="flex flex-col  md:gap-y-0 lg:flex-row gap-x-10 lg:gap-x-14 2xl:gap-x-20">
            <!-- slider -->
            <div class="lg:max-w-1/2 w-full aspect-[1/0.806] relative">
                <ClientOnly>
                    <swiper-container class="h-full min-h-75" ref="catalogItemDetailsRef" :init="false">
                        <swiper-slide v-for="(slide, idx) in slides" :key="idx" class="relative  h-full w-full">
                            <div>
                                <!-- <p
                                    class="absolute top-4 md:top-10 left-4 md:left-24 z-10 text-3xl w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center  bg-white font-semibold">
                                    <img class="w-6 h-6 md:w-8 md:h-8" :src="slide.icon" alt="">
                                </p> -->
                                <img class="absolute w-full h-full  top-0 left-0 object-cover" :src="slide"
                                    alt="Hero Image">
                            </div>
                        </swiper-slide>

                    </swiper-container>
                    <div
                        class="swiper-pagination visible details-pagination pointer-events-auto z-50 absolute bottom-4 right-6 flex gap-x-2">
                    </div>
                </ClientOnly>
                <button
                    class="absolute top-1/2 -translate-y-1/2 cursor-pointer left-6 z-10 bg-white hidden md:flex items-center justify-center w-10 h-10 rounded-full "
                    @click="catalogItemDetails.prev()">
                    <img class="rotate-90" src="~/assets/img/arrow-bottom.svg" alt="">
                </button>
                <!-- Go forward one slide -->
                <button
                    class="absolute top-1/2 -translate-y-1/2 cursor-pointer right-6 z-10 bg-white hidden md:flex items-center justify-center w-10 h-10 rounded-full "
                    @click="catalogItemDetails.next()">
                    <img class="-rotate-90" src="~/assets/img/arrow-bottom.svg" alt="">
                </button>
            </div>
            <!-- content -->
            <div class="flex flex-col px-4 lg:px-0 mt-8 2xl:mt-20">
                <div class="flex items-center gap-x-2 mb-4">
                    <!-- <span>
                        <img class="w-8 h-8" :src="bikeIcon1" alt="Brand Icon">
                    </span> -->
                    <h2 class="text-3xl font-medium"> {{ bike.brand }} {{ bike.model }} </h2>
                </div>

                <div class="mb-10">
                    <div class="flex flex-col gap-y-4">

                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Марка</span>
                            <span>{{ bike.brand }}</span>
                        </div>

                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Модель</span>
                            <span>{{ bike.model }}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Год</span>
                            <span>{{ bike.year }}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Объем двигателя</span>
                            <span>{{ bike.engine_capacity_cc }} см³</span>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Тип байка</span>
                            <span>{{ bike.bike_type }}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Коробка передач</span>
                            <span>{{ bike.transmission }}</span>
                        </div>

                        <div class="grid grid-cols-2 gap-x-4">
                            <span class="text-sm text-gray-400">Категория прав</span>
                            <span>{{ bike.license_category }}</span>
                        </div>

                    </div>

                </div>
                <div class="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-y-4">
                    <div class="text-3xl font-medium flex gap-x-4">
                        <span>Цена</span>
                        <span>{{ price }}$</span>
                    </div>
                    <div class="flex gap-x-2">
                        <span v-for="(period, index) in timePeriods" :key="period.id" @click="changeActivePeriod(index)"
                            :class="{
                                'bg-black text-white': activePeriod === index
                            }"
                            class="border cursor-pointer transition-all select-none duration-300 inline-block px-4 py-2 rounded-full">
                            {{ period.text }}
                        </span>
                    </div>

                    <div
                        class="text-3xl font-medium flex flex-col md:flex-row gap-y-4 items-center justify-center  md:items-start md:justify-start gap-x-4">
                        <span>Цена продажи</span>
                        <span>{{ bike.sale_price.toLocaleString() }} $</span>
                    </div>
                    <div class="flex flex-col md:flex-row items-center gap-y-1 gap-x-4 text-lg font-semibold">
                        <div class="text-lg flex gap-x-3.5 items-center font-semibold ">
                            <span>Статус</span>
                            <span class="w-2.5 h-2.5 rounded-full" :class="statusColor"></span>
                            <span> {{ bike.status }} </span>
                        </div>
                        <span class="bg-green-100 text-green-700 px-4 py-0.5 rounded-full text-sm font-medium ml-2"
                            v-if="bike.busy_until">
                            Будет доступен с {{ formatDate(bike.busy_until) }}
                        </span>
                    </div>


                </div>



            </div>

        </div>
    </div>
    <div class="mb-20">
        <div class="container mx-auto  px-4 lg:px-5 ">
            <div class="flex flex-col gap-y-6 md:gap-y-10 items-center mx-auto justify-center max-w-170 ">
                <div
                    class="flex flex-col items-center justify-center md:items-start md:justify-start md:flex-row gap-x-10">
                    <div class="w-35 h-35 shrink-0">
                        <img src="~/assets/img/planet.svg" alt="Planet Icon">
                    </div>
                    <div class="flex flex-col items-center justify-center md:items-start md:justify-start gap-y-2">
                        <h4 class="text-3xl font-medium text-center md:text-left">Bike Rent Company</h4>
                        <p class="text-gray-400 text-sm text-center md:text-start">
                            Задача организации, в особенности же реализация намеченных плановых заданий играет важную
                            роль в
                            формировании модели развития. Задача организации, в особенности же рамки и место обучения
                            кадров
                            способствует подготовки и реализации направлений прогрессивного развития.
                        </p>
                    </div>
                </div>
                <button
                    class="max-w-125 w-full py-2 rounded-full border cursor-pointer group hover:bg-black transition-all duration-300"
                    @click="toggleDropdown">
                    <span class="text-lg font-semibold group-hover:text-white transition-all duration-300">
                        Написать
                    </span>
                </button>
            </div>
        </div>
    </div>
    <!-- <div class="mb-8 md:mb-25">
        <div class="container mx-auto px-4 lg:px-5">
            <h3 class="text-3xl font-medium mb-4">Рекомендуем</h3>
            <div
                class="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-10 xs:gap-y-6 gap-x-2.5 md:gap-x-5 lg:gap-x-10">
                <Item v-for="item in recomentItems" :key="item.id" :image="item.image" :icon="item.icon"
                    :status="item.status" :model="item.model" />
            </div>

        </div>
    </div> -->
    <div :class="{ 'fixed left-0 top-0 w-full h-full bg-black z-40 opacity-50 transition-all duration-300': dropdawn }"
        @click="dropdawn = false">

    </div>
    <Transition>
        <div class="fixed bg-white px-8 py-4 z-40  left-1/2 top-1/2 md:w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-card "
            v-if="dropdawn">
            <div class="flex flex-col md:flex-row gap-y-4 gap-x-8">
                <div
                    class="flex items-center gap-x-2.5 pb-4 md:pb-0 relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-5">
                    <span class="w-8 h-8 flex items-center justify-center">
                        <img class="w-5 h-8" src="~/assets/img/phone.svg" alt="Phone">
                    </span>
                    <a class="whitespace-nowrap" href="tel:+77477777777">+7 747 7777 777</a>
                </div>
                <div
                    class="flex items-center pb-4 md:pb-0 gap-x-2.5 relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-5">
                    <span class="w-8 h-8 flex items-center justify-center">
                        <img class="w-8 h-8" src="~/assets/img/telegram.svg" alt="Phone">
                    </span>
                    <a class="whitespace-nowrap" href="https://web.telegram.org/"
                        target="_blank">https://t.me/username</a>
                </div>
                <div class="flex items-center gap-x-2.5">
                    <span class="w-8 h-8 flex items-center justify-center">
                        <img class="w-8 h-8" src="~/assets/img/whatsapp.svg" alt="Phone">
                    </span>
                    <a class="whitespace-nowrap" href="https://www.whatsapp.com/" target="_blank">+7 747 7777 777</a>
                </div>
            </div>
        </div>
    </Transition>

</template>

<style scoped lang="css">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(50px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>