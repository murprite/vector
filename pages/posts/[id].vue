<script setup>
    
import Header from '~/assets/shared/Header.vue';
import Footer from '~/assets/shared/Footer.vue';
import Empty from '~/assets/shared/Empty.vue';
import Title from '~/assets/shared/Title.vue';

const id = useRoute().params.id;
const {status, data: post} = await useFetch("/api/posts/getPostByID", {
    method: "GET",
    params: {id}
});



</script>

<template>
    <title>{{ post.title }}</title>
    <Header/>
    <div class="p-[50px] border border-black">  
        <template v-if="status === 'success'">
            <div class="flex">
                <div class="max-w-[60vw] text-[1.2rem]">
                    <div class="border-b mb-[15px] border-black">
                        <Title class="text-[2.2rem] my-[15px]">{{ post.title }}</Title>
                    </div>
                    <div class="">
                        <b>Аннотация: </b>{{ post.annotation }}
                    </div>
                    <div class="my-[30px]">
                        {{ post.text }}
                    </div>
                    <div class="">
                        <p class="text-gray-500">Пост был сделан: {{ post.createdAt }}</p>
                    </div>
                </div>
                <div class="w-full ml-[100px]">
                    <NuxtImg :src="post.mainImageUrl" class="h-[100%] w-[100%]"/> 
                </div>
            </div>
        </template>
        <template v-else-if="status === 'pending'">
        
        </template>
        <template v-else>
            <Empty />
        </template>
    </div>
    <Footer/>
</template>