<template>
    <main class="Main text-black font-montserrat md:grid flex flex-col grid-cols-1 md:grid-cols-2 gap-[1px] bg-black max-w-[100vw]">
            <div class="main__title_wrapper md:row-span-5">
                <div class="main-title__left border-b-[1px] border-black pt-[79px] pb-[80px] px-[80px]">
                    <div class="title-wrap grid grid-rows-2 gap-[1px] bg-black">
                        <div class="main__title-wrap">
                            <Title class="text-[3.2rem]">Люксовые букеты</Title>
                            <p class="mt-6">Открой для себя уникальные букеты и подарки для любого повода: порадуй всех с <i>нашей онлайн доставкой</i></p>
                        </div>
                        <div class="grid grid-cols-2 border-black">
                            <div class="">
                                <img src="~/public/img.png" alt="Букеты" class="w-full pt-[24px] pr-[24px]">
                            </div>
                            <div class="border-l-[1px] mt-[24px] border-black ml-6 h-100 flex justify-items-end">
                                <p class="mt-auto pl-[24px] block text-[14px]">Ощутите радость дарения с нашей современной студии флоры. Закажите онлайн и отправьте растения и подарки сегодня.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-title__right md:row-span-5 grid gap-[1px] !bg-black">
                    <MainCard text="Свежие цветы" card-url="/item.png" url="/fresh-flowers" />
                    <MainCard :inverted="true" text="Высушенные цветы" card-url="/item-1.png" url="/dried-flowers" />
                    <MainCard text="Живые цветы" card-url="/item-2.png" url="/live-flowers" />
                    <MainCard :inverted="true" text="Ароматические цветы" card-url="/item-3.png" url="/live-flowers" />
            </div>
            <div class="main__about_left p-[80px]">
                <SubTitle>О нас</SubTitle>    
            </div>
            <div class="main__about_right p-[80px]">
                <h3 class="text-[3.3rem] font-bold mt-[16px] mb-[24px]">Люксовые букеты</h3>
                <p>Мы современная местная флористическая студия, которая специализируется на разработке и доставке уникальных букетов. У нас работают лучшие флористы, которые тщательно подбирают каждый образ, наша студия напрямую сотрудничает с хозяйствами по выращиванию разных цветов, поэтому у нас всегда есть свежие цветы, которые наши флористы собирают в изысканные букеты. У нас есть коллекция свежих букетов, коллекции засушенных букетов, комнатных растений, а также ароматные свечи от люксовых брендов для создания идеальной атмосферы. Сделайте чей-то день удивительным, отправив цветы, растения и подарки в тот же или на следующий день. Заказать цветы онлайн еще никогда не было так просто.</p>
                <button class="border border-black  mt-[64px]">
                    <NuxtLink to="/about" class="w-full h-full block py-[20px] px-[43px]">Узнать больше</NuxtLink>
                </button>
            </div>
            <div class="main__choose_left p-[80px]">
                <SubTitle>Зачем выбирать нас?</SubTitle>
            </div>
            <div class="main__choose_right grid grid-rows-4 gap-[1px] !bg-black">
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Стиль флористов</h3>
                    <p>В нашей цветочной студии профессиональные флористы создают самые элегантные и стильные букеты, используя только самые свежие и качественные материалы. Мы следим за последними тенденциями цветочного дизайна и предлагаем уникальные композиции, которые обязательно произведут впечатление. Позвольте нам украсить ваш день нашими потрясающими букетами и службой доставки в тот же день.</p>
                </div>
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Доставка вовремя</h3>
                    <p>В нашей цветочной студии профессиональные флористы создают самые элегантные и стильные букеты, используя только самые свежие и качественные материалы. Мы следим за последними тенденциями цветочного дизайна и предлагаем уникальные композиции, которые обязательно произведут впечатление. Позвольте нам украсить ваш день нашими потрясающими букетами и службой доставки в тот же день.</p>
                </div>
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Безопасная оплата</h3>
                    <p>В нашей цветочной студии профессиональные флористы создают самые элегантные и стильные букеты, используя только самые свежие и качественные материалы. Мы следим за последними тенденциями цветочного дизайна и предлагаем уникальные композиции, которые обязательно произведут впечатление. Позвольте нам украсить ваш день нашими потрясающими букетами и службой доставки в тот же день.</p>
                </div>
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Подписка для ваших нужд</h3>
                    <p>В нашей цветочной студии профессиональные флористы создают самые элегантные и стильные букеты, используя только самые свежие и качественные материалы. Мы следим за последними тенденциями цветочного дизайна и предлагаем уникальные композиции, которые обязательно произведут впечатление. Позвольте нам украсить ваш день нашими потрясающими букетами и службой доставки в тот же день.</p>
                </div>
            </div>
            <div class="main__contact grid gap-[1px] !bg-black">
                    <div class="p-[80px]">
                        <SubTitle>Связаться с нами</SubTitle>
                        <p class="mt-[24px] mb-[16px]">Мы рассмотрим вашу заявку</p>
                        <form class="main__contact_input flex">
                            <input type="phone" @input="(e) => handleValidation(e, /\+7\d{10}/)" class="px-[15px] py-[20px] border text-gray mr-[16px] outline-0" placeholder="+7XXX-XXX-XX-XX" maxlength="12">
                            <button class="px-[80px] py-[20px] text-white bg-black" @click="(e) => sendTicket(e)">Записаться</button>
                        </form>
                    </div>
                    <div id="contacts" class="grid grid-rows-3 grid-cols-2 gap-[1px] !bg-black">
                        <p class="bg-white py-[16px] text-center pt-auto pb-auto flex justify-center items-center"><b>Телефоны</b></p>
                        <p class="bg-white py-[16px] text-center pt-auto pb-auto flex justify-center items-center"><b>Адреса</b></p>
                        <div class=" !bg-white flex flex-col justify-center items-center row-span-2">
                            <p>+786545421876</p>
                            <p>+786545421876</p>
                        </div>
                        <div class=" !bg-white flex flex-col justify-center items-center row-span-2">
                            <p>Открыт с 8:00 до 23:00</p>
                            <p>38°52′15″ с. ш. 77°03′21″ з. д.</p>
                        </div>
                    </div>
                </div>
            <div class="main__contactImg grid gap-[1px] bg-black "> 
                <NuxtImg src="./column.png" class="w-full"/>
                <div class="main__contact_inner grid grid-cols-2 gap-[1px] bg-black">
                    <button>Присоединяйся к нам</button>
                    <div class="py-[28px] px-[60px] flex justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517"/></svg>
                    </div>
                </div>
            </div>
            <div class="main__service col-span-2">
                <SubTitle class="text-center my-[80px]">Наши услуги</SubTitle>
            </div>
            <div class="main__subscribtionImg">
                <NuxtImg src="./image.png" class="w-full" /> 
            </div>
            <div class="main__subscribtion px-[80px] flex flex-col items-center justify-center text-center py-[15px]">
                <p>Сервис</p>
                <SubTitle>Подписка на цветы</SubTitle>
                <p class="mb-16">Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.</p>
                <button class="px-[40px] py-[20px] text-black bg-white border border-black uppercase">Записаться</button>
            </div>
            <div class="main__wedding max-w-[100vw] col-span-2 py-[200px] flex flex-col !text-white justify-center text-center items-center" :style="{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover' }">
                <p>Сервис</p>
                <SubTitle>Свадьбы & Мероприятия</SubTitle>
                <p class="mb-16">Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.</p>
                <button class="px-[40px] py-[20px] bg-none border border-white uppercase">Записаться</button>
            </div>
            <div class="main__clients col-span-2 flex flex-col justify-center items-center p-[60px] text-center max-w-[100vw]">
                <p class="mt-[10px]">Отзывы</p>
                <SubTitle class="mt-[24px] mb-[16px]">Отзывы наших клиентов</SubTitle>
                <div class="reviews__wrapper flex text-[24px] max-w-[100vw]">
                    <Carousel :num-scroll="1" :num-visible="1" :value="products" containerClass="text-center text-3xl font-medium max-w-[80vw]">
                        <template #item="slotProps">
                            <p class="max-w-[90vw]">"{{ slotProps.data.text }}"</p>
                            <p>- {{ slotProps.data.author }}</p>
                        </template>
                    </Carousel>
                </div>
                <button class="px-[80px] py-[20px] text-black bg-white border border-black uppercase text-medium">Отзывы</button>
            </div>
        </main>
