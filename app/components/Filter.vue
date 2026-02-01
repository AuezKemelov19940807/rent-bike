<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

// filter volume range
const value = ref<[number, number]>([100, 400]);

// volume label
const volumeLabel = computed(() => {
    return `${value.value[0]} – ${value.value[1]}`
});

// categories
const categories: string[] = ['A', 'A1', 'M'];
// active category
const activeCategory = ref<typeof categories[number]>('A');


// statuses
const statuses: string[] = ['Свободен', 'Занят'];
// active status
const activeStatus = ref<typeof statuses[number]>('Свободен');


// transmissions
const transmissions: string[] = ['МКПП', 'АКПП', 'CVT'];
// active transmission
const activeTransmission = ref<typeof transmissions[number]>('МКПП');

const activeSection = ref<'main' | 'company' | 'brand' | 'model' | 'type'>('main');

const openSection = (section: 'main' | 'company' | 'model' | 'type' | 'brand') => {
    activeSection.value = section;
}

// companies
const selectedCompanies = ref<string[]>([]);

// toggle company
const toggleCompany = (name: string) => {
    if (selectedCompanies.value.includes(name)) {
        selectedCompanies.value = selectedCompanies.value.filter(c => c !== name);
    } else {
        selectedCompanies.value.push(name);
    }
}

// types
const selectedTypes = ref<string[]>([]);
// toggle type
const toggleType = (name: string) => {
    if (selectedTypes.value.includes(name)) {
        selectedTypes.value = selectedTypes.value.filter(c => c !== name);
    } else {
        selectedTypes.value.push(name);
    }
}

const selectedBrands = ref<string[]>([]);

const toggleBrand = (name: string) => {
    if (selectedBrands.value.includes(name)) {
        selectedBrands.value = selectedBrands.value.filter(b => b !== name);
    } else {
        selectedBrands.value.push(name);
    }
}

const selectedBrand = ref<typeof brands[number] | null>(null);

// выбранные модели
const selectedModels = ref<string[]>([]);

function openBrandSection() {
    activeSection.value = 'brand';
}

function openModelSection(brand: typeof brands[number]) {
    selectedBrand.value = brand;
    activeSection.value = 'model';
}

function toggleModel(name: string) {
    if (selectedModels.value.includes(name)) {
        selectedModels.value = selectedModels.value.filter(m => m !== name);
    } else {
        selectedModels.value.push(name);
    }
}

const filterWrapperRef = ref<HTMLElement | null>(null)
// filter button
const filterButton = ref<boolean>(false);
// toggle filter button
const toggleFilterButton = () => {
    filterButton.value = !filterButton.value;
}


onClickOutside(filterWrapperRef, () => {
    filterButton.value = false
})



</script>

