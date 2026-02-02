<script setup lang="ts">
import hero1 from '~/assets/img/hero-1.png';
import hero2 from '~/assets/img/hero-2.png';
import hero3 from '~/assets/img/hero-3.png';
import bikeIcon1 from "~/assets/img/bike-icon-1.svg";
import bikeIcon2 from "~/assets/img/bike-icon-2.svg";
import bikeIcon3 from "~/assets/img/bike-icon-3.svg";
import type { st } from 'vue-router/dist/router-CWoNjPRp.mjs';
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

const slides = ref([
    {
        id: 1,
        image: hero1,
        icon: bikeIcon1
    },
    {
        id: 2,
        image: hero2,
        icon: bikeIcon2
    },
    {
        id: 3,
        image: hero3,
        icon: bikeIcon3
    }
])


const details = [
    {
        id: 1,
        title: 'Марка',
        desc: 'Yamaha'
    },
    {
        id: 2,
        title: 'Модель',
        desc: 'MT - 07'
    },
    {
        id: 3,
        title: 'Год',
        desc: '2021'
    },
    {
        id: 4,
        title: 'Объем двигателя',
        desc: '1300 см³'
    },
    {
        id: 5,
        title: 'Тип байка',
        desc: 'Спортивный'
    },
    {
        id: 6,
        title: 'Коробка передач',
        desc: 'АКПП'
    },
    {
        id: 7,
        title: 'Категория прав',
        desc: 'A1'
    }
]

const timePeriods = [
    {
        id: 1,
        text: 'Сутки',
        price: '199'
    },
    {
        id: 1,
        text: 'Неделю',
        price: '299'
    },
    {
        id: 1,
        text: 'Месяц',
        price: '499'
    }
];

const activePeriod = ref<number>(0)
const activePrice = ref(timePeriods[0]?.price ?? '')
const changeActivePeriod = (index: number) => {
    activePeriod.value = index
    activePrice.value = timePeriods[index]?.price ?? ''
}

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
                                <p
                                    class="absolute top-4 md:top-10 left-4 md:left-24 z-10 text-3xl w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center  bg-white font-semibold">
                                    <img class="w-6 h-6 md:w-8 md:h-8" :src="slide.icon" alt="">
                                </p>
                                <img class="absolute w-full h-full  top-0 left-0 object-cover" :src="slide.image"
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
                    <span>
                        <img class="w-8 h-8" :src="bikeIcon1" alt="Brand Icon">
                    </span>
                    <h2 class="text-3xl font-medium">Yamaha MT - 07</h2>
                </div>

                <div class="mb-10">
                    <div class="flex flex-col gap-y-4">
                        <div class="grid grid-cols-2 gap-x-4" v-for="detailItem in details" :key="detailItem.id">
                            <span class="text-sm text-gray-400">{{ detailItem.title }}</span>
                            <span>{{ detailItem.desc }}</span>
                        </div>
                    </div>

                </div>
                <div class="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-y-4">
                    <div class="text-3xl font-medium flex gap-x-4">
                        <span>Цена</span>
                        <span>{{ activePrice }}$</span>
                    </div>
                    <div class="flex gap-x-2">
                        <span :class="{ 'bg-black text-white': activePeriod === index }"
                            class="border cursor-pointer transition-all select-none duration-300 inline-block px-4 py-2 rounded-full"
                            v-for="(period, index) in timePeriods" :key="period.id" @click="changeActivePeriod(index)">
                            {{ period.text }}
                        </span>
                    </div>

                    <div
                        class="text-3xl font-medium flex flex-col md:flex-row gap-y-4 items-center justify-center  md:items-start md:justify-start gap-x-4">
                        <span>Цена продажи</span>
                        <span>5699$</span>
                    </div>
                    <div class="flex flex-col md:flex-row items-center gap-y-1 gap-x-4 text-lg font-semibold">
                        <div class="text-lg flex gap-x-3.5 items-center font-semibold ">
                            <span>Статус</span>
                            <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                            <span>Занят</span>
                        </div>
                        <span class="bg-green-100 text-green-700 px-4 py-0.5 rounded-full text-sm font-medium ml-2">
                            Будет доступен с 11 февраля
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
    <div class="mb-8 md:mb-25">
        <div class="container mx-auto px-4 lg:px-5">
            <h3 class="text-3xl font-medium mb-4">Рекомендуем</h3>
            <div
                class="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-10 xs:gap-y-6 gap-x-2.5 md:gap-x-5 lg:gap-x-10">
                <Item v-for="item in recomentItems" :key="item.id" :image="item.image" :icon="item.icon"
                    :status="item.status" :model="item.model" />
            </div>

        </div>
    </div>
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