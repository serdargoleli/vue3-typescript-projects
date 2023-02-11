<script lang="ts" setup>
  import { computed } from "vue";
  import ErrorIcon from "../icons/ErrorIcon.vue";
  import WarningIcon from "../icons/WarningIcon.vue";
  const props = defineProps({ type: String });

  const alertType = computed(() => {
    switch (props.type) {
      case "warning":
        return "alert-warning";
      default:
        return "alert-error";
    }
  });
</script>
<template>
  <div :class="`alert ${alertType} shadow-lg`">
    <div>
      <ErrorIcon v-if="props.type == 'error'" />
      <WarningIcon v-if="props.type == 'warning'" />
      <span><slot></slot></span>
    </div>
  </div>
</template>
