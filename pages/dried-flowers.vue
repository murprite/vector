<template>
    <title>Высушенные цветы</title>
    <div class="index bg-black grid gap-[1px]">
        <Header />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            <div class="bg-no-repeat relative bg-white">
                <NuxtImg src="./fresh-flowers.png"  class="w-full" />
                <p class="text-[4rem] text-white absolute top-0 text-center my-[260px]">Высушенные цветы</p>
            </div>
            <div class="grid grid-cols-2 gap-[1px]">
                <template v-if="status !== 'pending'" v-for="product in products">
                    <ProductCard :product />
                </template> 
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';

    import ProductCard from '~/assets/shared/ProductCard.vue';

    const { status, data: products } = await useFetch("/api/products", {
        query: {flowersType: 3}
    });

</script>