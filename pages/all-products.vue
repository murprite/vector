<template>
    <div class="index bg-black grid gap-[1px]">
        <Header />
        <div class="grid bg-black gap-[1px] grid-cols-1 md:grid-cols-2">
            <div class="main__title-wrap row-span-5 bg-white">
                <NuxtImg src="/fresh-col.png" class="w-full" />
            </div>
            <div class="main-title__right md:row-span-5 grid gap-[1px] !bg-black" >
                <template v-for="product in products" v-if="status !== 'pending'">
                    <ProductCard :text="product.name" :card-url="product.imageUrl" :url="'/products/' + product.id"  />
                </template>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';
    import MainCard from '~/assets/shared/MainCard.vue';

    const { status, data: products } = await useLazyFetch('/api/products')

</script>