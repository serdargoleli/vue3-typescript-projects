<script lang="ts" setup>
  import type { Photo } from "@/types/photoType";
  import DownloadIcon from "../icons/DownloadIcon.vue";
  import axios from "axios";
  defineProps<{ photo: Photo }>();

  const downloadImage = (url: string, name: string) => {
    axios({
      url: url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", `${name}.jpeg`);
      document.body.appendChild(fileLink);

      fileLink.click();
    });
  };
</script>

<template>
  <div class="photo-card">
    <figure :style="`background-color:${photo.avg_color}`" class="rounded-md">
      <img class="rounded-md" :src="photo.src.landscape" :alt="photo.alt" loading="lazy" />
    </figure>
    <div class="flex justify-between items-center mt-2">
      <h2>
        by
        <a :href="photo.photographer_url" target="_blank" rel="nofollow noopener noreferrer" class="text-white font-bold hover:text-orange-500">
          {{ photo.photographer }}
        </a>
      </h2>

      <div class="dropdown dropdown-left">
        <button type="button" tabindex="0" class="btn btn-sm"><DownloadIcon /></button>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
          <li @click="downloadImage(photo.src.small, `sg-${photo.photographer}-${photo.id}`)"><a>Small</a></li>
          <li @click="downloadImage(photo.src.medium, `sg-${photo.photographer}-${photo.id}`)"><a>Medium</a></li>
          <li @click="downloadImage(photo.src.large, `sg-${photo.photographer}-${photo.id}`)"><a>Large</a></li>
          <li @click="downloadImage(photo.src.large2x, `sg-${photo.photographer}-${photo.id}`)"><a>2X Large</a></li>
          <li @click="downloadImage(photo.src.original, `sg-${photo.photographer}-${photo.id}`)"><a>Original</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="postcss"></style>
