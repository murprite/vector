<template>
    <div class="ProductCard relative grid-rows-1">
        <NuxtImg :src="imageUrl" class="w-full"/>
        <NuxtLink :to="'/products/' + id">price {{ price }}</NuxtLink>    
    </div>
</template>

<script setup>
    const { price, id, imageUrl } = defineProps(['price', 'id', 'imageUrl']);
</script>