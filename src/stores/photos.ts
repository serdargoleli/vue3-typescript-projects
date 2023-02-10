import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import type Response from "@/types/photoType";
import type { Photo } from "@/types/photoType";

export const usePhotosStore = defineStore("photos", () => {
  const data = ref<Response>();
  const photos = ref<Photo[]>([]);

  const getPhotos = async (nextPage: string = "") => {
    let url = "https://api.pexels.com/v1/curated";
    if (nextPage.length > 0) {
      url = nextPage;
    }
    const response = await axios.get(url);

    data.value = response.data;
    photos.value = photos.value.concat(response.data.photos);
  };
  return { data, photos, getPhotos };
});
