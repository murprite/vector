<template>
  <div>
    
  </div>
</template>

<script setup>

  definePageMeta({
      middleware: async () => {
        let userData = $fetch("api/login/admin", {
          method: "POST",
          body: {
            jwt: localStorage.getItem("jwt-luxflower")
          }
        })
        
        

        if(!userData.isLogged && userData.isAdmin) {          
          return navigateTo("/");
        } else {
          return;
        }
      }
  });

  function validateUserAuth() {
    const jwt = localStorage.getItem("luxflowers-jwt")


  } 

</script>

<style>

</style>