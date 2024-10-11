<template>
    <NuxtLink :to="'/products/' + id">
        <div class="ProductCard p-[24px] relative grid-rows-1 h-[360px] w-[100%] flex flex-col justify-end text-center bg-red" :style="{ backgroundImage: `url(${cardImageUrl})`}">
            <p class="text-black font-bold">{{  name  }}</p>
            <p class="text-gray-500">price {{  price  }}$</p>
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
         background-size: "cover";
         background-position: center;
         background-repeat: "no-repeat";
    }
</style>