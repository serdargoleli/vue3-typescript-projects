<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";
  import { usePhotosStore } from "../stores/photos";
  import { useRoute } from "vue-router";
  import SinglePhoto from "@/components/photos/singlePhoto.vue";
  import router from "@/router";
  import CloseIcon from "@/components/icons/CloseIcon.vue";
  import Alert from "@/components/elements/Alert.vue";

  const route = useRoute();
  const photoStore = usePhotosStore();
  const isLoading = ref<boolean>(false);
  const searchText = ref<string>("");
  const isSearch = ref<boolean>(false);

  onMounted(async () => {
    isLoading.value = true;
    if (route.query.hasOwnProperty("search")) {
      isSearch.value = true;
      searchText.value = route.query.search as string;
      await searchPhotoHandler();
    } else {
      isSearch.value = false;
      if (photoStore.photos.length <= 0) {
        await photoStore.getPhotos();
      }
    }
    isLoading.value = false;
  });

  onUnmounted(() => {
    // arama yaptıktan sonra ana sayfaya gidip gelince aranan fotolar kalıyor ve üzerine ekleniyordu onu engellemek için sıfırlama yapıldı
    if (photoStore.data?.next_page.includes("search")) {
      photoStore.resetState();
      isSearch.value = false;
    }
  });

  const searchPhotoHandler = async () => {
    isSearch.value = true;
    if (searchText.value.trim().length > 0) {
      isLoading.value = true;
      router.push({ params: { name: "photos" }, query: { search: searchText.value } });
      await photoStore.getSearchPhotos(undefined, searchText.value);
      isLoading.value = false;
    }
  };

  const getNextPageData = async (url: string): Promise<void> => {
    isLoading.value = true;
    await photoStore.getPhotos(url);
    isLoading.value = false;
  };

  const searchClear = async () => {
    isSearch.value = false;
    searchText.value = "";
    await photoStore.resetState();
    isLoading.value = true;
    await photoStore.getPhotos();
    isLoading.value = false;
    router.push({ path: "/photos" });
  };
</script>

<template>
  <div class="bg-header">
    <img :src="photoStore.headerBg" loading="lazy" alt="header bg" />
    <div class="flex w-80 lg:w-96">
      <input
        v-model="searchText"
        @keydown.enter="searchPhotoHandler"
        type="text"
        placeholder="Birşeyler arayın.."
        class="input w-full max-w-lg rounded-tr-none rounded-br-none focus:outline-none focus:bg-base-300"
      />
      <button
        @click="searchPhotoHandler"
        :class="`btn ${isLoading ? 'loading' : 'btn-accent'}  rounded-tl-none rounded-bl-none text-black no-animation`"
      >
        Ara
      </button>
    </div>
  </div>

  <div class="mt-10 flex justify-between items-center" v-if="isSearch">
    <h1 v-if="isSearch">
      <span class="font-semibold text-4xl text-white mr-3">{{ searchText.toLocaleUpperCase() }}</span> ile ilgili
      <span class="font-semibold text-white">{{ photoStore.data?.total_results }}</span> sonuç bulundu.
    </h1>
    <button class="btn btn-error text-white btn-sm gap-2" @click="searchClear">
      <CloseIcon />
      {{ searchText }}
    </button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-8 my-8">
    <div v-for="(photo, index) in photoStore.photos" :key="index">
      <SinglePhoto :photo="photo" />
    </div>
  </div>
  <Alert class="mb-8" v-if="!isLoading && photoStore.photos.length <= 0" type="error">Aranan Kriterde Öge Bulunamadı.</Alert>

  <div class="flex flex-col justify-center items-center mb-8" v-if="photoStore.photos.length < (photoStore.data?.total_results as number)">
    <button
      v-if="photoStore.photos.length > 0"
      :class="`btn ${isLoading ? 'loading' : 'btn-accent'}`"
      @click="getNextPageData(photoStore.data?.next_page as string)"
    >
      Daha Fazla Görüntüle
    </button>
  </div>
  <p class="text-center text-slate-500">
    power by
    <a class="text-slate-400 hover:text-orange-500" href="https://www.pexels.com/tr-tr/" target="_blank" ref="nofollow noopener noreferrer"
      >pexels.com</a
    >
  </p>
</template>

<style lang="postcss">
  .bg-header {
    @apply h-96 mt-8 relative flex items-center flex-col justify-center;
  }
  .bg-header::before {
    content: "";
    background-color: #00000054;
    z-index: -9;
    @apply absolute top-0 left-0 right-0 bottom-0 w-full h-full;
  }
  .bg-header img {
    @apply absolute w-full h-full object-cover rounded-md -z-10;
  }
</style>
