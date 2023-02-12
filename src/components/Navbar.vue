<script setup lang="ts">
  interface Props {
    className?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    className: "bg-base-300",
  });
</script>

<template>
  <div :class="`navbar ${props.className} relative z-20 `">
    <div class="navbar">
      <router-link :to="{ name: 'home' }" class="btn btn-ghost normal-case text-xl pl-0 lg:pl-3">SGAPI'S PROJECT</router-link>
    </div>
  </div>
</template>
