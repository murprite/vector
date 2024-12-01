<template>
    <div class="index bg-black grid gap-[1px]">
        <title>Блог</title>

        <Header />
        <div v-if="status === 'success'">
            <template v-for="post in posts">
                <PostElement :post />
            </template>
        </div>
        <div v-else-if="status === 'pending'">
            
        </div>
        <div class="" v-else>
            <Empty />   
        </div>
        <Footer />
    </div>
</template>

<script setup>
    import Header from '~/assets/shared/Header.vue';
    import Footer from '~/assets/shared/Footer.vue';
    import Empty from '~/assets/shared/Empty.vue';
    import PostElement from '~/assets/shared/PostElement.vue';


    const {status, data: posts} = await useFetch("/api/posts", {
        method: "GET"
    });

</script>