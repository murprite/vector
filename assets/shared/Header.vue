<template>
  <header class=" text-black grid grid-cols-8 grid-rows-1 font-montserrat bg-black gap-[1px]">
    <button class="slider__mobile flex md:hidden items-center justify-center" @click="isMenuOpen = !isMenuOpen">
      <NuxtImg src="./nav-left.svg" width="32" height="32" />
    </button>
    <div class="col-span-2 hidden grid-cols-2 gap-[1px] !bg-black  md:grid">
      <Button class="bg-white" to="/">Магазин</Button>
      <Button class="bg-white" to="#footer">Контакты</Button>
    </div>
    <div class="h-[80px] col-span-6 md:col-span-4"></div>
    <div class="col-span-2 hidden grid-cols-2 gap-[1px] !bg-black md:grid">
      <Button class="bg-white">Вход</Button>
      <Button class="bg-white">Корзина</Button>
    </div>
    <button class="slider__mobile flex md:hidden items-center justify-center" @click="isProfileOpen = !isProfileOpen">
      <NuxtImg src="./nav-right.svg" width="32" height="32" />
    </button>
  </header>
  <Drawer position="left" v-model:visible="isMenuOpen" :showCloseIcon="false">
    <div class="Menu bg-white h-[100vh] border-black border-r-[1px] p-[5px] relative">
      <div class="footer__contact p-[40px] flex flex-col justify-center">
        <p class="text-gray-500 text-[18px] mb-[24px]">Контакты</p>
        <p class="text-gray-500">Адрес</p>
        <p class="mb-[24px]">15/4 Boulevard Street, New York</p>
        <p class="text-gray-500">Телефон</p>
        <p class="mb-[24px]">+380980099777</p>
        <p class="mb-[24px]">+380980099777</p>
        <p class="text-gray-500">Основная почта</p>
        <p class="mb-[24px]">luxflowers@gmail.com</p>
        <p class="text-gray-500">Подпишитесь на нас</p>
        <div class="py-[28px] absoulte bottom-[5px] flex justify-between">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
        </div>
      </div>
    </div>
  </Drawer>
  <Drawer position="right" v-model:visible="isProfileOpen" :showCloseIcon="false">
    <div class="Menu bg-white h-[100vh] border-black border-l-[1px] p-[20px]">
      <template v-if="user">
        <Title>{{ user.id }}</Title>
      </template>
      <template v-else>
        <div class="grid grid-cols-2 gap-[1px] bg-black text-[18px]">
          <Button class="bg-white">Вход</Button>
          <Button class="bg-white">Регистрация</Button>
        </div>
      </template>
    </div>
  </Drawer>
</template>
<style scoped>
  header > * {
    background: white;
  }

  html {
    scroll-behavior: smooth;
  }
</style>
<script setup>
    import Drawer from 'primevue/drawer';
    import Button from './Button.vue';
    import Title from './Title.vue';

    const isMenuOpen = ref(false);
    const isProfileOpen = ref(false);

</script>