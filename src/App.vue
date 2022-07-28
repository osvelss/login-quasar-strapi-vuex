<template>
  <router-view />
</template>
<script setup>
/**
 * imports
 */
import { onMounted } from "vue";
import { useStore } from "vuex";

/**
 * variables
 */
const $store = useStore();

/**
 * functions
 */

const getToken = () => {
  $store.dispatch("auth/getToken");
};
const getUser = () => {
  $store.dispatch("auth/getUser");
};

onMounted(() => {
  getToken();
  getUser();
});
</script>
