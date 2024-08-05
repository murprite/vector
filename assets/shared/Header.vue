<template>
  <header class=" text-black grid grid-cols-8 grid-rows-1 font-montserrat bg-black gap-[1px]">
    <Button>Магазин</Button>
    <Button>Контакты</Button>
    <div class="h-[80px] col-span-4"></div>
    <Button>Вход</Button>
    <Button>Корзина</Button>
  </header>
</template>
<style scoped>
  Header > * {
    background: white;
  }
</style>
<script setup>
    import Button from './Button.vue';
</script>