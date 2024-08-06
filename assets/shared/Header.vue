<template>
  <header class=" text-black grid grid-cols-8 grid-rows-1 font-montserrat bg-black gap-[1px]">
    <button class="slider__mobile flex md:hidden items-center justify-center" @click="isMenuOpen = !isMenuOpen">
      <NuxtImg src="./nav-left.svg" width="32" height="32" />
    </button>
    <div class="col-span-2 hidden grid-cols-2 gap-[1px] !bg-black  md:grid">
      <Button class="bg-white">Магазин</Button>
      <Button class="bg-white">Контакты</Button>
    </div>
    <div class="h-[80px] col-span-6 md:col-span-4"></div>
    <div class="col-span-2 hidden grid-cols-2 gap-[1px] !bg-black md:grid">
      <Button class="bg-white">Вход</Button>
      <Button class="bg-white">Корзина</Button>
    </div>
    <button class="slider__mobile flex md:hidden items-center justify-center">
      <NuxtImg src="./nav-right.svg" width="32" height="32" />
    </button>
  </header>
  <Drawer position="left" v-model:visible="isMenuOpen" :showCloseIcon="false">
    <div class="Menu bg-white h-[100vh] border-black border-r-[1px] p-[20px]">
      <Title>Penis</Title>
    </div>
  </Drawer>
</template>
<style scoped>
  header > * {
    background: white;
  }
</style>
<script setup>
    import Drawer from 'primevue/drawer';
    import Button from './Button.vue';
    import Title from './Title.vue';

    const isMenuOpen = ref(false);
</script>