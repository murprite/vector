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
              <SelectButton v-model="statsSelect" :options="statsOptions" class="my-[15px]"/>
              <Panel>
                <p>Отчёт продаж</p>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
              </Panel>
            </div>
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
  import { MONTHS } from '~/assets/constants/constants';

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
    chartData.value = setChartData().month;
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
  console.log(currentUser)


  if(!currentUser.isAdmin) {
    navigateTo("/")
  }
  
  function changeCategory(category) {
    console.log(currentCategory.value, '->', category)
    currentCategory.value = category;
    return true;
  }

  const $server = new ServerAPI(currentUser.jwt);
  const currentMonthDays = new Array(30).map((val, i) => {
    const str = MONTHS[new Date().getMonth()] + ' ' + new Date().getDate();
    console.log(str);
    return str;
  });
  console.log(currentMonthDays)
  const data = reactive({
    chats: $server.getServerChats(),
    blogs: $server.getServerBlogs(),
    inbox: $server.getServerInbox(),
    users: $server.getServerUsers(),
    stats: $server.getServerStats(),
  });

  const setChartData = () => {
    return {
      day: {
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