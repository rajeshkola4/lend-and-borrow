<template>
  <v-container fluid pa-0>
    <v-navigation-drawer
      :clipped="true"
      :fixed="true"
      :permanent="true"
      v-model="drawer.open"
      app
    >
      <v-list dense>
        <v-list-item class="px-2">
          <v-list-item-title class="text-center">
            <v-icon color="primary" class="mx-2"> donut_large</v-icon>
            <span class="font-weight-bold text-overline">Lend & Borrow</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          active-class="primary--text"
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.path"
        >
          <v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense class="mb-4">
          <v-list-item>
            <v-avatar color="primary" size="40" class="mr-2">
              <span class="white--text text-h5">R</span>
            </v-avatar>
            <v-list-item-title>
              <p class="font-weight-bold mb-0">
                Rajesh Kola
              </p>
              <p class="caption mb-0">
               rajesh.kola@gmail.com
              </p>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-row no-gutters>
      <v-col cols="12">
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import HelloWorld from "../components/HelloWorld";

export default {
  name: "NavView",
  data: () => ({
    drawer: {
      open: false,
      clipped: false,
      fixed: false,
      permanent: true,
      mini: true,
    },
    navItems: [
      {
        path: "/home",
        title: "Home",
        icon: "home",
      },
      {
        path: "/groups",
        title: "Groups",
        icon: "group",
      },
      {
        path: "/settings",
        title: "Settings",
        icon: "settings",
      },
      {
        path: "/invite",
        title: "Invite",
        icon: "person_add",
      },
      {
        path: "/logout",
        title: "Logout",
        icon: "logout",
      },
    ],
  }),
  components: {
    // HelloWorld,
  },
};
</script>
