<script setup lang="ts">
  import { onMounted, ref, computed } from "vue";
  import { usePhotosStore } from "../stores/photos";
  import SinglePhoto from "@/components/photos/singlePhoto.vue";
  import Spinner from "@/components/Spinner.vue";

  const photoStore = usePhotosStore();
  const isLoading = ref<Boolean>(false);

  onMounted(async () => {
    if (photoStore.photos.length <= 0) {
      isLoading.value = true;
      await photoStore.getPhotos();
      isLoading.value = false;
    }
  });
  const getNextPageData = async (url: string): Promise<void> => {
    isLoading.value = true;
    await photoStore.getPhotos(url);
    isLoading.value = false;
  };
</script>
<template>
  <div class="flex justify-center pt-12" v-if="photoStore.photos.length <= 0 && isLoading"><Spinner /></div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10" v-else>
    <div v-for="(photo, index) in photoStore.photos" :key="index">
      <SinglePhoto :photo="photo" />
    </div>
  </div>

  <div class="flex justify-center items-center my-8">
    <Spinner v-if="photoStore.photos.length > 0 && isLoading" />
    <button v-else class="btn btn-accent" @click="getNextPageData(photoStore.data?.next_page)">Daha Fazla Görüntüle</button>
  </div>
</template>
