<template>
    <main class="Main font-montserrat md:grid flex flex-col grid-cols-1 md:grid-cols-2 gap-[1px] bg-black">
            <div class="main__title_wrapper md:row-span-5">
                <div class="main-title__left border-b-[1px] border-black pt-[79px] pb-[80px] px-[80px]">
                    <div class="title-wrap grid grid-rows-2 gap-[1px] bg-black">
                        <div class="main__title-wrap">
                            <Title>Киевские люксовые букеты</Title>
                            <div v-for="post in posts">
                                {{ post.fullName }}
                                {{ post.email }}
                            </div>
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
                <p>our story</p>
                <h3 class="text-[38px] font-bold mt-[16px] mb-[24px]">Киевские люксовые букеты</h3>
                <p>We are a modern local floral studio, which specializes in the design and delivery of unique bouquets. We have the best florists who carefully select each look, our studio cooperates directly with farms for growing different flowers, so we always have fresh flowers, which are collected by our florists in exquisite bouquets. We have a collection of fresh bouquets, collections of dried bouquets, house plants, as well as fragrant candles from luxury brands to create the perfect atmosphere. Make someone's day amazing by sending flowers, plants and gifts the same or next day. Ordering flowers online has never been easier.</p>
                <button class="border border-black py-[20px] px-[43px] mt-[64px]">Узнать больше</button>
            </div>
            <div class="main__choose_left p-[80px]">
                <SubTitle>Зачем выбирать нас?</SubTitle>
            </div>
            <div class="main__choose_right grid grid-rows-4 gap-[1px] !bg-black">
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Стиль флористов</h3>
                    <p>At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service.</p>
                </div>
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Доставка вовремя</h3>
                    <p>At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service.</p>
                </div>
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Безопасная оплата</h3>
                    <p>At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service.</p>
                </div>
                <div class="main__choose_option p-[80px]">
                    <h3 class="text-[38px]">Подписка для ваших нужд</h3>
                    <p>At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service.</p>
                </div>
            </div>
            <div class="main__contact grid gap-[1px] !bg-black">
                    <div class="p-[80px]">
                        <SubTitle>Связаться с нами</SubTitle>
                        <p class="mt-[24px] mb-[16px]">Мы рассмотрим вашу заявку</p>
                        <form class="main__contact_input flex">
                            <input type="phone" class="px-[15px] py-[20px] border text-gray mr-[16px] outline-0" placeholder="+380 XX XXX XX XX" >
                            <button class="px-[80px] py-[20px] text-white bg-black">Записаться</button>
                        </form>
                    </div>
                    <div class="grid grid-rows-3 grid-cols-2 gap-[1px] !bg-black">
                        <p class="bg-white py-[16px] text-center">phone</p>
                        <p class="bg-white py-[16px] text-center">address</p>
                        <div class=" !bg-white flex flex-col justify-center items-center row-span-2">
                            <p>88005553535</p>
                            <p>88005553535</p>
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
            <div class="main__subscribtion px-[80px] flex flex-col items-center justify-center text-center">
                <p>Сервис</p>
                <SubTitle>Подписка на цветы</SubTitle>
                <p class="mb-16">Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.</p>
                <button class="px-[40px] py-[20px] text-black bg-white border border-black uppercase">Записаться</button>
            </div>
            <div class="main__wedding col-span-2 py-[200px] flex flex-col !text-white justify-center text-center items-center" :style="{ backgroundImage: `url(${backgroundUrl})` }">
                <p>Сервис</p>
                <SubTitle>Свадьбы & Мероприятия</SubTitle>
                <p class="mb-16">Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.</p>
                <button class="px-[40px] py-[20px] bg-none border border-white uppercase">Записаться</button>
            </div>
            <div class="main__clients col-span-2 flex flex-col justify-center items-center p-[80px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 32 32">
                    <g fill="none" fill-rule="evenodd">
                        <circle cx="16" cy="16" r="16" fill="#bfbbbb" />
                        <path fill="#fff" d="M10.427 19.214L9 19.768l.688-2.759l1.444-.58L13.213 8h5.129l-1.519 6.196l1.41-.571l-.68 2.75l-1.427.571l-.848 3.483H23L22.127 24H9.252z" />
                    </g>
                </svg>
                <p class="mt-[10px]">Отзывы</p>
                <SubTitle class="mt-[24px] mb-[16px]">Отзывы наших клиентов</SubTitle>
                <div class="reviews__wrapper flex text-[24px]">
                    <Carousel :num-scroll="1" :num-visible="1" :value="products" containerClass="text-center text-3xl font-medium">
                        <template #item="slotProps">
                            <p>"{{ slotProps.data.text }}"</p>
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
    
    // TODO: fetch rewiews from google api

    const products = ref([
        {id: 1488, text: "Those flowers are the best. I'll buy it later again", author: "Jeff"},
        {id: 65465, text: "Another one good review about those flowers. Those flowers are the best and you should buy it, or you'll be dead", author: "Sam"},
        {id: 228, text: "LOrem ipsum dolor sit amet commit another one bite the dust queen lol", author: "John"},
    ])

    const posts = await useFetch("/api/user");
</script>

<style scoped>
    .Main > *, .main__choose_right > *, .main__contact_inner > *, .main__contact > *, .title-wrap > * {
        background: white;
    }
    
</style>