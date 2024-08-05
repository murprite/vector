<template>
    <div class="card text-center flex flex-col justify-center items-center relative">
        <h3 class="text-[38px]">{{ text }}</h3>
        <a href="#" class="align-bottom flex items-center gap-3 absolute bottom-[25px]">
            <svg v-show="isInverted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"/></svg>
            Закупиться сейчас   
            <svg v-show="!isInverted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg>
        </a>
    </div>
</template>

<script setup>
    const props = defineProps(['isInverted', 'text']);

    const isInverted = props.isInverted;
    const text = props.text;
</script>