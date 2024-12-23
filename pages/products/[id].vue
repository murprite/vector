<script setup>

import Header from '~/assets/shared/Header.vue';
import Footer from '~/assets/shared/Footer.vue';
import Title from '~/assets/shared/Title.vue';

import Carousel from 'primevue/carousel';
import ProductCard from '~/assets/shared/ProductCard.vue';

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
product = product.value[0];

let recommendedProducts = await getRecommendedProducts();
let recommendedCards = await getRecommendationCards();


function getCategoryLink(flowersType) {
    switch(flowersType) {
        case 0:
            return ["Высушенные цветы", "/dried-flowers"];
        case 1:
            return ["Свежие цветы", "/fresh-flowers"];
        case 2:
            return ["Ароматические цветы", "/live-flowers"];
        case 3:
            return ["Вазы", "/dried-flowers"];
        case 4:
            return ["Свечи", "/candles"];
        case 5:
            return ["Освежители", "/refreshers"];
    }
}
function getRandomType() {
    return Math.floor(Math.random() * 7)
}
async function getRecommendedProducts() {
    let isVasesPage = product.flowersType === 3;
    let apiString = isVasesPage ? `/api/products?flowersType=${getRandomType()}` : `/api/products?flowersType=3`;

    let { data: recommended } = await useFetch(apiString);
    return recommended;
}

function updateCart() {
    if(!userChoice.value && quantity >= 1) {
        activateErrorPopup();
        return;
    }

    let userOptions = {
        choice: product,
        quantity: quantity.value,
    }
    let cart = useCookie("cart");
    let cartHasItem = false;
    if(cart.value === undefined) cart.value = [];
    
    cart.value.forEach(element => {
        if(element.choice.id === product.id) {
            cartHasItem = true;
            element.quantity += userOptions.quantity;
        }
        return;
    });
    if(!cartHasItem) cart.value.push(userOptions);
    console.log(cart.value);
}

async function getRecommendationCards() {
    return await $fetch("/api/products/random", {
        method: "GET"
    });
}

function changeQuantity(currentQuantity) {
    if(currentQuantity <= 1) {
        quantity.value = 1;
    }
    return;
}

let quantity = defineModel('quantity', {
    default: 1,
});
const userChoice = defineModel('userChoice', {
    default: '1',
    get(val) {
        return +val;
    }
});

</script>

<template>
    <div class="wrapper grid gap-[1px] bg-black bg-[url]">
        <title>{{ product.name }}</title>
        <Header />
            <main class="grid grid-cols-2 bg-black gap-[1px]">
                <div class="main__image h-[90vh] relative w-100 overflow-hidden">
                    <div class="main__image_bg absolute w-[120%] h-[120%]" :style="`background-image: url('../../${product.images}') !important`"></div>
                    <NuxtImg :src="product.images" :alt="product.name" class="w-auto"></NuxtImg>
                </div>
                <div class="main__info p-[40px] flex flex-col justify-between">
                    <div class="main__breadcrumbs uppercase">
                        <NuxtLink :to="getCategoryLink(product.flowersType)[1]">{{ getCategoryLink(product.flowersType)[0] }}</NuxtLink> / <span class="text-gray">{{ product.name }}</span>
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
                            <button @click="() => changeQuantity(--quantity)">-</button>
                            <input class="w-[50px]" type="number" v-model="quantity" @input="(val) => val.target.value = ++val.target.value">
                            <button @click="() => changeQuantity(++quantity)">+</button>
                        </div>
                    </div>
                    <div class="main__recommendation">
                        <div class="flex justify-between">
                            <span class="font-bold">Хорошо сочетается с:</span>
                            <span class="font-gray">Ваза не входит в комплеткт</span>
                        </div>
                        <div class="reviews__wrapper mt-[15px] flex w-full text-[24px]">
                            <Carousel :value="recommendedProducts" :numVisible="5" :numScroll="2">
                                    <template #item="slotProps">
                                        <NuxtLink :to="'/products/' + slotProps.data.id">
                                            <div class="border border-surface-200 dark:border-surface-700 rounded mx-1 h-[200px] w-[150px]">
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
                                <input type="radio" checked id="radioBuyOnce" name="userChoice" value="0" v-model="userChoice" class="mr-[30px]">
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
                <div class="main__recommendations grid col-span-2">
                    <div class="py-[80px] text-center text-[1.8rem] font-semibold border border-black border-t-0">
                        Вам также могут понравится...
                    </div>
                    <div class="main__recommendation_card flex justify-between gap-[1px]">
                        <ProductCard v-for="card in recommendedCards" :product="card"  class="w-full"/>
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
    input {
        outline: 0;
    }
    .main__image_bg {
        filter: blur(5px);
        background-size: cover;
        background-position: center;
        left: -5%;
        top: -5%;
        
    }
    .main__image img {
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
        z-index: 2;
    }
</style>