<template>
  <title>Личный профиль</title>
  <div class="bg-black">
    <Header></Header>
    <main class="grid grid-cols-2 bg-black gap-[1px] my-[1px] min-h-[80vh]">
      <template class="" v-if="status === 'success'">
        <div class="main__left p-[30px]">
          <Title>Добро пожаловать в личный кабинет, {{ currentUser.login }}!</Title>
          <div class="flex flex-col items-start">
            <button class="w-full text-left border mt-[15px] hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedItem = 'profile'">Настроить профиль</button>
            <button class="w-full text-left border my-[15px] hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedItem = 'cart'">Посмотреть корзину</button>
            <button class="w-full text-left border mb-[15px] hover:bg-black transition p-[15px] hover:text-white" @click="() => exitProfile()">Выйти из профиля</button>
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedItem = 'delete'">Удалить профиль</button>
          </div>
        </div>
        <div class="main__right p-[30px]">
          <div class="" v-if="selectedItem === 'profile'">
            <Title>Настройка профиля</Title>
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedCategory = 'email'">Изменить почту</button>
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedCategory = 'pass'">Изменить пароль</button>
            <button class="w-full text-left hover:bg-black transition p-[15px] hover:text-white" @click="() => selectedCategory = 'name'">Изменить имя</button>
            <hr class="my-[15px]">
            <div class="">
              <div class="flex flex-col" v-if="selectedCategory === 'pass'">
                <div class="flex flex-col">
                  <label for="changePassOld" class="mb-[10px]"><b>Введите старый пароль</b></label>
                  <input type="password" id="changePassOld" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <div class="flex flex-col my-[15px]">
                  <label for="changePassNew " class="mb-[10px]"><b>Введите новый пароль</b></label>
                  <input type="password" id="changePassNew" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <div class="flex flex-col">
                  <label for="changePassNewRepeat" class="mb-[10px]"><b>Повторите новый пароль</b></label>
                  <input type="password" id='changePassNewRepeat' class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <p class="text-[1.1rem] mt-[15px]">Если вы забыли свой старый пароль, напишите нам на почту <b>luxflowers@gmail.com</b></p>
              </div>
              <div class="" v-else-if="selectedCategory === 'email'">
                <div class="flex flex-col">
                  <label for="changeEmailOld" class="mb-[10px]"><b>Введите текущую почту</b></label>
                  <input type="email" id="changeEmailOld" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <div class="flex flex-col my-[15px]">
                  <label for="changeEmail" class="mb-[10px]"><b>Введите новую почту</b></label>
                  <input type="email" id="changeEmail" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <p class="text-[1.1rem] mt-[15px]">На указанную вами почту придёт код, с помощью которого вы можете изменить свою почту. В случае потери доступа к вашей почте, напишите нам на почту <b>luxflowers@gmail.com</b></p>
              </div>
              <div class="" v-else-if="selectedCategory === 'name'">
                <p>Вы можете указать своё собственное имя, которое будет отображаться публично и в вашем профиле. Также вы можете поменять свой логин, по которому вы можете зайти в свой личный кабинет</p>
                <div class="flex flex-col mt-[15px]">
                  <p class="mb-[15px]">Ваше текущее имя: {{ currentUser.name === undefined ? currentUser.login : currentUser.name }}</p>
                  <label for="changeName" class="mb-[10px]"><b>Введите своё новое имя</b></label>
                  <input type="text" id="changeName" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <div class="flex flex-col my-[15px]">
                  <label for="currentPass" class="mb-[10px]"><b>Введите пароль</b></label>
                  <input type="password" id="currentPass" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <hr>
                <div class="flex flex-col mt-[15px]">
                  <label for="changeLogin" class="mb-[10px]"><b>Введите свой новый логин</b></label>
                  <input type="text" id="changeLogin" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <div class="flex flex-col my-[15px]">
                  <label for="currentPass" class="mb-[10px]"><b>Введите пароль</b></label>
                  <input type="password" id="currentPass" class="outline-none border-gray-400 border p-[15px]" placeholder="">
                </div>
                <button class="w-full text-center hover:bg-black transition p-[15px] hover:text-white border" @click="() => selectedCategory = 'pass'"><b>Применить</b></button>

              </div>
            </div>
          </div>
          <div class="" v-else-if="selectedItem === 'delete'">
            <Title class="mb-[15px]">Удаление профиля</Title>
            <p class="mb-[15px]">Вы уверены что вы хотите удалить профиль? <b>Действие является необратимым</b>. Если по какой-либо причине вам будет необходимо восстановить свой аккаунт, напишите на почту luxflowers@gmail.com</p>
            <p>Напишите <b>{{ currentUser.login }}</b> для удаления аккаунта в поле ввода</p>
            <input type="text" @input="(e) => userInput = e.target.value" class="my-[15px] border-gray-500 border outline-none w-full p-[15px]">
            <button class="w-full border border-black p-[15px] bg-red transition hover:bg-red-500 hover:border-red-500 hover:text-white" @click="() => deleteAccount(userInput)">Удалить свой аккаунт</button>
          </div>
          <div class="" v-else-if="selectedItem === 'cart'">
           <ClientOnly >
            <Title>Корзина</Title>
            <div class="text-center" v-if="cart === undefined || cart.length === 0">
              <p class="">У вас пустая корзина</p>
              <NuxtLink to="/"><b>За покупками</b></NuxtLink>
            </div>
            <div class="" v-else>
              {{ console.log(cart) }}
              <CartItem :product="product.choice" :count="product.quantity" v-for="product in cart" @remove-cart-item="removeItemCart"/>
            </div>
           </ClientOnly>
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
  import CartItem from '~/assets/shared/CartItem.vue';

  const selectedCategory = ref("");
  const selectedItem = ref("cart");
  const userInput = ref("");
  let cart = [];

  onMounted(() => {
    cart = useCookie('cart');
    if(!cart) cart.value = [];
  });

  const userJwt = useCookie('luxflowers-jwt');

  if(userJwt.value.jwt === undefined || userJwt.value.jwt === null) {
    console.log("don't wave")
    navigateTo("/");
  }
  
  let {data: currentUser, status} = await (useFetch('/api/user', {
    method: 'GET',
    params: {
      jwt: userJwt.value.jwt
    }
  }));

  async function deleteAccount(confirm) {
    if(confirm === currentUser.value.login) {
      const user = await $fetch('/api/userRemove', {
        method: 'POST',
        body: {
          jwt: currentUser.value.jwt
        }
      });

      cart.value = undefined;
      userJwt.value = undefined;
      navigateTo('/');
    }
    return;
  }
  function removeItemCart(id) {
    cart.value = cart.value.filter(val => {
      return val.choice.id !== id
    });
  }
  function exitProfile() {
    useCookie('luxflowers-jwt').value = undefined;
    return navigateTo('/')
  }

</script>

<style>
  main > * {
    background: white;
  }
</style>