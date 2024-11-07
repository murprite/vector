<template>
    <main class="border border-black min-h-[80vh] text-center flex justify-center items-center flex-col bg-white">
        <Title class="text-gray-300 text-[2rem]">Данная страница пуста</Title>
        <Icon icon="mdi:smiley-sad" style="color: #d1d5db; font-size: 5.5rem" />
        <NuxtLink to="/" class="text-[1.5rem] text-gray-400">Вернуться на главную</NuxtLink>
    </main>
</template>

<script setup>
    import {Icon} from "@iconify/vue";
    import Title from './Title.vue';
</script>