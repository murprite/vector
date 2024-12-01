<template>
    <div class="index grid">
        <title>Свечи</title>

        <Header />
        <div class="grid grid-cols-1 md:grid-cols-2 border border-black border-l-0 border-r-0" v-if="status !== 'pending' && products.length !== 0">
            <div class="bg-[url(/fresh-flowers.png)] bg-no-repeat bg-cover bg-white">
                <p class="text-[4rem] text-white text-center my-[260px]">Свечи</p>
            </div>
            <div class="products__wrapper grid grid-cols-2 grid-rows-2">
                <template v-if="status !== 'pending'" v-for="product in products">
                    <ProductCard :product />
                </template>
            </div>
        </div>
        <template v-else>
            <Empty />
        </template>
        <Footer />
    </div>  
</template>

<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';

    import ProductCard from '~/assets/shared/ProductCard.vue';
import Empty from '~/assets/shared/Empty.vue';

    const { status, data: products } = await $fetch("/api/products", {
        query: {flowersType: 1}
    });

</script>