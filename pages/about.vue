<template>
  <Header></Header>
  <main class="border border-black border-l-0 border-r-0 grid gap-[1px] bg-black">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="main__story text-center flex flex-col items-center justify-center">
        <Title class="text-[2rem]">Наша история</Title>
        <p class="text-[1.8rem] my-[24px] font-caveat font-semibold">О нас</p>
        <Title class="text-[2rem]">Люксовые цветы</Title>
        <p class="mt-[24px] mb-[64px] max-w-[500px]">Открой для себя уникальные букеты и подарки для любого повода: порадуй всех с <i>нашей онлайн доставкой</i></p>
        <nav class="w-full">
          <ul class="flex justify-center gap-[45px]">
            <li><a class="border rounded-full block p-[7px] border-black" href=""><Icon icon="lets-icons:insta-light" class="text-[1.5rem]"/></a></li>
            <li><a class="border rounded-full block p-[7px] border-black" href=""><Icon icon="mdi:pinterest" class="text-[1.5rem]" /></a></li>
            <li><a class="border rounded-full block p-[7px] border-black" href=""><Icon icon="mage:facebook" class="text-[1.5rem]" /></a></li>
            <li><a class="border rounded-full block p-[7px] border-black" href=""><Icon icon="mdi:twitter" class="text-[1.5rem]" /></a></li>
            <li><a class="border rounded-full block p-[7px] border-black" href=""><Icon icon="lineicons:telegram" class="text-[1.5rem]" /></a></li>
          </ul>
        </nav>
      </div>
      <div class="main__image">
        <NuxtImg src="/about-1.png" class="w-full" />
      </div>
    </div>
    <div class="py-[80px] flex flex-col items-center justify-center text-center">
      <Title>Наша история</Title>
      <Title class="text-[2rem] my-[24px]">О нас</Title>
      <p class="max-w-[900px] text-[1.3rem] bg-white">Компания была основана в 2010 году с целью подарить киевлянам уникальные и изысканные букеты. У нас всегда была страсть к цветам и дизайну, и нашей мечтой было создать местную цветочную студию, которая специализировалась бы на создании и доставке свежих, красивых и самобытных букетов.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-black ">
      <div class="">
        <NuxtImg src="/about-2.png" class="w-full" />
      </div>
      <div class="p-[80px] bg-white">
        <Title class="text-[2rem]">Цветы высокого качества</Title>
        <p class="text-[1.3rem] mt-[24px]">В нашей компании мы гордимся командой талантливых и опытных флористов, которые тщательно отбирают каждый цветок, гарантируя, что в наши букеты попадут только самые свежие и потрясающие цветы. Мы работаем напрямую с фермами, чтобы поставлять цветы высочайшего качества, а наши опытные флористы мастерски доводят каждый букет до совершенства.</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-black ">
      <div class="p-[80px] bg-white">
        <Title class="text-[2rem]">Букеты и подарки</Title>
        <p class="text-[1.3rem] mt-[24px]">В дополнение к нашим потрясающим букетам мы также предлагаем коллекцию засушенных букетов, домашних растений и ароматных свечей от люксовых брендов для создания идеальной атмосферы. Мы считаем, что доставка цветов, растений и подарков должна быть простой и комфортной, поэтому мы предлагаем доставку в тот же или на следующий день по всему городу.</p>
      </div>
      <div class="">
        <NuxtImg src="/about-3.png" class="w-full" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-black ">
      <div class="">
        <NuxtImg src="/about-4.png" class="w-full" />
      </div>
      <div class="p-[80px] bg-white">
        <Title class="text-[2rem]">Делаем каждый день незабываемым</Title>
        <p class="text-[1.3rem] mt-[24px]">Наша миссия проста: сделать каждый день особенным и запоминающимся для наших клиентов. Мы стремимся предоставить цветы высочайшего качества, исключительное обслуживание клиентов и бесперебойную работу в Интернете, которая позволит вам чувствовать себя уверенно и удовлетворенно своей покупкой. Спасибо, что выбрали нашу компанию. Мы с нетерпением ждем возможности принести радость и счастье в вашу жизнь с помощью наших красивых букетов и подарков.</p>
        
      </div>
    </div>
    <div class="py-[80px] flex flex-col items-center justify-center text-center ">
      <Title class="text-[3rem] my-[24px]">Откройте наши потрясающие проекты</Title>
      <p class="max-w-[900px] text-[1.3rem] bg-white mb-[25px]">Ознакомьтесь с нашей коллекцией изысканных букетов и удивите своих близких идеальным подарком. Нажмите кнопку ниже, чтобы начать покупки</p>
      <NuxtLink to="/" class="max-w-[500px] w-full"><button class="w-full border border-black p-[15px]  bg-red transition hover:bg-black hover:text-white">За покупками</button></NuxtLink>
    </div>
  </main>
  <Footer></Footer>
</template>

<script lang="ts" setup>
  import Footer from '~/assets/shared/Footer.vue';
  import Header from '~/assets/shared/Header.vue';
  import Title from '~/assets/shared/Title.vue';
  import { Icon } from '@iconify/vue/dist/iconify.js';
  
</script>

<style scoped>
  
</style>