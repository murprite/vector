<template>
    
    <div class="Postelement flex flex-col items-stretch justify-start">
        <NuxtLink :to="'/posts/' + id">
            <Title>{{ title }}</Title>
        </NuxtLink>
        <NuxtImg :src="'/post-' + id "/>
        <hr>
        <p>{{  text.slice(0, 50)  }}</p>    
        
    </div>

</template>

<script setup>
    import Title from './Title.vue';
    const {text, title, src, id} = defineProps(['text', 'title', 'src', 'id']);
</script>