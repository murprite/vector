<template>
    
    <div class="PostElement flex flex-col items-stretch border border-black bg-white p-[50px] justify-start">
        <NuxtLink :to="'/posts/' + id" class="mb-[15px]">
            <Title class="text-[2.2rem]">{{ title }}</Title>
        </NuxtLink>
        <hr>
        <NuxtImg :src="mainImageUrl" class="my-[15px] max-h-[300px] max-w-[50vw] PostElement__img relative" />
        <hr>
        <p class="text-[1.2rem]">{{ annotation }}</p>   
        <div class="flex justify-between my-[15px]">
            <p class="text-gray-500 text-right">Статья написана {{ createdAt }}</p>
        </div>
        <NuxtLink :to="'/posts/' + id" class="mb-[15px]">
            <button class="w-[200px] text-center border mt-[15px] hover:bg-black transition p-[15px] hover:text-white">Читать</button>
        </NuxtLink>
    </div>

</template>

<script setup>
    import Title from './Title.vue';

    const { post } = defineProps(['post']);
    const {id, title, annotation, mainImageUrl, createdAt} = post;


</script>

<style scoped>
    .PostElement__img::before {
        background: red;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(360deg, red 0%, rgba(255,255,255,0) 100%);
    }
</style>