</template>

<script setup>
    import Title from '../shared/Title.vue';
    import MainCard from '../shared/MainCard.vue';
    import SubTitle from '../shared/SubTitle.vue';
    import Carousel from 'primevue/carousel';

    import backgroundUrl from "~/public/wedding_img.png";
    
    // TODO: fetch rewiews from DB/google/someothershit, or leave it like that
    async function handleValidation(e, regexp) {
        let elem = e.target;
        let currentValue = e.target.value;
        let regex = new RegExp(regexp);
        console.log(regex.test(currentValue))
        if(!regex.test(currentValue)) {
            elem.style.border = "1px solid red";
        } else {
            elem.style.border = "1px solid gray";
        }
        let formdata = new FormData();
        formdata.append("text", currentValue);
        
        let response = await checkSwearing(formdata);

        console.log("Зафиксирован мат")
        console.log("changed value")
    }

    async function checkSwearing(formdata) {
        return await $fetch("https://db_neiro_filter_apis.db-of.ru:2053/api/mat", {
            method: "POST",
            body: formdata,
        });
    }
    console.log(await checkSwearing());
    
    const products = ref([
        {id: 1488, text: "Хорошие цветы, доставка пришла быстро", author: "Jeff"},
        {id: 65465, text: "Хорошие цветы, доставка пришла быстро, дополнительный текст", author: "Sam"},
        {id: 228, text: "Хорошие цветы, доставка пришла быстро, дополнительный текст и ещё один дополнительный текст", author: "John"},
    ])
    

    function sendTicket(e) {
        e.preventDefault();
        if(!phone.value) return;

        console.log(phone.value);
        // TODO: send it at some mail;
        
    }

</script>

<style scoped>
    .Main > *, .main__choose_right > *, .main__contact_inner > *, .main__contact > *, .title-wrap > * {
        background: white;
    }
    
    * {
        scroll-behavior: smooth;
    }
</style>