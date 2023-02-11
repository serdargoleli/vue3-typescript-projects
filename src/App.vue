<script setup lang="ts">
  import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="container mx-auto px-5 lg:px-0">
    <RouterView />
  </div>
</template>

<style scoped></style>
