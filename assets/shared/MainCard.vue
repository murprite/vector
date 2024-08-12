<template>
  <div class="grid grid-cols-2 columns-2 gap-[1px] bg-black">
    <Card v-if="isInverted" class="bg-white" :text :isInverted :url />
    <NuxtImg :src="cardUrl" class="col-span-1 w-full"/>
    <Card v-if="!isInverted" class="col-span-1 bg-white" :text :isInverted :url />
  </div>
</template>

<script setup>
    import Card from './Card.vue';
    
    const props = defineProps(['inverted', 'text', 'cardUrl', 'url'])
    
    const isInverted = props.inverted;
    const text = props.text;
    const cardUrl = props.cardUrl;
    const url = props.url;
</script>