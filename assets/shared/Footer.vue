<template>
  <footer id="footer" class="grid grid-cols-2  md:grid-cols-4 gap-[1px] bg-black border-t-1 border-black">
    <div class="footer__email flex flex-col justify-center items-center p-[40px]">
      <p>Remember to offer beautiful flowers from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas... Reminds you 7 days before. No spam or sharing your address</p>
      <input type="email" @input="(e) => handleValidation(e, /[a-zA-z]+@[a-zA-z]+\.[a-zA-z]+/)" placeholder="Your Email" class="border outline-0 w-full py-[20px] px-[16px] mt-[24px] mb-[16px]">
      <button class="px-[80px] py-[20px] text-white bg-black" @click="(e) => sendEmail(e)">Записаться</button>
    </div>
    <div class="footer__contact p-[40px] flex flex-col justify-center">
      <p class="text-gray-500 text-[18px] mb-[24px]">Контакты</p>
      <p class="text-gray-500">Адрес</p>
      <p class="mb-[24px]">15/4 Boulevard Of Broken Dreams, New York</p>
      <p class="text-gray-500">Телефон</p>
      <p class="mb-[12px]">+786545421876</p>
      <p class="mb-[24px]">+786545421876</p>
      <p class="text-gray-500">Основная почта</p>
      <p class="mb-[24px]">luxflowers@gmail.com</p>
      <p class="text-gray-500">Подпишитесь на нас</p>
      <div class="py-[28px] flex justify-between">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
      </div>
    </div>
    <div class="footer__links p-[40px]">
      <p class="text-gray-500 text-[18px] mb-[24px]">Товары</p>
      <ul>
        <li><a href="/all-products">Все товары</a></li>
        <li><a href="/fresh-flowers">Свежие цветы</a></li>
        <li><a href="/dried-flowers">Высушенные цветы</a></li>
        <li><a href="/live-flowers">Живые цветы</a></li>
        <li><a href="/vases">Дизайнерские вазы</a></li>
        <li><a href="/candles">Ароматические свечи</a></li>
        <li><a href="/refreshers">Освежители воздуха</a></li>
      </ul>
      <p class="text-gray-500 text-[18px] mb-[24px] mt-[24px]">Услуги</p>
      <ul>
        <li><a href="/subscription">Подписка на цветы</a></li>
        <li><a href="/decoration-events">Свадьбы & Мероприятия декор</a></li>
      </ul>
    </div>
    <div class="footer__about p-[40px]">
      <p class="text-gray-500 text-[18px] mb-[24px]">О нас</p>
      <ul>
        <li><a href="/about">О нас</a></li>
        <li><a href="/blog">Блог</a></li>
      </ul>
      <ul class="mt-[24px]">
        <li><a href="/delivery">Доставка & возвраты</a></li>
        <li><a href="/">Оферта</a></li>
        <li><a href="/agreement">Пользовательское соглашение</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
  import SubTitle from './SubTitle.vue';

  const isEmailVerif = ref(false);

  function handleValidation(e, regexp) {
        let elem = e.target;
        let currentValue = e.target.value;
        let regex = new RegExp(regexp);
        console.log(regex.test(currentValue))
        if(!regex.test(currentValue)) {
            elem.style.border = "1px solid red";
            isEmailVerif = false;
        } else {
            isEmailVerif = true;
            elem.style.border = "1px solid gray";
        }
    }
    function sendEmail(e) {
      e.preventDefault();
      if(!isEmailVerif) {
        return;
      }
      
    
    }
</script>
<style>
  Footer > * {
    background: white !important;
  }
</style>