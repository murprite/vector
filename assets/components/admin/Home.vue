<template>
  <p>Основная страница</p>
  <b class="text-2xl">Добро пожаловать, {{ user.fullName ? user.fullName : 'снова' }}</b>
  <div class="home__stats">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const { user } = defineProps(['user']);


</script>

<style>

</style>