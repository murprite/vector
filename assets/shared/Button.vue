

<template>
  <NuxtLink class="flex-1 justify-center items-center text-center" :to=url>
    <button class="h-full align-middle"><slot></slot></button>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps(['to'])

  let url = props.to
</script>
