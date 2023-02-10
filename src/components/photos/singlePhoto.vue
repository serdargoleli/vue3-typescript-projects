<script lang="ts" setup>
  import type { Photo } from "@/types/photoType";

  defineProps<{ photo: Photo }>();
</script>

<template>
  <div class="photo-card">
    <figure>
      <img class="rounded-md" :src="photo.src.landscape" :alt="photo.alt" loading="lazy" />
    </figure>
    <div class="flex items-center mt-2">
      <h2>
        by
        <a :href="photo.photographer_url" target="_blank" rel="nofollow noopener noreferrer" class="text-white font-bold hover:text-orange-500">
          {{ photo.photographer }}
        </a>
      </h2>
    </div>
  </div>
</template>

<style lang="postcss"></style>
