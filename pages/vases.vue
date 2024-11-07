<template>
    <title>Вазы</title>
    <div class="index bg-black grid">
        <Header />
        <div class="grid grid-cols-1 md:grid-cols-2" v-if="status !== 'pending' && products.length !== 0">
            <div class="bg-[url(/fresh-flowers.png)] bg-no-repeat bg-cover bg-white">
                <p class="text-[4rem] text-white text-center my-[260px]">Вазы</p>
            </div>
            <div class="grid grid-cols-2 gap-[1px] bg-white">
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
    import Empty from '~/assets/shared/Empty.vue';

    import ProductCard from '~/assets/shared/ProductCard.vue';

    const {status, data: products} = await useFetch("/api/products", {
        query: {flowersType: 3}
    });

</script>