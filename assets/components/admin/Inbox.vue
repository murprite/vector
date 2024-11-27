<template>
  <div>
    <p>Вся почта пользователей</p>
    <b>Почтовый ящик сервиса</b>
    <DataTable selectionMode="single" :value="inbox" tableStyle="min-width: 50rem" @rowSelect="(e) => showInbox(e)">
      <Column field="user" header="Пользователь"></Column>
      <Column field="title" header="Тема"></Column>
      <Column field="email" header="Почта"></Column>
      <Column field="createdAt" header="Время отправки"></Column>
      <Column>
        <template #body="{ data }">
          <Button icon="pi pi-times"  @click="deleteInbox(data.id)" severity="danger" rounded></Button>
        </template>
      </Column>  
    </DataTable>
  </div>
  <Dialog v-model:visible="isSelectedRow" :header="currentInbox.value.title" modal>
    {{ currentInbox.value.text  }}
  </Dialog>
</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import ColumnGroup from 'primevue/columngroup';   
  import Row from 'primevue/row';

  import ServerAPI from '~/assets/constants/ServerAPI';
  import Dialog from 'primevue/dialog';

  class Inbox {
    constructor(text="", user="", email="", title="", id=null) {
      this.text = text;
      this.user = user;
      this.email = email;
      this.title = title;
      this.id = id;
    }
  }
  
  const { inbox, jwt } = defineProps(["inbox", "jwt"]);
  const emit = defineEmits(['updateItems']);

  const $server = new ServerAPI(jwt);

  const currentInbox = reactive({});
  currentInbox.value = new Inbox();

  const isSelectedRow = ref(false);

  function showInbox(e) {
    currentInbox.value = e.data;
    isSelectedRow.value = true;
  }

  async function deleteInbox(id) {
    const response = await $server.deleteServerInbox(id);
    emit("updateItems");
  }

</script>

<style>

</style>