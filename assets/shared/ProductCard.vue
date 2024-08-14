<template>
    <NuxtLink :to="'/products/' + id">
        <div class="ProductCard p-[24px] relative grid-rows-1 h-[360px] flex flex-col justify-end text-center" :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: `cover`, backgroundRepeat: 'no-repeat'}">
            <p class="text-black font-bold">{{  text  }}</p>
            <p class="text-gray-500">price {{  price  }}$</p>
        </div>
    </NuxtLink>    
</template>

<script setup>
    const { price, id, imageUrl, text } = defineProps(['price', 'id', 'imageUrl', 'text']);
</script>