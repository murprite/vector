<template>
  
  <template v-if="currentUser.isAdmin">
    
    <main class="flex p-[15px] h-[100vh] w-full">
      <div class="main__left h-full">
        <Toolbar class="flex flex-col justify-start items-center h-full !min-w-0 p-[15px]">
          <template #start>
            <div class="flex flex-col justify-center">
              <Button v-for="item in items" v-tooltip="item.label" :label="item.label" @click="changeCategory(item.value)" :class="currentCategory === item.value ? 'bg-black' : 'bg-white'" class="hover:!bg-[#020617] mb-[30px] w-[48px] h-[48px]" style="background-color: white; border: 0;">
                <i :class="'pi pi-' + item.icon" class="text-[#969696]"></i>
              </Button>
            </div>
          </template>
          <Divider />
          <template #end>
            <Button label="Настройки" @click="() => changeCategory('settings')" severity="contrast" :class="currentCategory === 'settings' ? 'bg-black' : 'bg-white'">
              <Icon icon="mdi:gear" name="mdi:gear" color="white" />
            </Button>
          </template>
        </Toolbar>
      </div>
      <div class="main__right w-full ml-[30px]">
        <Panel class="w-full h-full">
          <template v-if="currentCategory === 'home'">
            <p>Основная страница</p>
            <b class="text-2xl">Добро пожаловать, {{ currentUser.fullName ? currentUser.fullName : 'снова' }}</b>
            <div class="home__stats">
              <div class="flex justify-between items-center">
                <SelectButton v-model="statsSelect" :options="statsOptions" class="my-[15px]"/>
                <Button class="!bg-[#020617] h-[40px] !border-0">Скачать в виде JSON</Button>
              </div>
              <Panel>
                <p>Отчёт продаж</p>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
              </Panel>
            </div>
          </template>
          <template v-if="currentCategory === 'products'">
            {{ console.log(data.products) }}
            <p>Товары</p>
            <b class="text-2xl">Товары в продаже</b>
            <DataView :value="data.products" :sortOrder="sortOrder" :sortField="sortField">
              <template #header>
                  <div class="flex justify-between items-center">
                    <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Сортрировка по цене" @change="onSortChange($event)" />
                    <Button label="Добавить" icon="pi pi-plus" />
                  </div>
              </template>
              <template #list="slotProps">
                  <div class="flex flex-col">
                      <div v-for="(item, index) in slotProps.items" :key="index">
                          <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                              <div class="md:w-40 relative">
                                  <NuxtImg class="block xl:block mx-auto rounded w-full" :src="item.cardImageUrl" :alt="item.name" />
                              </div>
                              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                  <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                      <div>
                                          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ getFlowerCategory(item.flowersType) }}</span>
                                          <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                      </div>
                                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                          <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            {{ item.count === 0 ? 'Нет в наличии' : '' }}  
                                            Количество на складе: {{ item.count ? item.count : 0 }}
                                          </div>
                                      </div>
                                  </div>
                                  <div class="flex flex-col md:items-end gap-8">
                                      <span class="text-xl font-semibold">{{ item.price }}₽</span>
                                      <div class="flex flex-row-reverse md:flex-row gap-2">
                                          <Button icon="pi pi-trash" class="!bg-[#f40000] hover:!bg-[#a40000] border !border-red-700"></Button>
                                          <Button icon="pi pi-pencil" label="Изменить" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </template>
          </DataView>
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
  import SelectButton from 'primevue/selectbutton';
  import Chart from 'primevue/chart';

  import ServerAPI from '~/assets/constants/ServerAPI';
  import { MONTHS, getFlowerCategory } from '~/assets/constants/constants';

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

  let currentCategory = ref("home");
  let jwt = useCookie("luxflowers-jwt").value;
  let currentUser = reactive({
    isAdmin: false,
    jwt: null
  });

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
                data: [58000, 60000, 68900, 78000, 65555, 58000, 60000, 68900, 78000, 65555, 58000, 60000, 58000, 60000, 68900, 78000, 65555, 58000, 60000, 68900, 78000, 65555, 58000, 60000, 58000, 60000, 68900, 78000, 65555, 58000]
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