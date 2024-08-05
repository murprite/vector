<template>
  <header class="border-black text-black grid grid-cols-8 grid-rows-1 font-montserrat">
    <div class="left-part col-span-2 flex">
        <Button class="border-r-0">Магазин</Button>
        <Button>Контакты</Button>
    </div>
    <div class="border-black border-b-[1px] h-[80px] col-span-4"></div>
    <div class="right-part flex col-span-2">
        <Button class="border-r-0">Вход</Button>
        <Button class="border-r-0">Корзина</Button>

    </div>
  </header>
</template>

<script setup>
    import Button from './Button.vue';
</script>