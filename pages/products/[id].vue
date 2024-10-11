<script setup>

import Header from '~/assets/shared/Header.vue';
import Footer from '~/assets/shared/Footer.vue';
import Title from '~/assets/shared/Title.vue';

import Carousel from 'primevue/carousel';

const route = useRoute()
const id = route.params.id;

definePageMeta({
    middleware: async (route) => {
        return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
    }
});

let { data: product } = await useFetch(`/api/products?id=${id}`, {
    method: "GET",
});

// TODO: add to database category column and refactor... a lot
product = product.value[0];
product.category = "Свежие цветы";

let recommendedProducts = await getRecommendedProducts();


function getCategoryLink(category) {
    switch(category) {
        case "Свежие цветы":
            return "/fresh-flowers";
        case "Высушенные цветы":
            return "/fresh-flowers";
        case "Живые цветы":
            return "/fresh-flowers";

    }
}
function getRandomType() {
    return Math.floor(Math.random() * 7)
}
async function getRecommendedProducts() {
    let isVasesPage = product.flowersType === 3;
    let apiString = isVasesPage ? `/api/products?flowersType=${getRandomType()}` : `/api/products?flowersType=3`;

    let { data: recommended } = await useFetch(apiString);
    return await recommended;
}

function updateCart() {
    if(!userChoice.value) {
        activateErrorPopup();
        return;
    }
    let userOptions = {
        choice: userChoice.value,
        quantity: quantity.value,
    }

    console.log(userOptions)

}

const quantity = defineModel({default: 1});
const userChoice = defineModel('userChoice');

</script>

<template>
    <title>{{ product.name + userChoice }}</title>
    <div class="wrapper grid gap-[1px] bg-black">
        <Header />
            <main class="grid grid-cols-2 bg-black gap-[1px]">
                <div class="main__image w-100">
                    <NuxtImg :src="product.images" :alt="product.name" class="w-[100%]"></NuxtImg>
                </div>
                <div class="main__info p-[40px] flex flex-col justify-between">
                    <div class="main__breadcrumbs uppercase">
                        <NuxtLink :to="getCategoryLink(product.category)">{{ product.category }}</NuxtLink> / <span class="text-gray">{{ product.name }}</span>
                    </div>
                    <div class="main__title">
                        <Title class="text-[2rem] my-[5px]">{{ product.name }} - {{ product.price }}₽</Title>
                    </div>
                    <div class="main__desc">
                        {{ product.description }}
                    </div>
                    <div class="main__quantity flex items-center">
                        <span class="font-bold mr-[15px]">Количество</span>
                        <div class="quantityController flex items-center my-[15px]">
                            <button @click="() => quantity > 0 ? quantity-- : quantity">-</button>
                            <input class="w-[50px]" type="number" v-model="quantity">
                            <button @click="() => quantity++">+</button>
                        </div>
                    </div>
                    <div class="main__recommendation">
                        <div class="flex justify-between">
                            <span class="font-bold">Хорошо сочетается с:</span>
                            <span class="font-gray">Ваза не входит в комплеткт</span>
                        </div>
                        <div class="reviews__wrapper mt-[15px] flex text-[24px]">
                            <Carousel :value="recommendedProducts" :numVisible="5" :numScroll="2">
                                    <template #item="slotProps">
                                        <NuxtLink :to="'/products/' + slotProps.data.id">
                                            <div class="border border-surface-200 dark:border-surface-700 rounded mx-1">
                                                <div class="mb-4">
                                                    <div class="relative mx-auto">
                                                        <NuxtImg :src="'/' + slotProps.data.cardImageUrl" :alt="slotProps.data.name" class="rounded" />
                                                    </div>
                                                </div>
                                                <div class="m-2">
                                                    <div class="mb-4 text-[1rem]">{{ slotProps.data.name }}</div>
                                                    <div class="flex justify-start mr-[10px] mb-[10px] font-gray">
                                                        <div class="mt-0 font-semibold text-[.9rem]">{{ slotProps.data.price }} ₽</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </NuxtLink>
                                    </template>
                            </Carousel>       
                        </div>
                    </div>
                    <div class="main__options">
                        <b>Дополнительные опции</b>
                        <form class="my-[10px]">
                            <div class="">
                                <input type="radio" id="radioBuyOnce" name="userChoice" value="0" v-model="userChoice" class="mr-[30px]">
                                <label for="radioBuyOnce">Единовременная покупка</label>
                            </div>

                            <div class="">
                                <input type="radio" id="radioSubscription" name="userChoice" value="1" v-model="userChoice" class="mr-[30px]">
                                <label for="radioSubscription">Подпишитесь сейчас и получите скидку 25%</label>
                            </div>
                        </form>
                    </div>
                    <div class="main__order">
                        <button @click="() => updateCart()" class="w-[100%] bg-black text-white py-[20px] ">Добавить в корзину</button>
                    </div>
                </div>
            </main>
            <Footer />
    </div>
</template>

<style scoped>
    main > * {
        background: white;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        
    }
    .quantityController input {
        outline: 0;
        text-align: center;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        height: 45px;
    }
    .quantityController button{
        border: 1px solid black;
        width: 45px;
        height: 45px;
        outline: 0;
        font-size: 1rem;
    }
</style>