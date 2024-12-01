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
      <template v-if="!isUserHavingJwt()">
        <Button type="button" label="Войти" @click="(e) => authPopup = !authPopup" class="bg-white">Войти</Button>
      </template>
      <template v-else>
        <Button type="button" label="Кабинет" @click="(e) => navigateTo('/cabinet')" class="bg-white">Кабинет</Button>
      </template>
      <Button class="bg-white" @click="isCartOpen = !isCartOpen">Корзина</Button>
    </div>
    <button class="slider__mobile flex md:hidden items-center justify-center"
      @click="isProfileOpen = !isProfileOpen">
      <NuxtImg src="./nav-right.svg" width="32" height="32" />
    </button>
    <Message class="mb-[10px] fixed top-[-80%] left-[50%] translate-x-[-50%]" v-if="errorMessageShown" severity="error"
      :life="errorMessageLife">{{ errorMessageText }}</Message>
    <Dialog v-model:visible="registerPopup" modal header="Регистрация" :style="{ width: '30rem' }">
      <template v-if="currentStatus !== 'loading'">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Регистрация пользователя.</span>
        <div class="flex items-center gap-4 mb-4">
          <label for="regusername" class="font-semibold w-24">Ваш логин</label>
          <input id="regusername" class="flex-auto outline-none" @input="(e) => registerUserData.login = e.target.value"
            autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Ваша почта</label>
          <input id="email" class="flex-auto outline-none" @input="(e) => registerUserData.email = e.target.value"
            autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24">Пароль</label>
          <input id="password" type="password" class="flex-auto outline-none"
            @input="(e) => registerUserData.pass = e.target.value" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="valpassword" class="font-semibold w-24">Повторите пароль</label>
          <input id="valpassword" type="password" class="flex-auto outline-none"
            @input="(e) => registerUserData.validPass = e.target.value" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Войти"
            @click="(e) => sendRegistration(registerUserData)">Зарегистрироваться</Button>
        </div>
      </template>
      <template v-else>
        <ProgressSpinner class="mx-auto my-5" />
      </template>
    </Dialog>
    <Dialog v-model:visible="authPopup" modal header="Вход в профиль" :style="{ width: '25rem' }">
      <Message class="mb-[10px] fixed top-[-80%] left-[50%] translate-x-[-50%]" v-if="errorMessageShown"
        severity="error" :life="errorMessageLife">{{ errorMessageText }}</Message>
      <template v-if="currentStatus !== 'loading'">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Логин и пароль для входа.</span>
        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Логин</label>
          <input id="username" class="flex-auto outline-none" @input="(e) => currentUserName = e.target.value"
            autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24">Пароль</label>
          <input id="password" type="password" class="flex-auto outline-none"
            @input="(e) => currentPass = e.target.value" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Регистрация" severity="secondary" @click="registerUser()">Регистрация</Button>
          <Button type="button" label="Войти" @click="(e) => validateAuthButton(e)">Войти</Button>
        </div>
      </template>
      <template v-else>
        <ProgressSpinner class="mx-auto my-5" />
      </template>
    </Dialog>
  </header>
  <Drawer position="right" v-model:visible="isCartOpen" :showCloseIcon="false" class="!w-[40vw]">
    <div class="Cart bg-white h-full relative">
      <div class="text-center" v-if="cart === undefined || cart.length === 0">
        <p class="">У вас пустая корзина</p>
        <NuxtLink to="/"><b>За покупками</b></NuxtLink>
      </div>
      <div class="flex flex-col h-full" v-else>
        <CartItem :product="product.choice" :count="product.quantity" v-for="product in cart"
          @remove-cart-item="removeItemCart" />

        <div class="mt-auto mb-[30px]">
          <span class="mb-[15px] text-[1.3rem] block"><b>Итого:</b> {{ getTotalPrice() }}₽</span>
          <NuxtLink to="/checkout">
            <button
              class="w-full border border-black p-[15px] bg-red transition hover:bg-black hover:text-white">Чек</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Drawer>
  <Drawer position="left" v-model:visible="isMenuOpen" :showCloseIcon="false">
    <div class="Menu bg-white h-[100vh]  p-[5px] relative">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517" />
          </svg>
        </div>
      </div>
    </div>
  </Drawer>
  <Drawer position="right" v-model:visible="isProfileOpen" :showCloseIcon="false">
    <div class="Menu bg-white h-[100vh] p-[20px]">
      <template v-if="currentUser">
        <div class="Cart bg-white h-full relative">
          <div class="text-center" v-if="cart === undefined || cart.length === 0">
            <p class="">У вас пустая корзина</p>
            <NuxtLink to="/"><b>За покупками</b></NuxtLink>
          </div>
          <div class="flex flex-col h-full" v-else>
            <CartItem :product="product.choice" :count="product.quantity" v-for="product in cart"
              @remove-cart-item="removeItemCart" />

            <div class="mt-auto mb-[30px]">
              <span class="mb-[15px] text-[1.3rem] block"><b>Итого:</b> {{ getTotalPrice() }}₽</span>
              <NuxtLink to="/checkout">
                <button
                  class="w-full border border-black p-[15px] bg-red transition hover:bg-black hover:text-white">Чек</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col items-center text-[18px] text-center">
          <Title class="mb-[15px]">Войдите в аккаунт для совершения покупок</Title>
          <Button class="bg-white mb-[10px]" @click="() => authPopup = !authPopup">Вход</Button>
          <Button class="bg-white border-black border-l-1" @click="() => registerPopup = !registerPopup">Регистрация</Button>
        </div>
      </template>
    </div>
  </Drawer>
