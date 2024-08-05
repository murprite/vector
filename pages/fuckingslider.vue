<template>
  <Carousel :value="products" :numVisible="1" :numScroll="1">
                        <template #item="product" class="">
                            <div class="w-[100vw]">
                                <div class="">{{ "пидорские компоненты созданные пидорами блядскими  в рот их еьал, не могут нормально натянуть ситли на свою блядскую зхуету для умственно отсталых. олигофрены обоссаные" }}</div>
                            <div class="">{{ "prime vue сделано хуесосами за 300 рублей" }}</div>
                            </div>
                        </template>
                    </Carousel>
</template>

<script setup>
    const products = ref([
        {id: 1488, text: "lorem ipsum dolor sit amet", author: "some faggot"},
        {id: 65465, text: "lorem ipsum dolor sit amet", author: "another faggot"},
        {id: 228, text: "lorem ipsum dolor sit amet", author: "third faggot"},
    ])
</script>

<style>

</style>