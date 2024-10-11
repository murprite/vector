<template>
    <div class="index bg-black grid gap-[1px]">
        <Header />
        <Footer />
    </div>
</template>

<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';

    const products = await $fetch("/api/products");

</script>