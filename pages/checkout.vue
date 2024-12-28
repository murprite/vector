<template>
  <div class="bg-black">
    <Header></Header>
    <main class="grid grid-cols-2 gap-[1px] min-h-[100vh] my-[1px] bg-black">
      <div class="main__left px-[80px] py-[40px]">
        <div class="main__breadcrumbs uppercase flex font-gray">
          <button :class="'main__info mr-[5px] ' + (currentItem == '0' ? 'text-black' : 'text-gray-400')" @click="() => changeItem('0')">Информация</button>
          >
          <button :class="'main__ship ml-[10px] mr-[5px] ' + (currentItem == '1' ? 'text-black' : 'text-gray-400')" @click="() => changeItem('1')">Доставка</button>
          >
          <button :class="'main__payment ml-[10px] mr-[5px] '  + (currentItem == '2' ? 'text-black' : 'text-gray-400')" @click="() => changeItem('2')">Оплата</button>
        </div>
        <div class="main__accountnotify"></div>
        <Accordion :value="currentItem">
          <AccordionPanel value="0">
              <AccordionHeader>1 Контактная информация</AccordionHeader>
              <AccordionContent>
                <div class="flex flex-col">
                  <input class="px-[15px] py-[20px] text-gray border-[2px] outline-none" type="text" placeholder="Ваше Имя" @input="(e) => userData.name = e.target.value">
                  <input type="email" placeholder="Ваша Почта" @input="(e) => userData.email = e.target.value" class="px-[15px] py-[20px] text-gray border-[2px] outline-none my-[10px]">
                  <input type="phone" placeholder="Ваш Номер Телефона" @input="(e) => userData.phone_num = e.target.value" class="px-[15px] py-[20px] text-gray border-[2px] mb-[10px] outline-none">
                  <button class="py-[20px] w-full bg-black text-white" @click="() => changeItem('1')">Перейти к доставке</button>
                </div>
              </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
              <AccordionHeader>2 Детали доставки</AccordionHeader>
              <AccordionContent>
                  <div class="flex flex-col">
                      <input @input="(e) => userData.reciever_name = e.target.value" type="text" name="" placeholder="Имя получателя" class="px-[15px] py-[20px] text-gray border-[2px] outline-none mb-[10px]"/>
                      <input @input="(e) => userData.reciever_phone = e.target.value" type="text" name="" placeholder="Номер телефона получателя *" required class="px-[15px] py-[20px] text-gray border-[2px] mb-[10px] outline-none" />
                      <input @input="(e) => userData.delivery_date = e.target.value" type="text" name="" placeholder="Дата доставки" class="px-[15px] py-[20px] text-gray border-[2px] outline-none mb-[10px]"/>
                      <input @input="(e) => userData.delivery_time = e.target.value" type="text" name="" placeholder="Время доставки" class="px-[15px] py-[20px] text-gray border-[2px] outline-none mb-[10px]"/>
                      <div class="flex">
                        <input @input="(e) => userData.street = e.target.value" type="text" placeholder="Улица" class="px-[15px] w-full py-[20px] mr-[10px] text-gray border-[2px] outline-none mb-[10px]" />
                        <input @input="(e) => userData.appartaments_num = e.target.value" type="text" placeholder="Номер квартиры" class="px-[15px] w-full  py-[20px] text-gray border-[2px] outline-none mb-[10px]" />
                      </div>
                      <button class="py-[20px] w-full bg-black text-white" @click="() => changeItem('2')">Перейти к оплате</button>
                  </div>
              </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
              <AccordionHeader>3 Оплата</AccordionHeader>
              <AccordionContent>
                  <div class="flex flex-col">
                    <input type="text" @input="(e) => userData.card_num = e.target.value" placeholder="Номер карты" class="px-[15px] w-full  py-[20px] text-gray border-[2px] outline-none mb-[10px]">
                    <div class="flex">
                      <input type="text" @input="(e) => userData.card_expire = e.target.value" placeholder="Месяц / Год" class="mr-[10px] px-[15px] w-full  py-[20px] text-gray border-[2px] outline-none mb-[10px]">
                      <input type="text" @input="(e) => userData.cvv = e.target.value" placeholder="CVV код" class="px-[15px] w-full  py-[20px] text-gray border-[2px] outline-none mb-[10px]">
                    </div>
                    <button class="py-[20px] w-full bg-black text-white">Сделать покупку</button>
                  </div>
              </AccordionContent>
          </AccordionPanel>
      </Accordion>
      </div>
      <div class="main__right py-[40px] px-[80px]">
        <span class="uppercase font-bold">Итог заказа</span>
        <div class="products">
          <div class="product" v-if="cart && cart.value !== undefined" v-for="product in cart.value">
            <NuxtImg :src="product.choice.cardImageUrl"/>
            <div class="">
              {{ product.choice.name }}
              <div class="">{{ product.choice.quantity }}</div>
            </div>
            <div class="">${{ product.choice.price }}</div>
          </div>
        </div>
        <div class="" v-if="cart && cart.value.length !== 0">
          <div class="border-left-1">
            Если у вас имеется промокод, введите его, чтобы получить скидку
            <div class="">
              <input type="text" placeholder="Подарочный промокод"/>
              <button>Apply</button>
            </div>
          </div>
          <div class="">
            <div class="">
              <span>Цена:</span>
              <span>{{ getTotalPrice(cart) }}</span>
            </div>
            <div class="">
              <span>Доставка:</span>
              <span>0.00</span>
            </div>
          </div>
          <div class="main__total">
            <span>Всего:</span>
            <span>{{ getTotalPrice(cart) }}</span>
          </div>
        </div>
        <div class="class text-center" v-else>
          <Title>У вас нет товаров в корзине</Title>
          <Title><NuxtLink to="/">Посетить магазин</NuxtLink></Title>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
  
</template>

<script setup>
  import Footer from '~/assets/shared/Footer.vue';
  import Header from '~/assets/shared/Header.vue';
  import Title from '~/assets/shared/Title.vue';

  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';

  let userData = reactive({
    name: ref(),
    email: ref(),
    phone_num: ref(),
    reciever_name: ref(),
    reciever_phone: ref(),
    delivery_date: ref(),
    delivery_time: ref(),
    street: ref(),
    appartaments_num: ref(),
    card_num: ref(),
    card_expire: ref(),
    cvv: ref(),
  });

  const currentItem = ref("0");

  let cart = ref();

  onMounted(() => {
    cart.value = useCookie('cart');
    if(!cart) cart.value = [];

    console.log(cart)
  });

  function changeItem(item) {
    currentItem.value = item;
    console.log(currentItem);  
  }
  
  function getTotalPrice(cart) {
    return cart.value.reduce((acc, val) => {
      return acc + Number( val.choice.price * val.quantity);
    }, 0);
  }
</script>

<style>
  main > * {
    background-color: white;
  }
</style>