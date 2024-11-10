<template>
    <NuxtLink :to="'/products/' + id" class="text-center relative row-span-1">
        <div class="ProductCard w-full p-[24px] relative grid-rows-1 h-[360px] bg-no-repeat max-h-[400px] bg-cover flex flex-col justify-end text-center bg-red" :style="{ backgroundImage: `url(../.${cardImageUrl})`}">
            
        </div>
        <div class="absolute bottom-[15px] left-[50%] translate-x-[-50%]">
            <p class="text-black font-bold">{{  name  }}</p>
            <p class="text-gray-500">Цена {{  price  }} ₽</p>
        </div>
    </NuxtLink>    
</template>

<script setup>
    const props = defineProps(['product']);
    const { id, price, cardImageUrl, name, flowersType, images, description } = props.product;

    console.log(props)
</script>

<style scoped>
    .ProductCard {
         background-size: cover;
         background-position: center;
         background-repeat: no-repeat;
    }
</style>