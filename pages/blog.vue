<template>
    <title>Блог</title>
    <div class="index bg-black grid gap-[1px]">
        <Header />
        <div>
            <template v-for="post in posts">
                <PostElement :src="post.src" :title="post.title" :text="post.text" />
            </template>
        </div>
        <Footer />
    </div>
</template>

<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';

    const {status, data: posts} = await $fetch("/api/posts");

</script>