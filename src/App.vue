<template>
  <v-app style="background-color:whitesmoke">
    <v-content>
      <router-view>
      </router-view>
    </v-content>
  </v-app>
</template>
<script>
  export default {
    name: 'app',
    alert: false
  }
</script>