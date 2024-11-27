<template>
  <title>Панель администрирования</title>
  <template v-if="currentUser.isAdmin">

    <main class="flex p-[15px] h-[100vh] w-full">
      <div class="main__left h-full">
        <Toolbar class="flex flex-col justify-start items-center h-full !min-w-0 p-[15px]">
          <template #start>
            <div class="flex flex-col justify-center">
              <Button v-for="item in items" v-tooltip="item.label" :label="item.label"
                @click="changeCategory(item.value)" :class="currentCategory === item.value ? 'bg-black' : 'bg-white'"
                class="hover:!bg-[#020617] mb-[30px] w-[48px] h-[48px]" style="background-color: white; border: 0;">
                <i :class="'pi pi-' + item.icon" class="text-[#969696]"></i>
              </Button>
            </div>
          </template>
          <Divider />
          <template #end>
            <Button label="Настройки" @click="() => changeCategory('settings')" severity="contrast"
              :class="currentCategory === 'settings' ? 'bg-black' : 'bg-white'">
              <Icon icon="mdi:gear" name="mdi:gear" color="white" />
            </Button>
          </template>
        </Toolbar>
      </div>
      <div class="main__right w-full ml-[30px]">
        <Panel class="w-full min-h-full">
          <template v-if="currentCategory === 'home'">
            <Home :user=currentUser>
              <div class="flex justify-between items-center">
                <SelectButton v-model="statsSelect" :options="statsOptions" class="my-[15px]" />
                <Button class="!bg-[#020617] h-[40px] !border-0">Скачать в виде JSON</Button>
              </div>
              <Panel>
                  <p>Отчёт продаж</p>
                  <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
              </Panel>
            </Home>
          </template>
          <template v-if="currentCategory === 'products'">
            <Products :sortOrder :sortField :products="data.products" :jwt="currentUser.jwt" @update-items="async () => data.products = await $server.getServerProducts()">
              <template #header>
                <div class="flex justify-between items-center">
                  <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Сортрировка по цене"
                    @change="onSortChange($event)" />
                </div>
              </template>
              
            </Products>
          </template>
          <template v-if="currentCategory === 'blog'">
            
            <Blog :blogs="data.blogs" :jwt="currentUser.jwt" @update-items="async () => data.blogs = await $server.getServerBlogs()" />
          </template>
          <template v-if="currentCategory === 'mail'">
            
            <Inbox :inbox="data.inbox" :jwt="currentUser.jwt" @update-items="async () => data.inbox = await $server.getServerInbox()" />
          </template>
          <template v-if="currentCategory === 'users'">
            
            <Users :users="data.users" :jwt="currentUser.jwt" @update-items="async () => data.users = await $server.getServerUsers()" />
          </template>
        </Panel>
      </div>
    </main>
  </template>

</template>

<script setup>
  import Button from 'primevue/button';
  import Divider from 'primevue/divider';
  import Toolbar from 'primevue/toolbar';
  import Panel from "primevue/panel";
  import Select from 'primevue/select';


  import ServerAPI from '~/assets/constants/ServerAPI';
  import { MONTHS } from '~/assets/constants/constants';
  import Home from '~/assets/components/admin/Home.vue';
  import Products from '~/assets/components/admin/Products.vue';
  import Blog from '~/assets/components/admin/Blog.vue';
  import Users from '~/assets/components/admin/Users.vue';
  import Inbox from '~/assets/components/admin/Inbox.vue';

  const items = ref([
    { label: "Основное", icon: "home", value: 'home' },
    { label: "Товары", icon: "shopping-cart", value: 'products' },
    { label: "Блог", icon: "video", value: 'blog' },
    { label: "Почта", icon: "envelope", value: 'mail' },
    { label: "Пользователи", icon: "user", value: 'users' },
  ]);

  const statsSelect = ref("Ежедневный");
  const statsOptions = ref(["Ежедневный", "Ежемесячный", "Ежегодный"]);

  const chartData = ref();
  const chartOptions = ref();

  let currentCategory = ref("home");

  let currentUser = reactive({
    isAdmin: false,
    jwt: null
  });

  const sortKey = ref();
  const sortField = ref();
  const sortOptions = ref([
    {label: "Цена по убыванию", value: "!price"},
    {label: "Цена по возрастанию", value: "price"},
  ]);
  const sortOrder = ref();

  const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};

  onMounted(() => {
    chartData.value = setChartData().day;
    chartOptions.value = setChartOptions();
  });

  watch(statsSelect, (n, o) => {
    switch(n) {
      case "Ежедневный":
        chartData.value = setChartData().day;
        break;
      case "Ежемесячный":
        chartData.value = setChartData().month;
        break;
      case "Ежегодный":
        chartData.value = setChartData().year;
        break;
    }
  });

  let jwt = useCookie("luxflowers-jwt").value;

  let {data: user, status} = await useFetch("/api/user/jwt", {
    method: "POST",
    body: {
      jwt: jwt.jwt
    }
  });

  currentUser = user.value;

  if(!currentUser.isAdmin) {
    navigateTo("/")
  }
  
  function changeCategory(category) {
    console.log(currentCategory.value, '->', category)
    currentCategory.value = category;
    return true;
  }

  const $server = new ServerAPI(currentUser.jwt);

  const currentMonthDays = Array.from(new Array(29), (x, i) => {
    const month = MONTHS[new Date(Date.now() - ( 84600000 * (i + 1))).getMonth()];
    const day = new Date(Date.now() - ( 84600000 * (i + 1))).getDate()
    const str = month + ' ' + day;
    return str;
  });

  const data = reactive({
    chats: await $server.getServerChats(),
    blogs: await $server.getServerBlogs(),
    inbox: await $server.getServerInbox(),
    users: await $server.getServerUsers(),
    stats: await $server.getServerStats(),
    products: await $server.getServerProducts(),
  });
  

  const setChartData = () => {
    return {
      day: {
        labels: currentMonthDays.reverse(),
        datasets: [
            {
                label: 'Общая выручка',
                backgroundColor: "#969696",
                borderColor: "#000000",
                data: [58000, 60000, 68900, 78000, 65555, 58000, 60000, 68900, 78000, 65555, 58000, 60000, 58000, 60000, 68900, 78000, 65555, 58000, 60000, 68900, 78000, 65555, 58000, 60000, 58000, 60000, 68900, 78000, 65555, 58000].reverse()
            },
        ]
      },
      month: {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', "Декабрь"],
        datasets: [
            {
                label: 'Общая выручка',
                backgroundColor: "#969696",
                borderColor: "#000000",
                data: [58000, 60000, 68900, 78000, 65555, 58000, 60000, 68900, 78000, 65555, 58000, 60000]
            },
        ]
      },
      year: {
        labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Общая выручка',
                backgroundColor: "#969696",
                borderColor: "#000000",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
        ]
      }
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }

</script>

<style>

</style>