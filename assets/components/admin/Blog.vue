<template>
  <div class="blog">
    <p>Последние статьи</p>
    <b class="text-2xl">Блог</b>
    <DataView :value="blogs">
      <template #header>
        <div class="flex justify-between items-center">
          <Button @click="() => isAddPost = true" label="Добавить" icon="pi pi-plus" class="ml-auto" />
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
              <div class="md:w-40 relative">
                {{ item.title }}
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">
                      {{ item.createdAt }}</span>
                    <div class="text-lg font-medium mt-2">{{ item.annotation }}</div>
                  </div>
                  <div class="bg-surface-100" style="border-radius: 30px">
                    <div class="bg-surface-0 flex items-center justify-center">
                      {{ item.text }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-trash" class="!bg-[#f40000] hover:!bg-[#a40000] border !border-red-700"
                      @click="() => deletePost(item.id)"></Button>
                    <Button icon="pi pi-pencil" label="Изменить" class="flex-auto md:flex-initial whitespace-nowrap"
                      @click="() => changePost(item)"></Button>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <Dialog v-model:visible="isAddPost" header="Добавить пост" modal>
      <div class="flex flex-col gap-[15px] w-[90wv] h-[90vh]">
        <InputGroup>
          <InputGroupAddon>
            <span>Название поста</span>
          </InputGroupAddon>
          <InputText v-model="postTemp.value.title" placeholder="Название" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <span>Аннотация</span>
          </InputGroupAddon>
          <InputText v-model="postTemp.value.annotation" placeholder="Описание" />
        </InputGroup>
        <div class="flex gap-[15px]">
          <Editor v-model="editorValue" editorStyle="height: 640px; width: 720px;" />
        </div>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-model="postTemp.value.mainImageUrl" placeholder="Ссылка на превью (./preview-1.png)" />
          <NuxtImg :src="postTemp.value.mainImageUrl" class="w-[180px] h-[180px]"
            onerror="this.src='/_ipx/_/./Default.png" />
        </InputGroup>

        <Button label="Создать пост" class="h-[30px]" @click="() => addPost(postTemp)"></Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="isChangePost" header="Добавить пост" modal>
      <div class="flex flex-col gap-[15px] w-[90wv] h-[90vh]">
        <InputGroup>
          <InputGroupAddon>
            <span>Название поста</span>
          </InputGroupAddon>
          <InputText v-model="postTemp.value.title" placeholder="Название" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <span>Аннотация</span>
          </InputGroupAddon>
          <InputText v-model="postTemp.value.annotation" placeholder="Описание" />
        </InputGroup>
        <div class="flex gap-[15px]">
          <Editor v-model="editorValue" editorStyle="height: 640px; width: 720px;" />
        </div>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-model="postTemp.value.mainImageUrl" placeholder="Ссылка на превью (./preview-1.png)" />
          <NuxtImg :src="postTemp.value.mainImageUrl" class="w-[180px] h-[180px]"
            onerror="this.src='/_ipx/_/./Default.png" />
        </InputGroup>

        <Button label="Изменить пост" class="h-[30px]" @click="() => updatePost(postTemp.value)"></Button>
      </div>
    </Dialog>
</template>

<script setup>
  import ServerAPI from '~/assets/constants/ServerAPI';
  import Editor from 'primevue/editor';

  const { blogs, jwt } = defineProps(['blogs', 'jwt']);
  const emit = defineEmits(['updateItems']);

  const $server = new ServerAPI(jwt);
  const editorValue = ref();
  
  class Post {
    constructor(title='Заголовок', annotation="Аннотация", mainImageUrl="./preview.png", text=editorValue.value, imagesUrl="./preview.png", id=null) {
      this.title = title;
      this.annotation = annotation;
      this.mainImageUrl = mainImageUrl;
      this.text = text;
      this.id = id;
      this.imagesUrl = imagesUrl;
    }
  }

  const postTemp = reactive({});
  postTemp.value = new Post();

  const isChangePost = ref(false);
  const isAddPost = ref(false);

  async function deletePost(id) {
    const post = await $server.deleteServerPost(id);
    emit("updateItems");

    return post;
  }

  async function updatePost(item) {
    let post = new Post(item.title, item.annotation, item.mainImageUrl, editorValue.value, "", item.id);
    postTemp.value = {};

    const response = await $server.updateServerBlog(post);
    emit("updateItems");

    isChangePost.value = false;
    return response;
  }  

  async function addPost(post) {
    post.value.text = editorValue.value;
    editorValue.value = "";
    
    const response = await $server.createServerBlog(post.value);
    emit("updateItems");

    isAddPost.value = false;
    return response;
  }

  function changePost(item) {
    postTemp.value = item;
    editorValue.value = postTemp.value.text;

    isChangePost.value = true;
  }
</script>