</template>
<style scoped>
header>* {
  background: white;
}

html {
  scroll-behavior: smooth;
}
</style>
<script setup>
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import CartItem from './CartItem.vue';

import Button from './Button.vue';
import Title from './Title.vue';
import ServerAPI from '../constants/ServerAPI';

let isMenuOpen = ref(false);
let isProfileOpen = ref(false);
let authPopup = ref(false);
let registerPopup = ref(false);
let isCartOpen = ref(false);

let errorMessageLife = 3000;
let errorMessageText = ref("");
let errorMessageShown = ref(false);

const currentPass = ref("");
const currentUserName = ref("");
const currentStatus = ref("ready");

let cart = [];

onMounted(async () => {
  let jwt = useCookie('luxflowers-jwt').value;
  jwt = !jwt ? '' : jwt.jwt;

  let user = await $fetch("/api/user/jwt", {
    method: "POST",
    body: {
      jwt
    }
  });
  currentUser = user;

  cart = useCookie('cart');
  if(!cart) cart.value = [];
});

const registerUserData = reactive({
  login: '',
  pass: '',
  validPass: '',
  email: '',
})

let userJwt = useCookie("luxflowers-jwt");
let currentUser = null;

function showErrorPopup(err) {
  errorMessageShown.value = true;
  errorMessageText.value = err;

  setTimeout(() => {
    errorMessageShown.value = false;
  }, errorMessageLife);
}

function removeItemCart(id) {
  cart.value = cart.value.filter(val => {
    return val.choice.id !== id
  });
}

function registerUser() {
  isMenuOpen.value = false;
  authPopup.value = false;
  isProfileOpen.value = false;

  registerPopup.value = true;
}

async function sendRegistration(user) {
  if (user.pass !== user.validPass) {
    showErrorPopup("Пароли не совпадают");
    return;
  }

  const response = await $fetch("api/user/register", {
    method: 'POST',
    body: user
  });

  const userJwt = useCookie("luxflowers-jwt");
  userJwt.value = { jwt: response.jwt, expire: response.expire };

  reloadNuxtApp('');
}

function getTotalPrice() {
  return cart.value.reduce((acc, val) => {
    return acc + Number( val.choice.price * val.quantity);
  }, 0);
}

async function validateAuthButton(e) {
  currentStatus.value = "loading";

  const pass = hashPass(currentPass);
  const userName = currentUserName;

  const body = JSON.stringify({
    username: userName.value,
    pass: pass.value,
  });


  let response = await $fetch("/api/user/login", {
    method: "POST",
    body
  }).finally((res) => {
    currentStatus.value = "ready";
  });

  if (response.error) {
    showErrorPopup(response.error);
    return;
  }

  userJwt.value = { jwt: response.jwt };
  userJwt.maxAge = response.expire;

  reloadNuxtApp();
}
function isUserHavingJwt() {
  let userJwt = useCookie('luxflowers-jwt');
  return userJwt.value !== undefined;
}
async function openCart() {
  let jwt = useCookie("luxflowers-jwt").value.jwt;
  if (!jwt) {
    authPopup.value = true;
  }
  console.log(jwt)

  if (response) return navigateTo("/cabinet");
}
function hashPass(pass) {
  // TODO: some hash func
  return pass;
}


</script>