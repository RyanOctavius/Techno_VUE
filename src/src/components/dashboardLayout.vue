<template>
  <div>
    <v-navigation-drawer v-model="drawer" class="white" clipped fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <img src="https://i.ytimg.com/vi/QzqkApf1cho/hqdefault.jpg" style="height:130px;width:70px;border-radius:10px" />
          <v-list-item-title class="title">Welcome</v-list-item-title>
          <v-list-item-subtitle>{{ this.$session.get('username') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" >
          <v-list-item-icon>
            <v-icon color="blue">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout()" class="error">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar dark app fixed clipped-left height="70px" color="blue darken-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />

      <v-icon size="40"> mdi-emoticon-poop mdi-spin</v-icon>

      <v-toolbar-title style="font-size: 21px;" class="white--text ml-2">PAW KELOMPOK 3</v-toolbar-title>
    </v-app-bar>
    <VContent>
      <router-view />
    </VContent>
  </div>
</template>
<script>
import VueSession from 'vue-session'
export default {
  data() {
    return {
      drawer: null,
       items: [
                { title: "User", icon: "mdi-human-male", name:'userController', link:'/user'},
                {title: "Car", icon: "mdi-car", name:'mobilController', link:'/mobil'},
                {title: "Motorcycle", icon: "mdi-motorbike", name:'motorController', link:'/motor'},
                {title: "Cart", icon: "mdi-cart", name:'cartController', link:'/cart'},
                {title: "Service", icon: "mdi-wrench", name:'serviceController', link:'/service'},
                {title: "Maps", icon:"mdi-map", name:'mapController',link:'/map'}
                ]

    };
  },
  methods:{
    logout() {
      this.$session.destroy();
      this.$router.push('/');
    }
  }
};
</script>