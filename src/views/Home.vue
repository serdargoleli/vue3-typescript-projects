<script setup lang="ts"></script>

<template>
  <main class="container mx-auto p-5 lg:p-0 lg:pt-7">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link :to="{ name: 'photos' }" class="card">
        <figure><img class="image-full" src="/pexels.jpg" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Ücretsiz Stok Resimler</h2>
          <p>Ücretsiz stok fotoğrafları...</p>
        </div>
      </router-link>
      <router-link to="/" class="card">
        <figure><img class="image-full" src="/makeup.jpg" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Makeup</h2>
          <p>Makyaj malzemlerini bir araya topladık.</p>
        </div>
      </router-link>
      <router-link to="/" class="card">
        <figure><img class="image-full" src="/univercity.jpg" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Üniversiteler</h2>
          <p>Tüm dünyada bulunan üniversiteler.</p>
        </div>
      </router-link>
      <router-link to="/" class="card">
        <figure><img class="image-full" src="/browse.jpg" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Canın mı sıkıldı</h2>
          <p>Sana yapacak bir şey bulalım.</p>
        </div>
      </router-link>
    </div>
  </main>
</template>

<style lang="postcss">
  .card {
    @apply rounded-lg shadow bg-base-300 w-full hover:bg-gray-400 hover:text-slate-900 transition-all;
  }
  .card img {
    @apply rounded-t-lg max-h-full md:h-80 object-cover;
  }
</style>

<!-- 
  https://pexels.com/api -> Stok resmler
  https://makeup-api.herokuapp.com/- MakeUp
  http://universities.hipolabs.com/ -> Universiteler
  https://www.boredapi.com/about -> Can sıkıntısı
 -->
