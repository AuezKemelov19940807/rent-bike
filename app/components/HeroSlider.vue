<script setup lang="ts">
import hero1 from '~/assets/img/hero-1.png';
import hero2 from '~/assets/img/hero-2.png';
import hero3 from '~/assets/img/hero-3.png';

const containerRef = ref(null);
const hero = useSwiper(containerRef, {
    effect: 'fade',
    loop: true,
    slidesPerView: 1,

    speed: 2500,
    autoplay: {
        delay: 2500,

    },

    pagination: {
        el: '.hero-pagination',
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
        title: 'IMAGINE BEYOND'
    },
    {
        id: 2,
        image: hero2,
        title: 'EXPLORE THE WORLD'
    },
    {
        id: 3,
        image: hero3,
        title: 'RIDE WITH PASSION'
    }
])
</script>

<template>
    <div class="md:max-w-1/2 w-full aspect-[1/0.806]">
        <ClientOnly>
            <swiper-container class="h-full min-h-75" ref="containerRef" :init="false"
                autoplay-disable-on-interaction="false">
                <swiper-slide v-for="(slide, idx) in slides" :key="idx" class="relative h-full w-full">
                    <div>
                        <p class="absolute top-10 left-24 z-10 text-3xl text-white font-semibold">{{ slide.title
                            }}
                        </p>
                        <img class="absolute w-full h-full  top-0 left-0 object-cover" :src="slide.image"
                            alt="Hero Image">
                    </div>
                </swiper-slide>
                <div class="hero-pagination swiper-pagination absolute z-50 bottom-4 right-6 flex gap-x-2"></div>
            </swiper-container>
        </ClientOnly>
    </div>
</template>

<style scoped lang="css"></style>