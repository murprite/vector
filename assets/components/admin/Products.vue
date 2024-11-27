<template>
  <div class="flex justify-between">
    <div class="">
      <p>Товары</p>
      <b class="text-2xl">Товары в продаже</b>
    </div>
    <Button @click="() => isAddItem = true" label="Добавить" icon="pi pi-plus" />
  </div>
  <DataView :value="products" :sortOrder="sortOrder" :sortField="sortField">
    <Button @click="() => isAddItem = true" label="Добавить" icon="pi pi-plus" class="ml-auto" />
    <template #header>
      <slot name="header"></slot> 
    </template>
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
            <div class="md:w-40 relative">
              <Tag v-if="item.count === 0" value="Нет в наличии" severity="danger" class="absolute"
                style="left:5px; top: 5px"></Tag>
              <NuxtImg class="block xl:block mx-auto rounded w-full" :src="item.cardImageUrl" :alt="item.name" />
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
                  <Button icon="pi pi-pencil" label="Изменить" class="flex-auto md:flex-initial whitespace-nowrap"
                    @click="() => changeItem(item)"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
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
</template>

<script setup>
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import InputGroup from 'primevue/inputgroup';
  import InputGroupAddon from 'primevue/inputgroupaddon';
  import InputNumber from 'primevue/inputnumber';
  import Select from 'primevue/select';
  import InputText from 'primevue/inputtext';

  import ServerAPI from '~/assets/constants/ServerAPI';
  import { getFlowerCategory } from "~/assets/constants/constants";

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

  let {products, sortOrder, sortField, jwt} = defineProps(["products", "sortOrder", "sortField", "jwt"]);
  let emit = defineEmits(['updateItems']);

  const $server = new ServerAPI(jwt);

  const selectOptions = ref([
    {name: "Высушенные цветы", code: 0},
    {name: "Свежие цветы", code: 1},
    {name: "Ароматические цветы", code: 2},
    {name: "Вазы", code: 3},
    {name: "Свечи", code: 4},
    {name: "Освежители", code: 5},
  ]);

  const isDeleteItem = ref(false);
  const isChangeItem = ref(false);
  const isAddItem = ref(false);

  const addCurrentItem = reactive({});
  addCurrentItem.value = new Item();

  const currentItem = reactive({});
  const itemTemp = reactive({});

  function changeItem(item) {
    currentItem.value = item;
    itemTemp.value = new Item(item.name, item.cardImageUrl, item.images, item.price, item.description, item.flowersType, item.count);
    itemTemp.value.id = item.id;
    isChangeItem.value = !isChangeItem.value;
  }

  async function deleteItem(itemId) {
    try {
      const response = await $server.deleteServerProduct(itemId);
      emit('updateItems');

    } catch(e) {
      console.log("Konosuba!", e);
    }
  }

  async function updateItem(item) {
    currentItem.value = item;
    console.log(item.value)
    try {
      const response = await $server.updateServerProduct(item.value);
      emit('updateItems');

      currentItem.value = item.value;
      isChangeItem.value = false;

    } catch(e) {
      console.log("Konosuba!", e)
    }
  }

  async function addItem(item) {
    const newItem = new Item(item.name, item.cardImageUrl, item.images, item.price, item.description, item.flowersType, item.count);
    addCurrentItem.value = {};
    newItem.flowersType = item.flowersType.code;

    const response = await $server.createServerProduct(newItem);
    emit("updateItems");
    isAddItem.value = false;
  }

</script>

<style></style>