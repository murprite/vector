<template>
    <title>Высушенные цветы</title>
    <div class="index grid">
        <Header />
        <div class="grid grid-cols-1 md:grid-cols-2 border border-black border-l-0 border-r-0" v-if="status !== 'pending' && products.length !== 0">
            <div class="bg-[url(/fresh-flowers.png)] bg-no-repeat bg-cover bg-white">
                <p class="text-[4rem] text-white text-center my-[260px]">Высушенные цветы</p>
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
    import Empty from '~/assets/shared/Empty.vue';

    import ProductCard from '~/assets/shared/ProductCard.vue';

    const { status, data: products } = await useFetch("/api/products", {
        query: {flowersType: 3}
    });

</script>