<template>
  
  <template v-if="currentUser.isAdmin">
    
    <main class="flex p-[15px] h-[100vh]">
      <div class="main__left h-full">
        <Menubar :model="items" class="flex flex-col justify-start items-center h-full !min-w-0 p-[15px]">
          <template #item="item">
            {{ console.log(item.icon) }}
            <Button v-tooltip="label" :label @click="changeCategory(value)" severity="contrast" :class="currentCategory === value ? 'bg-black' : 'bg-white'" class="mb-[30px] w-[48px] h-[48px]">
              <Icon :icon="icon" name="" color="white"/>
            </Button>
          </template>
          <Divider />
          <Button label="Настройки" @click="() => changeCategory('settings')" severity="contrast" :class="currentCategory === 'settings' ? 'bg-black' : 'bg-white'">
              <Icon icon="mdi:gear" name="mdi:gear" color="white" />
            </Button>
        </Menubar>
      </div>
      <div class="main__right">
        <template v-if="currentCategory === 'home'">
          
        </template>
      </div>
    </main>

  </template>

</template>

<script setup>
  import Button from 'primevue/button';
  import Menubar from 'primevue/menubar';
  import Divider from 'primevue/divider';
  

  const items = ref([
    { label: "Основное", icon: "mingcute:home-2-line", value: 'home' },
    { label: "Товары", icon: "tdesign:shop-filled", value: 'products' },
    { label: "Блог", icon: "mingcute:home-2-line", value: 'blog' },
    { label: "Почта", icon: "mingcute:home-2-line", value: 'mail' },
    { label: "Пользователи", icon: "mingcute:home-2-line", value: 'users' },
    { label: "Настройки", icon: "mingcute:home-2-line", value: 'settings' },
  ]);

  let currentCategory = ref("home");
  let jwt = useCookie("luxflowers-jwt").value.jwt;
  let currentUser = reactive({
    isAdmin: false,
    jwt: null
  });

  let {data: user, status} = await useFetch("/api/user/jwt", {
    method: "POST",
    body: {
      jwt
    }
  });

  currentUser = user.value;
  console.log(currentUser)
  
  function changeCategory(category) {
    console.log(currentCategory.value, '->', category)
    currentCategory.value = category;
    return true;
  }

</script>

<style>

</style>