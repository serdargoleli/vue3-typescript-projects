import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import type Response from "@/types/photoType";
import type { Photo } from "@/types/photoType";

export const usePhotosStore = defineStore("photos", () => {
  const data = ref<Response>();
  const photos = ref<Photo[]>([]);
  const headerBg = ref<string>("");

  const getPhotos = async (nextPage: string = "") => {
    let url = "https://api.pexels.com/v1/curated";
    if (nextPage.length > 0) {
      url = nextPage;
    }
    const response = await axios.get(url);
    data.value = response.data;
    photos.value = photos.value.concat(response.data.photos);
    if (response.data.photos.length > 0) {
      getRandomBg();
    }
  };

  const getSearchPhotos = async (nextPage: string = "", query: string) => {
    let url = `https://api.pexels.com/v1/search?locale=tr-TR&query=${query}`;
    if (nextPage.length > 0) {
      url = nextPage;
    }
    const response = await axios.get(url);
    if (url.includes("search") && response.data.page === 1) {
      photos.value = [];
    }
    data.value = response.data;
    photos.value = photos.value.concat(response.data.photos);
    if (response.data.photos.length > 0) {
      getRandomBg();
    }
  };

  const getRandomBg = async () => {
    let random = Math.floor(Math.random() * photos.value.length);
    headerBg.value = photos.value[random].src.portrait;
  };

  const resetState = async () => {
    data.value = undefined;
    photos.value = [];
  };
  return { data, photos, headerBg, getPhotos, getSearchPhotos, resetState };
});