<template>
    <div class="relative" ref="filterWrapperRef">

        <!-- button -->
        <FilterBtn @click="toggleFilterButton" />

        <!-- filter menu -->
        <Transition>
            <div class="fixed overflow-y-auto md:absolute md:mt-10 py-4 bg-white px-4 md:px-6 h-full md:h-auto top-0 z-50 right-0  md:shadow-card md:rounded-lg w-full md:max-w-293 min-h-91.5 flex flex-col"
                v-if="filterButton">
                <div class="flex-1" v-if="activeSection === 'main'">
                    <div class=" flex mb-4 items-center justify-between md:hidden" @click="toggleFilterButton">
                        <p class="text-2xl font-semibold">Фильтр</p>
                        <span>
                            <img src="~/assets/img/close.svg" alt="Close Icon">
                        </span>
                    </div>
                    <div class="flex flex-col gap-y-6">
                        <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                            <!-- Company && category && range  -->
                            <div class="relative">
                                <div
                                    class="flex pb-4 md:pb-0 md:h-12.5 cursor-pointer  justify-between items-center relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
                                    <div class="flex w-full items-center justify-between gap-x-4"
                                        @click="openSection('company')">
                                        <span class="text-lg">
                                            <template v-if="selectedCompanies.length">
                                                <p class="text-sm text-gray-500 md:hidden">Компания</p>
                                                {{ selectedCompanies.slice(0, 2).join(', ') }}
                                                <span v-if="selectedCompanies.length > 2" class="text-sm text-gray-500">
                                                    , +{{ selectedCompanies.length - 2 }} ещё
                                                </span>
                                            </template>
                                            <template v-else>
                                                Компания
                                            </template>
                                        </span>
                                        <span class="shrink-0" v-if="selectedCompanies.length"
                                            @click.stop="selectedCompanies.length = 0">
                                            <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon">
                                        </span>
                                        <span v-else @click="openSection('company')"
                                            class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain">
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <!-- Brand && status && year -->
                            <div class="relative">
                                <div
                                    class="flex pb-4 md:pb-0 md:h-12.5  justify-between items-center relative after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0 md:after:h-full after:bg-gray after:absolute md:after:-right-2.5">
                                    <div class="flex w-full items-center justify-between gap-x-4  cursor-pointer"
                                        @click="openSection('brand')">
                                        <span class="text-lg">
                                            <p class="text-sm text-gray-500 md:hidden">Марка, модель</p>

                                            <template v-if="selectedBrands.length || selectedModels.length">
                                                <template
                                                    v-for="(item, index) in [...selectedBrands, ...selectedModels].slice(0, 2)"
                                                    :key="index">
                                                    {{ item }}
                                                    <span
                                                        v-if="index === 0 && [...selectedBrands, ...selectedModels].length > 1">,
                                                    </span>
                                                </template>

                                                <span v-if="[...selectedBrands, ...selectedModels].length > 2"
                                                    class="text-sm text-gray-500">
                                                    , +{{ [...selectedBrands, ...selectedModels].length - 2 }} ещё
                                                </span>
                                            </template>

                                            <template v-else>
                                                Марка, модель
                                            </template>
                                        </span>


                                        <span v-if="selectedBrands.length || selectedModels.length" class="shrink-0"
                                            @click.stop="
                                                selectedBrands.length = 0;
                                            selectedModels.length = 0;
                                            ">
                                            <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon" />
                                        </span>


                                        <span v-else @click="openSection('brand')"
                                            class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain" />
                                        </span>
                                    </div>

                                </div>

                            </div>
                            <!-- Type && transmissions && price -->
                            <div class="relative">
                                <div
                                    class="flex pb-4 md:pb-0 md:h-12.5  justify-between items-center cursor-pointer after:w-full md:after:w-0.5  after:h-0.5 after:bottom-0  after:absolute after:bg-gray  ">
                                    <div class="flex w-full items-center gap-x-4 justify-between"
                                        @click="openSection('type')">
                                        <span class="text-lg">
                                            <p class="text-sm text-gray-500 md:hidden">Тип байка</p>
                                            <template v-if="selectedTypes.length">
                                                {{ selectedTypes.slice(0, 2).join(', ') }}
                                                <span v-if="selectedTypes.length > 2" class="text-sm text-gray-500">
                                                    , +{{ selectedTypes.length - 2 }} ещё
                                                </span>
                                            </template>
                                            <template v-else>
                                                Тип байка
                                            </template>
                                        </span>
                                        <span class="shrink-0" v-if="selectedTypes.length"
                                            @click.stop="selectedTypes.length = 0">
                                            <img src="~/assets/img/close-filter.svg" alt="Close Filter Icon">
                                        </span>
                                        <span v-else @click="openSection('type')"
                                            class=" -rotate-90 w-3 h-4 flex items-center justify-center shrink-0">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain">
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                            <LabeledSegmentedControl LabeledSegmentedControl label="Категория прав"
                                v-model="activeCategory" :options="categories" width-class="w-1/3" />
                            <labeled-segmented-control label="Статус" v-model="activeStatus" :options="statuses"
                                width-class="w-1/2" />
                            <labeled-segmented-control label="Коробка передач" v-model="activeTransmission"
                                :options="transmissions" width-class="w-1/3" />
                        </div>
                        <div class="grid md:grid-cols-3 gap-y-6 gap-x-6">
                            <div class="flex flex-col gap-y-6">
                                <!-- category -->

                                <div>
                                    <span class="text-lg mb-2 inline-block">Объем двигателя</span>
                                    <div class="flex flex-col items-center justify-center">

                                        <span class="text-3xl font-semibold">
                                            {{ volumeLabel }} см³
                                        </span>
                                        <!-- label -->
                                        <!-- range -->
                                        <USlider class="mt-10" :min="50" :max="1200" :step="25" v-model="value" />
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col gap-y-6">

                                <div class="">
                                    <span class="text-lg mb-2 inline-block">Год выпуска</span>
                                    <div
                                        class="mt-2 relative border border-gray rounded-full h-12 flex overflow-hidden">
                                        <input type="number" placeholder="От"
                                            class="w-1/2 h-full px-4 rounded-l-full outline-none" />
                                        <div class="w-0.5 h-full bg-gray"></div>
                                        <input type="number" placeholder="До"
                                            class="w-1/2 h-full px-4 rounded-r-full outline-none" />

                                    </div>
                                </div>
                            </div>
                            <div class="  flex flex-col gap-y-6">

                                <div class="">
                                    <span class="text-lg mb-2 inline-block">Цена</span>
                                    <div
                                        class="mt-2 relative border border-gray rounded-full h-12 flex overflow-hidden">
                                        <input type="number" placeholder="От"
                                            class="w-1/2 h-full px-4 rounded-l-full outline-none" />
                                        <div class="w-0.5 h-full bg-gray"></div>
                                        <input type="number" placeholder="До"
                                            class="w-1/2 h-full px-4 rounded-r-full outline-none" />

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <FilterBtnView class="" text="Показать" @click="filterButton = false" />
                </div>
                <!-- componies selection-->
                <div class="flex flex-col flex-1" v-if="activeSection === 'company'">
                    <div class="flex-1">
                        <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0"
                            @click="activeSection = 'main'">
                            <h2 class="text-2xl text-center font-semibold mb-2">Компания</h2>

                            <span class="md:hidden">
                                <img src="~/assets/img/close.svg" alt="Close Icon">
                            </span>
                        </div>

                        <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                            <div v-for="company in companies" :key="company.id">
                                <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                    @click="toggleCompany(company.name)">
                                    <span class="text-lg"> {{ company.name }} </span>
                                    <span
                                        class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                        :class="selectedCompanies.includes(company.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                        <img v-if="selectedCompanies.includes(company.name)"
                                            src="~/assets/img/check.svg" alt="Check Icon" class="">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FilterBtnView text="Готово" @click="activeSection = 'main'" />
                </div>
                <!-- types selection -->
                <div class="flex-1 flex flex-col" v-if="activeSection === 'type'">
                    <div class="flex-1">
                        <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0"
                            @click="activeSection = 'main'">
                            <h2 class="text-2xl text-center font-semibold mb-2">Тип байка</h2>

                            <span class="md:hidden">
                                <img src="~/assets/img/close.svg" alt="Close Icon">
                            </span>
                        </div>
                        <div class="grid md:grid-cols-3 gap-x-8 gap-y-4  companies-grid">
                            <div v-for="type in types" :key="type.id">
                                <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                    @click="toggleType(type.name)">
                                    <span class="text-lg"> {{ type.name }} </span>
                                    <span
                                        class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                        :class="selectedTypes.includes(type.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                        <img v-if="selectedTypes.includes(type.name)" src="~/assets/img/check.svg"
                                            alt="Check Icon" class="">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FilterBtnView class="" text="Готово" @click="activeSection = 'main'" />
                </div>
                <!-- brand -->
                <!-- brand selection -->
                <div class="flex-1 flex-col flex" v-if="activeSection === 'brand'">
                    <div class="flex-1">
                        <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0"
                            @click="activeSection = 'main'">
                            <h2 class="text-2xl text-center font-semibold mb-2">Марка</h2>

                            <span class="md:hidden">
                                <img src="~/assets/img/close.svg" alt="Close Icon">
                            </span>
                        </div>
                        <div class="grid md:grid-cols-3 gap-x-8 gap-y-4 companies-grid">
                            <div v-for="brand in brands" :key="brand.id">
                                <div class="flex items-center justify-between cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]"
                                    @click="toggleBrand(brand.name)">
                                    <div class="flex items-center gap-x-2">
                                        <span
                                            class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                            :class="selectedBrands.includes(brand.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                            <img v-if="selectedBrands.includes(brand.name)" src="~/assets/img/check.svg"
                                                alt="Check Icon" class="">
                                        </span>
                                        <span class="text-lg">{{ brand.name }}</span>
                                    </div>
                                    <div class="w-6 h-6 flex items-center justify-center">
                                        <span class="-rotate-90 w-3 h-4 flex items-center justify-center shrink-0"
                                            @click.stop="openModelSection(brand)">
                                            <img src="~/assets/img/arrow-bottom.svg" alt="Arrow"
                                                class="w-full h-full object-contain" />
                                        </span>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <FilterBtnView text="Готово" @click="activeSection = 'main'" />
                </div>

                <!-- Model selection -->
                <div class="flex-1 flex flex-col" v-if="activeSection === 'model' && selectedBrand">
                    <div class="flex-1 h-full ">
                        <div class="flex items-center justify-between md:justify-center mb-4 md:mb-0"
                            @click="activeSection = 'brand'">
                            <h2 class="text-2xl text-center font-semibold mb-2">Модели {{ selectedBrand.name }}</h2>

                            <span class="md:hidden">
                                <img src="~/assets/img/close.svg" alt="Close Icon">
                            </span>
                        </div>
                        <div class="grid md:grid-cols-3 gap-x-8 gap-y-4 companies-grid">
                            <div v-for="model in selectedBrand.models" :key="model.id"
                                class="cursor-pointer pb-4 md:pb-0 border-b md:border-none border-[#d1d5db]">
                                <div class="flex items-center justify-between" @click="toggleModel(model.name)">
                                    <div class="flex items-center gap-x-2">
                                        <img :src="model.icon" :alt="model.name" class="w-5 h-5 object-contain" />
                                        <span class="text-base">{{ model.name }}</span>
                                    </div>
                                    <span
                                        class="w-6 h-6 shrink-0 flex items-center justify-center bg-black border border-[#CACACA] rounded-lg"
                                        :class="selectedModels.includes(model.name) ? 'bg-black border-black' : 'bg-white border-[#CACACA]'">
                                        <img v-if="selectedModels.includes(model.name)" src="~/assets/img/check.svg"
                                            alt="Check Icon" class="">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FilterBtnView class="" text="Готово" @click="activeSection = 'main'" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="css">
@media(min-width:768px) {
    .companies-grid {
        position: relative;
    }


    .companies-grid::before,
    .companies-grid::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #d1d5db;
        /* Tailwind gray-300 */
    }

    .companies-grid::before {
        left: calc(100% / 3 - 4px);

    }

    .companies-grid::after {
        left: calc(100% / 3 * 2 + 4px);

    }
}




.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>