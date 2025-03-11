<template>
  <div class="relative flex h-full">
    <!-- Planning -->
    <div :class="['transition-all duration-300', isAsideOpen ? 'w-3/4' : 'w-full']">
      <PlanningTable @toggleAside="toggleAside" :isAsideOpen="isAsideOpen" />
    </div>

    <!-- RequestAside (demandes) -->
    <RequestAside v-if="isAsideOpen" @close="isAsideOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import PlanningTable from "~/components/PlanningTable.vue";
import RequestAside from "~/components/RequestAside.vue";

const isAsideOpen = ref(false);

// ✅ Écoute l'événement global "toggle-aside"
const toggleAside = () => {
  isAsideOpen.value = !isAsideOpen.value;
};

onMounted(() => {
  document.addEventListener("toggle-aside", toggleAside);
});

onBeforeUnmount(() => {
  document.removeEventListener("toggle-aside", toggleAside);
});
</script>

