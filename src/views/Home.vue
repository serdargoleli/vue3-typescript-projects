<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="container mx-auto p-5 lg:p-0 lg:pt-7">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link :to="{ name: 'photos' }" class="card">
        <img class="image-full" src="/pexels.jpg" alt="SGAPI'S PROJECT" />
        <div class="card-body">
          <h2 class="card-title">Ücretsiz Stok fotoğrafları</h2>
          <p>Ücretsiz stok fotoğrafları | power by pexels</p>
        </div>
      </router-link>

      <router-link :to="{ name: 'univercity' }" class="card">
        <img class="image-full" src="/univercity.jpg" alt="SGAPI'S PROJECT" />
        <div class="card-body">
          <h2 class="card-title">Üniversiteler</h2>
          <p>Tüm dünyada bulunan üniversiteler.</p>
        </div>
      </router-link>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
  .card {
    @apply rounded-lg shadow bg-base-300 w-full hover:bg-gray-400 hover:text-slate-900 transition-all;
  }
  .card img {
    @apply rounded-t-lg max-h-full md:h-80 object-cover;
  }
</style>
