<template>
    <title>Высушенные цветы</title>
    <div class="index bg-black grid gap-[1px]">
        <Header />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-black">
            <div class="bg-[url(/fresh-flowers.png)] bg-no-repeat bg-white">
                <p class="text-[4rem] text-white text-center my-[260px]">Высушенные цветы</p>
            </div>
            <div class="grid grid-cols-2 gap-[1px] bg-black">
                <template v-if="status !== 'pending'" v-for="product in products">
                    <ProductCard :text="product.name" :price="product.price" :id="product.id" :imageUrl="product.imageUrl.slice(1, product.imageUrl.length)" />
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
        query: {flowersType: 1}
    });

</script>