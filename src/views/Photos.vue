<script setup lang="ts">
  import axios from "axios";
  import { onMounted } from "vue";
  import { usePhotosStore } from "../stores/photos";
  const photoStore = usePhotosStore();
  const photos = photoStore.data?.photos;
  onMounted(async () => {
    await photoStore.getPhotos();
  });
</script>
<template></template>
