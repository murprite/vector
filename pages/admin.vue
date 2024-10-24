<template>
  <div>
    
  </div>
</template>

<script setup>
  if(!validateUserAuth()) return navigateTo("/")
  async function validateUserAuth() {
    const jwt = localStorage.getItem("jwt-luxflowers")
    
    const response = await useFetch("/api/user/admin", {
      method: "POST",
      body: { jwt }
    });

    return response;
    
  } 

</script>

<style>

</style>