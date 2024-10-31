<template>
  <div class="bg-black">
    <Header></Header>
    <main class="grid grid-cols-2 bg-black gap-[1px] my-[1px] min-h-[80vh]">
      <template class="" v-if="status === 'success'">
        <div class="main__left p-[30px]">
          <Title>Добро пожаловать в личный кабинет, {{ currentUser.fullName }}!</Title>
          <div class="flex flex-col items-start">
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedItem = 'profile'">Настроить профиль</button>
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedItem = 'cart'">Посмотреть корзину</button>
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedItem = 'delete'">Удалить профиль</button>
          </div>
        </div>
        <div class="main__right p-[30px]">
          <div class="" v-if="selectedItem === 'profile'">
            <Title>Настройка профиля</Title>
          </div>
          <div class="" v-else-if="selectedItem === 'delete'">
            <Title class="mb-[15px]">Удаление профиля</Title>
            <p class="mb-[15px]">Вы уверены что вы хотите удалить профиль? <b>Действие является необратимым</b>. Если по какой-либо причине вам будет необходимо восстановить свой аккаунт, напишите на почту luxflowers@gmail.com</p>
            <p>Напишите <b>{{ currentUser.fullName }}</b> для удаления аккаунта в поле ввода</p>
            <input type="text" @input="(e) => userInput = e.target.value" class="my-[15px] border-gray-500 border outline-none w-full p-[15px]">

            <button class="w-full border border-black p-[15px] bg-red transition hover:bg-red-500 hover:border-red-500 hover:text-white" @click="() => deleteAccount(userInput)">Удалить свой аккаунт</button>
          </div>
          <div class="" v-else-if="selectedItem === 'cart'">
            <Title>Корзина</Title>
          </div>
          <div class="" v-else>Выберите нужную для вас опцию</div>
        </div>
      </template>
      <template v-else>
        <div class="bg-white font-[5rem]">
          <Title>404</Title>
        </div>
        <div class="bg-white"></div>
      </template>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
  import Footer from '~/assets/shared/Footer.vue';
  import Header from '~/assets/shared/Header.vue';
  import Title from '~/assets/shared/Title.vue';

  const selectedItem = ref("cart");
  const userInput = ref("");
  const cart = useCookie('cart');
  const userJwt = useCookie('luxflowers-jwt');

  if(userJwt.value.jwt === undefined || userJwt.value.jwt === null) {
    navigateTo("/");
  }

  let {data: currentUser, status} = await (useFetch('/api/user', {
    method: 'GET',
    params: {
      jwt: userJwt.value.jwt
    }
  }));

  async function deleteAccount(confirm) {
    if(confirm === currentUser.value.fullName) {
      const user = await $fetch('/api/userRemove', {
        method: 'POST',
        body: {
          jwt: currentUser.value.jwt
        }
      });

      console.log("deleting")

      cart.value = undefined;
      userJwt.value = undefined;
      navigateTo('/');
    }
    return;
  }

</script>

<style>
  main > * {
    background: white;
  }
</style>