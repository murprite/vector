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
            <p>Основная страница</p>
            <b class="text-2xl">Добро пожаловать, {{ currentUser.fullName ? currentUser.fullName : 'снова' }}</b>
            <div class="home__stats">
              <div class="flex justify-between items-center">
                <SelectButton v-model="statsSelect" :options="statsOptions" class="my-[15px]" />
                <Button class="!bg-[#020617] h-[40px] !border-0">Скачать в виде JSON</Button>
              </div>
              <Panel>
                <p>Отчёт продаж</p>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
              </Panel>
            </div>
          </template>
          <template v-if="currentCategory === 'products'">
            <p>Товары</p>
            <b class="text-2xl">Товары в продаже</b>
            <DataView :value="data.products" :sortOrder="sortOrder" :sortField="sortField">
              <template #header>
                <div class="flex justify-between items-center">
                  <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Сортрировка по цене"
                    @change="onSortChange($event)" />
                  <Button @click="() => setAddItem()" label="Добавить" icon="pi pi-plus" />
                </div>
              </template>
              <template #list="slotProps">
                <div class="flex flex-col">
                  <div v-for="(item, index) in slotProps.items" :key="index">
                    <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                      :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                      <div class="md:w-40 relative">
                        <Tag v-if="item.count === 0" value="Нет в наличии" severity="danger" class="absolute"
                          style="left:5px; top: 5px"></Tag>
                        <NuxtImg class="block xl:block mx-auto rounded w-full" :src="item.cardImageUrl"
                          :alt="item.name" />
                      </div>
                      <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                          <div>
                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                              getFlowerCategory(item.flowersType) }}</span>
                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                          </div>
                          <div class="bg-surface-100" style="border-radius: 30px">
                            <div class="bg-surface-0 flex items-center justify-center">
                              Количество на складе: {{ item.count ? item.count : 0 }}
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                          <span class="text-xl font-semibold">{{ item.price }}₽</span>
                          <div class="flex flex-row-reverse md:flex-row gap-2">
                            <Button icon="pi pi-trash" class="!bg-[#f40000] hover:!bg-[#a40000] border !border-red-700"
                              @click="() => deleteItem(item.id)"></Button>
                            <Button icon="pi pi-pencil" label="Изменить"
                              class="flex-auto md:flex-initial whitespace-nowrap"
                              @click="() => changeItem(item)"></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </DataView>
          </template>
          <template v-if="currentCategory === 'blog'">
            <p>Последние статьи</p>
            <b class="text-2xl">Блог</b>
            <div class="blog">
              
            </div>
          </template>
        </Panel>
      </div>
    </main>
    <Dialog v-model:visible="isChangeItem" header="Изменить данные" modal>
      <div class="flex flex-col gap-[15px]">
        <InputGroup>
          <InputGroupAddon>
            <span>Название букета</span>
          </InputGroupAddon>
          <InputText v-model="itemTemp.value.name" placeholder="Название" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <span>Описание</span>
          </InputGroupAddon>
          <InputText v-model="itemTemp.value.description" placeholder="Описание" />
        </InputGroup>
        <div class="flex gap-[15px]">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-money-bill"></i>
              <span class="ml-[5px]">Цена</span>
            </InputGroupAddon>
            <InputNumber v-model="itemTemp.value.price" placeholder="Цена" />
          </InputGroup>

          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-name"></i>
              <span>Кол-во</span>
            </InputGroupAddon>
            <InputNumber v-model="itemTemp.value.count" placeholder="Кол-во на складе" />
          </InputGroup>
        </div>


        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-model="itemTemp.value.cardImageUrl" placeholder="Ссылка на превью (./product-1.png)" />
          <NuxtImg :src="itemTemp.value.cardImageUrl" class="w-[180px] h-[180px]"
            onerror="this.src='/_ipx/_/./Default.png" />
        </InputGroup>
        <NuxtImg />

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-model="itemTemp.value.images"
            placeholder="Ссылка на изображения (./product-1-1.png ./product-1-2.png)" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-petal"></i>
          </InputGroupAddon>
          <Select v-model="itemTemp.value.flowersType" :options="selectOptions" optionLabel="name" placeholder="Выберите тип букета" class="w-full md:w-56" />
        </InputGroup>

        <Button label="Обновить данные" @click="() => updateItem(itemTemp)"></Button>
      </div>
    </Dialog>
    <Dialog header="Добавить букет" modal v-model:visible="isAddItem">
      <div class="flex flex-col gap-[15px]">
        <InputGroup>
          <InputGroupAddon>
            <span>Название букета</span>
          </InputGroupAddon>
          <InputText v-model="addCurrentItem.value.name" placeholder="Название" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <span>Описание</span>
          </InputGroupAddon>
          <InputText v-model="addCurrentItem.value.description" placeholder="Описание" />
        </InputGroup>

        <div class="flex gap-[15px]">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-money-bill"></i>
              <span class="ml-[5px]">Цена</span>
            </InputGroupAddon>
            <InputNumber v-model="addCurrentItem.value.price" placeholder="Цена" />
          </InputGroup>

          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-name"></i>
              <span>Кол-во</span>
            </InputGroupAddon>
            <InputNumber v-model="addCurrentItem.value.count" placeholder="Кол-во на складе" />
          </InputGroup>
        </div>


        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-model="addCurrentItem.value.cardImageUrl" placeholder="Ссылка на превью (./product-1.png)" />
          <NuxtImg :src="addCurrentItem.value.cardImageUrl" class="w-[180px] h-[180px]"
            onerror="this.src='./Default.png'" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-model="addCurrentItem.value.images"
            placeholder="Ссылка на изображения (./product-1-1.png ./product-1-2.png)" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-petal"></i>
          </InputGroupAddon>
          <Select v-model="addCurrentItem.value.flowersType" :options="selectOptions" optionLabel="name" placeholder="Выберите тип букета" class="w-full md:w-56" />
        </InputGroup>

        <Button label="Добавить букет" @click="() => addItem(addCurrentItem.value)"></Button>
      </div>
    </Dialog>

  </template>

