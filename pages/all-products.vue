<template>
    <title>Все товары</title>
    <div class="index bg-black grid gap-[1px]">
        <Header />
        <div class=" bg-white h-[100%]">
            <div class="main-block md:row-span-5 md:grid-cols-4 gap-[1px] sm:grid-cols-2 grid" >
                <template v-for="product in products" v-if="status !== 'pending'">
                    <ProductCard :product />
                </template>
            </div>
        </div>
        <Footer />
    </div>
</template>
<style>
</style>
<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';
    import ProductCard from '~/assets/shared/ProductCard.vue';

    const { status, data: products } = await useFetch('/api/products', {
        method: "GET"
    });

    

</script>