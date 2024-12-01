<template>
  <NuxtPage />
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

  html {
    scrollbar-width: none;
    overflow-x: hidden;
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.7s;
  }
  .page-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }
  .page-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>

<script>import 'primeicons/primeicons.css';</script>
