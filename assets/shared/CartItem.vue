<template>
    <ClientOnly >
        <div class="CartItem flex my-[10px]">
            <NuxtLink :to="`/products/${id}`">
                <NuxtImg :src="cardImageUrl" class="CardItem__image max-w-[100px] border border-black" />
            </NuxtLink>
            <div class="CardItem__info ml-[15px]">
                <Title>{{ name }}</Title>
                <p>{{ description }}</p>
                
            </div>
            <div class="CardItem__count flex flex-col ml-auto align-top">
                <b class="text-right">Цена: {{ price }}₽</b>
                <p class="my-[10px]">Количество: {{ count }} ({{ price * count}}₽)</p>
                <button class="w-full border mb-[15px] hover:bg-black transition p-[5px] text-center bottom-0 right-0 hover:text-white" @click="$emit('removeCartItem', id)">Удалить</button>

            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
    import Title from './Title.vue';

    let props = defineProps(['product', 'count']);

    let {name, price, description, cardImageUrl, id} = props.product;
    let count = props.count;
</script>