</template>

<script setup>
  import Button from 'primevue/button';
  import Divider from 'primevue/divider';
  import Toolbar from 'primevue/toolbar';
  import Panel from "primevue/panel";
  import SelectButton from 'primevue/selectbutton';
  import Chart from 'primevue/chart';
  import InputGroup from 'primevue/inputgroup';
  import InputGroupAddon from 'primevue/inputgroupaddon';
  import Dialog from 'primevue/dialog';
  import Select from 'primevue/select';

  import ServerAPI from '~/assets/constants/ServerAPI';
  import { MONTHS, getFlowerCategory } from '~/assets/constants/constants';
  import InputNumber from 'primevue/inputnumber';

  class Item {
    constructor(name='Букет', cardImageUrl="./Default.png", images="./product-1-1.png", price=1000, description='Описание', flowersType={name: "Высушенные цветы", code: 0}, count=0) {
      this.count = count;
      this.name = name;
      this.cardImageUrl = cardImageUrl;
      this.images = images;
      this.price = price;
      this.description = description;
      this.flowersType = flowersType;
    }
  }

  const items = ref([
    { label: "Основное", icon: "home", value: 'home' },
    { label: "Товары", icon: "shopping-cart", value: 'products' },
    { label: "Блог", icon: "video", value: 'blog' },
    { label: "Почта", icon: "envelope", value: 'mail' },
    { label: "Пользователи", icon: "user", value: 'users' },
  ]);

  const statsSelect = ref("Ежедневный");
  const statsOptions = ref(["Ежедневный", "Ежемесячный", "Ежегодный"]);

  const selectOptions = ref([
    {name: "Высушенные цветы", code: 0},
    {name: "Свежие цветы", code: 1},
    {name: "Ароматические цветы", code: 2},
    {name: "Вазы", code: 3},
    {name: "Свечи", code: 4},
    {name: "Освежители", code: 5},
  ]);

  const chartData = ref();
  const chartOptions = ref();

  const isChangeItem = ref(false);
  const isDeleteItem = ref(false);
  const isAddItem = ref(false);

  let currentCategory = ref("home");

  const currentItem = reactive({});
  const addCurrentItem = reactive(new Item());
  addCurrentItem.value = new Item();

  const itemTemp = reactive({});
  let currentUser = reactive({
    isAdmin: false,
    jwt: null
  });

  const sortKey = ref();
  const sortField = ref();
  const sortOptions = ref();
  const sortOrder = ref();

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

  function changeItem(item) {
    currentItem.value = item;
    itemTemp.value = new Item(item.name, item.cardImageUrl, item.images, item.price, item.description, item.flowersType, item.count);
    itemTemp.value.id = item.id;
    isChangeItem.value = !isChangeItem.value;

  }

  async function addItem(item) {
    console.log(addCurrentItem.value)
    const newItem = new Item(item.name, item.cardImageUrl, item.images, item.price, item.description, item.flowersType, item.count);
    addCurrentItem.value = {};


    const response = await $server.createServerProduct(newItem);
    data.products = await $server.getServerProducts();
    isAddItem.value = false;
  }

  function setAddItem() {
    isAddItem.value = true;
    console.log(isAddItem)
  } 

  async function updateItem(item) {
    currentItem.value = item;
    console.log(item.value)
    try {
      const response = await $server.updateServerProducts(item.value);
      data.products = await $server.getServerProducts();
      currentItem.value = item.value;
      isChangeItem.value = false;

    } catch(e) {
      console.log("Konosuba!", e)
    }
  }

  async function deleteItem(itemId) {
    try {
      const response = await $server.deleteServerProduct(itemId);
      data.products = await $server.getServerProducts();

    } catch {
      console.log("Konosuba!");
    }
  }

</script>

<style>

</style>