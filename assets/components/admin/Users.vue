<template>
  <p>Пользователи</p>
  <b>Пользователи нашего сервиса</b>
  <div>
    <DataTable selectionMode="single" :value="users" tableStyle="min-width: 50rem" @rowSelect="(e) => changeCurrentUser(e)">
      <Column field="id" header="ID"></Column>
      <Column field="login" header="Логин"></Column>
      <Column field="fullName" header="Имя"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="..." header="Хеш пароля"></Column>
      <Column field="isAdmin" header="Администратор?"></Column>
      <Column field="..." header="Текущий JWT"></Column>
      <Column field="createdAt" header="Дата создания аккаунта"></Column>
      
    </DataTable>
  </div>

</template>

<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Dialog from 'primevue/dialog';

  class User {
    constructor(id=null, login="", fullName="", email="", pass="", isAdmin=false, jwt="") {
      this.id = id;
      this.login = login;
      this.fullName = fullName;
      this.email = email;
      this.pass = pass;
      this.isAdmin = isAdmin;
      this.jwt = jwt;
    }
  }

  const { users } = defineProps(['users']);

  const isUserChange = ref(false);
  const currentUser = reactive({});
  currentUser.value = new User();

  function changeCurrentUser(e) {
    isUserChange = true;
    currentUser.value = e.data;

    
  }

</script>

<style>

</style>