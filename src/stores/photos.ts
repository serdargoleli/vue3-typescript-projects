import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface Src {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}
interface Photo {
  alt: string;
  avg_color: string;
  height: number;
  width: number;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  url: string;
  src: Src;
}
interface Response {
  page: number;
  per_page: number;
  next_page: string;
  prev_page: string;
  total_results: number;
  photos: Photo;
}
export const usePhotosStore = defineStore("photos", () => {
  const data = ref<Response>();

  const getPhotos = async () => {
    const response = await axios.get("https://api.pexels.com/v1/curated");
    data.value = response.data;
  };
  return { data, getPhotos };
});
